export const countExpense = (expenses: any) => {
  const expense = expenses
    .filter((expense: any) => expense.price < 0)
    .map((expense: any) => Number(expense.price))
    .reduce((acc: number, item: number) => acc + item, 0);
  return expense;
};

export const countSalary = (expenses: any) => {
  const expense = expenses
    .filter((expense: any) => expense.price > 0)
    .map((expense: any) => Number(expense.price))
    .reduce((acc: number, item: number) => acc + item, 0);
  return expense;
};

export const averageExpenseY = (expenses: any) => {
  const sum = expenses
    .filter((expense: any) => expense.price < 0)
    .filter(
      (expense: any) =>
        new Date(expense.date).getFullYear() === new Date().getFullYear()
    )
    .map((expense: any) => Number(expense.price))
    .reduce((acc: number, item: number) => acc + item, 0);

  const today = new Date();
  const currentYear = today.getFullYear();
  var msPerDay = 24 * 60 * 60 * 1000;
  const firstDayCurrYear = new Date(currentYear, 0, 1);
  const daysMs = (today.getTime() - firstDayCurrYear.getTime()) / msPerDay;
  const days = Math.round(daysMs);
  return (Math.abs(sum) / days).toFixed(2);
};

export const averageExpenseM = (expenses: any) => {
  const sum = expenses
    .filter((expense: any) => expense.price < 0)
    .filter(
      (expense: any) =>
        new Date(expense.date).getMonth() === new Date().getMonth()
    )
    .map((expense: any) => Number(expense.price))
    .reduce((acc: number, item: number) => acc + item, 0);

  const today = new Date();
  const currentMonth = today.getMonth();
  var msPerDay = 24 * 60 * 60 * 1000;
  const firstDayCurrMonth = new Date(new Date().getFullYear(), currentMonth, 1);
  const daysMs = (today.getTime() - firstDayCurrMonth.getTime()) / msPerDay;
  const days = Math.round(daysMs);
  return (Math.abs(sum) / days).toFixed(2);
};

export const getDays = (start: any, end: any) => {
  var msPerDay = 24 * 60 * 60 * 1000;
  const daysMs = (start.getTime() - end.getTime()) / msPerDay;
  const days = Math.round(daysMs);
  return days;
};

export const setDataSet = (categoriesExpenses: any, state: any) => {
  const dataCateroty = {
    labels: categoriesExpenses,
    datasets: [
      {
        label: "%",
        data: state,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "#80aec326",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "#2871925c",
        ],
        borderWidth: 1,
      },
    ],
  };
  return dataCateroty;
};