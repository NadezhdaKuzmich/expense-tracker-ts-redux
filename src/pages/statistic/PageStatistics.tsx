import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { categoriesExpenses } from "../../slices/ExpensesSlice";
import { EmptyList } from "../../components/EmptyComponent/EmptyList";
import { ButtonBack } from "../../components/Buttons/ButtonBack";
import {
  countExpense,
  countSalary,
  setDataSet,
  averageExpenseY,
  averageExpenseM,
  getDays,
} from "./initialValueCharts";
import type { Dayjs } from "dayjs";
import { DatePicker, Space, Card, List } from "antd";
import {
  rangePresets,
  mapExpense,
  getDataRange,
} from "../history/initialValue";
const { RangePicker } = DatePicker;

ChartJS.register(ArcElement, Tooltip, Legend);

const PageStatistics: React.FC = () => {
  const { expenses, statistics } = useSelector((state: any) => state.expenses);
  const [expense, setExpense] = useState(countExpense(expenses));
  const [salary, setSalary] = useState(countSalary(expenses));
  const [state, setState] = useState(dataSet(statistics, expense));
  const dataCateroty = setDataSet(categoriesExpenses, state);
  const averageForYearExpense = averageExpenseY(expenses);
  const averageForMonthExpense = averageExpenseM(expenses);
  const [average, SetAverage] = useState(averageForYearExpense);

  const dataList1 = [
    {
      title: "Витрати:",
      count: expense,
    },
    {
      title: "Надходження на баланс:",
      count: salary,
    },
    {
      title: "Середня сума витрат:",
      count: average,
    },
  ];

  const dataList2 = [
    {
      title: "За місяць:",
      count: averageForMonthExpense,
    },
    {
      title: `На день за
     ${new Date().getFullYear()} рік:`,
      count: averageForYearExpense,
    },
  ];

  function dataSet(filter: any, expense: number) {
    let data = [];
    for (let i = 0; i < categoriesExpenses.length; i++) {
      let category = Math.floor(
        (Math.abs(filter[categoriesExpenses[i]]) / Math.abs(expense)) * 100
      );
      data.push(category);
    }
    return data;
  }

  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    let filteredDate = getDataRange(
      dates,
      dateStrings[0],
      dateStrings[1],
      expenses
    );
    if (filteredDate) {
      const expense = countExpense(filteredDate);
      setExpense(expense);
      setSalary(countSalary(filteredDate));
      const statistics = mapExpense(filteredDate, categoriesExpenses);
      setState(dataSet(statistics, expense));
      const days = getDays(new Date(dateStrings[0]), new Date(dateStrings[1]));
      const valueAverage = (expense / days).toFixed(2);
      SetAverage(valueAverage);
    } else {
      console.log("Clear");
      setSalary(countSalary(expenses));
      filteredDate = expenses.filter(
        (expense: any) => new Date(expense.date) >= new Date("0")
      );
      const expense = countExpense(filteredDate);
      setExpense(expense);
      setState(dataSet(statistics, expense));
      SetAverage(averageForYearExpense);
    }
  };

  return (
    <div className="container statistics-container">
      <Grid
        container
        spacing={{ xs: 1, md: 0 }}
        justifyContent="space-between"
        alignItems="center"
        className="title-box"
      >
        <Grid item md={8} xs={8}>
          <Typography
            variant="h2"
            fontWeight={600}
            fontSize={20}
            p={0}
            className="list-expenses-title"
          >
            Статистика балансу:
          </Typography>
        </Grid>

        <Grid item md={4} xs={4} container justifyContent="flex-end">
          <ButtonBack />
        </Grid>
      </Grid>
      <Grid container className="statistic">
        <Space direction="vertical" className="statistic">
          <RangePicker
            placement="bottomRight"
            className="data-picker"
            presets={rangePresets}
            placeholder={["Початок", "Кінець"]}
            onChange={onRangeChange}
          />
        </Space>
      </Grid>

      <div className="container-charts">
        {expense !== 0 ? (
          <div className="container-pie">
            <Typography
              variant="h2"
              fontWeight={600}
              fontSize={18}
              pb="20px"
              className="list-expenses-title"
              style={{ color: "grey" }}
            >
              Відсоток витрат за категоріями
            </Typography>
            <Pie
              data={dataCateroty}
              options={{
                plugins: {
                  legend: { display: true, position: "bottom" },
                },
              }}
            />
          </div>
        ) : (
          <EmptyList />
        )}
        <h4 className="list-expenses-title title-box">Загальна сума:</h4>
        <List
          grid={{
            gutter: 16,
            column: 3,
            xs: 1,
            sm: 2,
            md: 3,
          }}
          dataSource={dataList1}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.title}>{item.count}грн</Card>
            </List.Item>
          )}
        />
        <h4 className="list-expenses-title title-box">Середня сума витрат:</h4>
        <List
          grid={{
            gutter: 16,
            column: 2,
            xs: 1,
            sm: 2,
            md: 2,
          }}
          dataSource={dataList2}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.title}>{item.count}грн</Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default PageStatistics;
