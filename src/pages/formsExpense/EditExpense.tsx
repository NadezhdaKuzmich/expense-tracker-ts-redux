import React, { useState } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButtonBack } from "../../components/Buttons/ButtonBack";
import { expensesUpdated } from "../../slices/ExpensesSlice";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { Expense } from "../../types/types";
import { RootState } from "../../store/store";

interface myPropsI {
  id: string;
}

const EditExpense: React.FC<myPropsI> = ({ id }) => {
  const { expenses } = useSelector((state: RootState) => state.expenses);
  const editableExpense = expenses.filter(
    (expense: Expense) => expense.id === id
  );
  const { description, category, price, date } = editableExpense[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    description,
    category,
    price,
    date,
  });

  const handleEditExpense = () => {
    dispatch(
      expensesUpdated({
        id: id,
        description: values.description,
        category: values.category,
        price: values.price,
        date: values.date,
      })
    );
    navigate(-1);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const readyToSave =
    Boolean(
      description !== values.description ||
        category !== values.category ||
        price !== values.price ||
        date !== values.date
    ) &&
    Boolean(values.price.toString().trim() || values.description.trim()) &&
    Boolean(values.date);

  return (
    <div className="container">
      <form>
        <div className="form-container">
          <Grid
            container
            spacing={{ xs: 1, md: 0 }}
            justifyContent="space-between"
            alignItems="center"
            className="title-box"
          >
            <h2 className="list-expenses-title">Редагування:</h2>
            <ButtonBack />
          </Grid>
          <TextField
            label="Назва"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Категорія</InputLabel>
            <Select
              name="category"
              labelId="demo-simple-select-label"
              value={values.category}
              onChange={handleInputChange}
              autoWidth
              label="Категорія"
            >
              <MenuItem value={"Житло"}>Житло</MenuItem>
              <MenuItem value={"Продукти харчування"}>
                Продукти харчування
              </MenuItem>
              <MenuItem value={"Транспорт"}>Транспорт</MenuItem>
              <MenuItem value={"Одяг"}>Одяг</MenuItem>
              <MenuItem value={"Побутова техніка"}>Побутова техніка</MenuItem>
              <MenuItem value={"Навчання"}>Транспорт</MenuItem>
              <MenuItem value={"Зарплатня"}>Зарплатня</MenuItem>
              <MenuItem value={"Премія"}>Премія</MenuItem>
              <MenuItem value={"Додатковий заробіток"}>
                Додатковий заробіток
              </MenuItem>
              <MenuItem value={"Інше"}>Інше</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="number"
            name="price"
            label="Ціна"
            variant="filled"
            value={values.price}
            onChange={handleInputChange}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayjs(new Date(date))}
              onChange={(value: any) =>
                setValues({ ...values, date: new Date(value).toDateString() })
              }
            />
          </LocalizationProvider>

          <Button
            variant="contained"
            size="large"
            onClick={handleEditExpense}
            disabled={!readyToSave}
            className="form-btn"
          >
            Зберегти зміни
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditExpense;