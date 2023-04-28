import React, { useState } from "react";
import { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { expenseAdded } from "../../slices/ExpensesSlice";
import { ButtonBack } from "../../components/Buttons/ButtonBack";
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

const initialState = {
  description: "",
  category: "",
  price: "",
};

const WithdrowExpense: React.FC = () => {
  const [state, setState] = useState(initialState);
  const [date, setDate] = React.useState<Dayjs | null | string>(null);
  const { description, category, price } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (readyToSave) {
      dispatch(expenseAdded(description, category, price, date));
      setState(initialState);
      navigate(-1);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const readyToSave =
    Boolean(state.description.trim()) &&
    Boolean(state.category.trim()) &&
    Boolean(state.price.trim());

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
            <h2 className="list-expenses-title">Зняття з рахунку:</h2>
            <ButtonBack />
          </Grid>
          <TextField
            label="Назва"
            name="description"
            value={state.description}
            onChange={handleInputChange}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Категорія</InputLabel>
            <Select
              name="category"
              labelId="demo-simple-select-label"
              value={category}
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
              <MenuItem value={"Інше"}>Інше</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="number"
            name="price"
            label="Ціна"
            variant="filled"
            value={price}
            placeholder="1000"
            onChange={handleInputChange}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              let inputValue = "-" + e.target.value.replace(/[e,+,-]/g, "");
              e.target.value = inputValue;
            }}
            InputProps={{
              inputProps: {
                max: -1,
              },
            }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={date}
              onChange={(value: any) => setDate(new Date(value).toDateString())}
            />
          </LocalizationProvider>

          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={!readyToSave}
            className="form-btn"
          >
            Створити
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WithdrowExpense;