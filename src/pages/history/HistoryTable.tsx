import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TableItem from "./TableItems";
import { EmptyList } from "../../components/EmptyComponent/EmptyList";
import { Typography, Box, Grid } from "@mui/material";
import type { Dayjs } from "dayjs";
import { DownOutlined } from "@ant-design/icons";
import {
  MenuProps,
  Dropdown,
  DatePicker,
  Space,
  Button,
  Input,
  List,
} from "antd";
import {
  itemsPrice,
  itemsCategory,
  rangePresets,
  mapExpense,
  initFilteredDate,
  getDataRange,
} from "./initialValue";
import {
  categoriesExpenses,
  getStaticExpenses,
} from "../../slices/ExpensesSlice";
import { ButtonBack } from "../../components/Buttons/ButtonBack";
const { RangePicker } = DatePicker;
const { Search } = Input;

interface myPropsI {
  handleEdit: (id: any) => void;
}

const HistoryTable: React.FC<myPropsI> = ({ handleEdit }) => {
  const { expenses } = useSelector((state: any) => state.expenses);
  const copyExpenses = JSON.parse(JSON.stringify(expenses));
  const filteredDateStart = initFilteredDate(copyExpenses);
  const [state, setState] = useState(filteredDateStart);
  const allCategories = ["Всі", ...categoriesExpenses];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filterByPrice: MenuProps["onClick"] = ({ key }) => {
    let filteredPrice;
    switch (key) {
      case "1":
        filteredPrice = [...expenses]
          .filter((expense: any) => expense.price < 0)
          .sort((expense1: any, expense2: any) =>
            Number(expense1.price) > Number(expense2.price) ? 1 : -1
          );
        setState(filteredPrice);
        break;

      case "2":
        filteredPrice = [...expenses]
          .filter((expense: any) => expense.price < 0)
          .sort((expense1: any, expense2: any) =>
            Number(expense1.price) < Number(expense2.price) ? 1 : -1
          );
        setState(filteredPrice);
        break;
    }
  };

  const filterByCategory: MenuProps["onClick"] = ({ key }) => {
    const i = Number(key);

    if (i === 0) {      
      setState(copyExpenses);
    } else {
      const filteredCategory = copyExpenses.filter(
        (expense: any) => expense.category === allCategories[i]
      );
      setState(filteredCategory);
    }
  };

  const onSearch = (value: string) => console.log(value);
  const handleSearch = (e: any) => {
    const search = e.target.value;
    let filteredSearch;
    if (search !== "") {
      filteredSearch = copyExpenses.filter((expense: any) =>
        expense.description.toLowerCase().includes(search.toLowerCase())
      );
      setState(filteredSearch);
    } else {
      setState(copyExpenses);
    }
  };

  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    const filteredDate = getDataRange(
      dates,
      dateStrings[0],
      dateStrings[1],
      copyExpenses
    );
    if (filteredDate) {
      setState(filteredDate);
    } else {
      setState(initFilteredDate(copyExpenses));
    }
  };

  const handleCountStatic = () => {
    const statistics = mapExpense(copyExpenses, categoriesExpenses);
    dispatch(
      getStaticExpenses({ statistics: statistics})
    );
    navigate("statistics", { replace: false });
  };

  return (
    <div className="container history-container">
      <Grid container justifyContent="space-between" m="0 0 10px" className="title-box">
        <Grid item md={7} xs="auto">
          <Typography
            variant="h2"
            fontWeight={600}
            fontSize={20}
            className="list-expenses-title"
            mb="20px"
          >
            Історія витрат:
          </Typography>
        </Grid>
        <Grid item md={5} xs="auto" container justifyContent="flex-end">
          <div className="btns-nav">
            <ButtonBack />
            <Button onClick={handleCountStatic}>Переглянути статистику</Button>
          </div>
        </Grid>
      </Grid>
      <div className="search-box">
        <Box sx={{ flexGrow: 2 }}>
          <Grid
            container
            spacing={{ xs: 1, md: 0 }}
            justifyContent="space-between"
            alignItems="center"
            className="title-search"
            sx={{ flexGrow: 2 }}
          >
            <Grid item md={3} xs={12}>
              <Search
                placeholder=""
                style={{ maxWidth: "100%" }}
                onSearch={onSearch}
                onChange={handleSearch}
              />
            </Grid>

            <Grid item md={4} xs={8}>
              <div className="btns-box">
                <Dropdown menu={{ items: itemsPrice, onClick: filterByPrice }}>
                  <Button onClick={(e) => e.preventDefault()}>
                    Ціна
                    <DownOutlined />
                  </Button>
                </Dropdown>
                <Dropdown
                  menu={{
                    items: itemsCategory,
                    onClick: filterByCategory,
                  }}
                >
                  <Button onClick={(e) => e.preventDefault()}>
                    Категорія
                    <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
            </Grid>

            <Grid item md={4} xs={4} container justifyContent="flex-end">
              <Space direction="vertical" className="wrap-date">
                <RangePicker
                  placement="bottomRight"
                  className="data-picker"
                  presets={rangePresets}
                  placeholder={["Початок", "Кінець"]}
                  onChange={onRangeChange}
                />
              </Space>
            </Grid>
          </Grid>
        </Box>
      </div>
      {state.length !== 0 ? (
        <List
          grid={{
            gutter: 16,
            column: 1,
            xs: 1,
            sm: 1,
            md: 1,
          }}
          dataSource={state}
          renderItem={(expense) => (
            <List.Item>
              <TableItem expense={expense}/>
            </List.Item>
          )}
        />
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

export default HistoryTable;
