import React from "react";
import { useSelector } from "react-redux";
import "./cardBalance.modules.css";
import { Expense } from "../../types/types";
import { RootState } from "../../store/store";

const CardBalance: React.FC = () => {
  const { expenses } = useSelector((state: RootState) => state.expenses);
  const Balance = expenses
    .map((expense: Expense) => Number(expense.price))
    .reduce((acc: number, item: number) => acc + item, 0);

  return (
    <div className="balance-container">
      <div className="card-balance">
        <div className="card">
          <div className="logo">
            <img
              src="https://raw.githubusercontent.com/dasShounak/freeUseImages/main/Visa-Logo-PNG-Image.png"
              alt="Visa"
            />
          </div>
          <div className="chip">
            <img
              src="https://raw.githubusercontent.com/dasShounak/freeUseImages/main/chip.png"
              alt="chip"
            />
          </div>
          <div className="balance">
            <span>{Balance}грн</span>
          </div>
          <div className="name">SHOUNAK DAS</div>
          <div className="from">10/22</div>
          <div className="to">06/27</div>
          <div className="ring"></div>
        </div>
      </div>
    </div>
  );
};

export default CardBalance;