import { useSelector } from "react-redux";
import ExpenseItem from "./ExpenseItem";
import { EmptyList } from "../EmptyComponent/EmptyList";
import { Typography } from "@mui/material";
import { List } from "antd";
import { RootState } from "../../store/store";

interface myPropsI {
  handleEdit: (id: any) => void;
}

const ExpensesList: React.FC<myPropsI> = ({ handleEdit }) => {
  const { expenses } = useSelector((state: RootState) => state.expenses);

  const getExpense = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const id = event.currentTarget.dataset.id;
    handleEdit(id);
  };

  return (
    <>
      {expenses.length !== 0 ? (
        <div>
          <div className="title-box">
            <Typography
              variant="h2"
              fontWeight={600}
              fontSize={20}
              className="list-expenses-title"
            >
              Історія витрат:
            </Typography>
          </div>
          <List
            grid={{
              gutter: 16,
              column: 1,
              xs: 1,
              sm: 1,
              md: 1,
            }}
            className="expenses-list"
            dataSource={expenses}
            renderItem={(expense) => (
              <List.Item>
                <ExpenseItem expense={expense} getExpense={getExpense} />
              </List.Item>
            )}
          />
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default ExpensesList;