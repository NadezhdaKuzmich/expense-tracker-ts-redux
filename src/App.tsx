import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EditExpense from "./pages/formsExpense/EditExpense";
import AddMoney from "./pages/formsExpense/AddMoney";
import WithdrowExpense from "./pages/formsExpense/WithdrawExpense";
import HistoryTable from "./pages/history/HistoryTable";
import PageStatistics from "./pages/statistic/PageStatistics";

const App = () => {
  const [currentId, setId] = useState("");

  const handleEdit = (id: string): void => {
    console.log(id);
    setId(id);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home handleEdit={handleEdit} />} />
        <Route path="/bilings" element={<AddMoney />} />
        <Route path="/withdraw" element={<WithdrowExpense />} />
        <Route path="/edit" element={<EditExpense id={currentId} />} />
        <Route
          path="/history"
          element={<HistoryTable handleEdit={handleEdit} />}
        />
        <Route path="/history/statistics" element={<PageStatistics />} />
      </Routes>
    </Router>
  );
};

export default App;