import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeeExpense } from "../../slices/ExpensesSlice";
import { Grid, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Card } from "antd";
import { Expense } from "../../types/types";

interface myPropsI {
  expense: Expense;
  getExpense: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ExpenseItem: React.FC<myPropsI> = ({ expense, getExpense }) => {
  const { id, description, category, price, date } = expense;
  const dispatch = useDispatch();

  const handleDelete = (): void => {
    dispatch(removeeExpense({ id }));
  };

  const title = (
    <Grid
      container
      spacing={0}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item md={3} xs={3}>
        <h3
          className="list-expenses-title description"
          style={{ color: "grey" }}
        >
          {description}
        </h3>
      </Grid>
      <Grid item md={3} xs={3} container justifyContent="flex-end">
        <div className="date-container">
          <div className="btns-group">
            <Link to={`/edit`}>
              <IconButton aria-label="edit" data-id={id} onClick={getExpense}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Link>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </Grid>
    </Grid>
  );

  return (
    <Card title={title}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={0}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item md={3} xs={3}>
            <h3 className={`price ${price > 0 ? "add" : "withdraw"}`}>
              {price}грн
            </h3>
          </Grid>
          <Grid item md={4} xs={4}>
            <p className="category">{category}</p>
          </Grid>
          <Grid item md={3} xs={3} container justifyContent="flex-end">
            <span className="date">{date}</span>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default ExpenseItem;