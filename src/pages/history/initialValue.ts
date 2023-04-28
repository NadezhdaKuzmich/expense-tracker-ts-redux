import type { MenuProps } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export const itemsPrice: MenuProps["items"] = [
  {
    label: "Витрати за зменшенням",
    key: "1",
  },
  {
    label: "Витрати за збільшенням",
    key: "2",
  },
];

export const itemsCategory: MenuProps["items"] = [
  {
    label: "Всі",
    key: "0",
  },
  {
    label: "Житло",
    key: "1",
  },
  {
    label: "Продукти харчування",
    key: "2",
  },
  {
    label: "Транспорт",
    key: "3",
  },
  {
    label: "Одяг",
    key: "4",
  },
  {
    label: "Побутова техніка",
    key: "5",
  },
  {
    label: "Навчання",
    key: "6",
  },
  {
    label: "Інше",
    key: "7",
  },
];

export const rangePresets: {
  label: string;
  value: [Dayjs, Dayjs];
}[] = [
  { label: "7 Днів", value: [dayjs().add(-7, "d"), dayjs()] },
  { label: "14 Днів", value: [dayjs().add(-14, "d"), dayjs()] },
  { label: "30 Днів", value: [dayjs().add(-30, "d"), dayjs()] },
  { label: "90 Днів", value: [dayjs().add(-90, "d"), dayjs()] },
];

export const mapExpense = (expenses: any, categoriesExpenses: any) => {
  const map = new Map();

  expenses
    .filter((expense: any) => expense.price < 0)
    .forEach((element: any) => {
      if (!map.has(element.category)) {
        map.set(element.category, Number(Math.abs(element.price)));
      } else {
        const newValue =
          Number(Math.abs(map.get(element.category))) +
          Number(Math.abs(element.price));
        map.set(element.category, Number(Math.abs(newValue)));
      }
    });

  categoriesExpenses.forEach((category: any) => {
    if (!map.has(category)) {
      map.set(category, 0);
    }
  });
  const statistics = Object.fromEntries(map);
  return statistics;
};

export const initFilteredDate = (copyExpenses: any) => {
  const filtered = copyExpenses.sort((expense1: any, expense2: any) =>
    new Date(expense1.date).getTime()  <
    new Date(expense2.date).getTime() 
      ? 1
      : -1
  );
  return filtered;
};

export const getDataRange = (dates: any, date1: any, date2: any, copyExpenses:any) => {
  if (dates) {
    const start = new Date(date1);
    const end = new Date(date2);
    const filteredDate = copyExpenses.filter(
      (expense: any) =>
        (new Date(expense.date) >= start && new Date(expense.date) <= end) ||
        new Date(expense.date).toLocaleDateString() ===
          start.toLocaleDateString()
    );
    return filteredDate;
  } else {
    return false;
  }
}
