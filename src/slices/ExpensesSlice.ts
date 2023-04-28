import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "../types/types";

export const categoriesExpenses = [
  "Житло",
  "Продукти харчування",
  "Транспорт",
  "Одяг",
  "Побутова техніка",
  "Навчання",
  "Інше",
];

const ExpensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [
      {
        id: "1",
        description: "Чайник",
        category: "Побутова техніка",
        price: "-1200",
        date: new Date(2023, 3, 24, 16, 15, 32).toDateString(),
      },
      {
        id: "2",
        description: "Шкарпетки",
        category: "Одяг",
        price: "-200",
        date: new Date(2023, 3, 22, 12, 43, 29).toDateString(),
      },
      {
        id: "3",
        description: "Курси польської мови",
        category: "Навчання",
        price: "-2800",
        date: new Date(2023, 3, 12, 16, 15, 32).toDateString(),
      },
      {
        id: "4",
        description: "Курси англійської мови",
        category: "Навчання",
        price: "-2000",
        date: new Date(2023, 2, 28, 20, 15, 10).toDateString(),
      },
      {
        id: "5",
        description: "Грошики :)",
        category: "Зарплатня",
        price: "20000",
        date: new Date(2023, 2, 25, 11, 35, 22).toDateString(),
      },
      {
        id: "6",
        description: "Грошики",
        category: "Додатковий заробіток",
        price: "2000",
        date: new Date(2023, 1, 25, 11, 35, 22).toDateString(),
      },
    ] as Expense[],

    statistics: {},
  },

  reducers: {
    expenseAdded: {
      reducer(state, action: PayloadAction<Expense>) {
        state.expenses.unshift(action.payload);
      },
      prepare(description: string, category: string, price: any, date): any {
        return {
          payload: {
            id: nanoid(),
            description,
            category,
            price,
            date,
          },
        };
      },
    },

    expensesUpdated: (state, action: PayloadAction<Expense>) => {
      const { id, description, category, price, date } = action.payload;
      const editablePost = state.expenses.find((item) => item.id === id);
      if (editablePost) {
        editablePost.description = description;
        editablePost.category = category;
        editablePost.price = price;
        editablePost.date = date;
      }
    },

    removeeExpense(state, action) {
      state.expenses = state.expenses.filter(
        (item) => item.id !== action.payload.id
      );
    },

    getStaticExpenses(state, action) {
      const { statistics } = action.payload;
      state.statistics = statistics;
    },
  },
});

export const {
  expenseAdded,
  expensesUpdated,
  removeeExpense,
  getStaticExpenses,
} = ExpensesSlice.actions;
export default ExpensesSlice.reducer;