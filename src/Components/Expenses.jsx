import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";

const Expenses = (props) => {
  const [expenseList, setExpenseList] = useState([]);
  const expenseAddHandler = (expense) => {
    setExpenseList((prev) => {
      return [...prev, expense];
    });
  };

  const listOfExpenses = expenseList.map((expense) => {
    return (
      <li
        key={Math.random()}
        className="flex bg-gray-400 h-12 text-lg items-center justify-center w-[900px] m-auto mt-1.5 rounded-xl"
      >
        <h4 className="font-bold mr-10">{`Money Spent : Rs.${expense.spentMoney}`}</h4>
        <h4 className="font-bold mr-10">{`For : ${expense.expense}`}</h4>
        <h4 className="font-bold mr-10">{`Spent in category of : ${expense.category}`}</h4>
      </li>
    );
  });
  return (
    <div>
      <ExpenseForm onAddExpense={expenseAddHandler} />
      <div>
        <ul>{listOfExpenses}</ul>
      </div>
    </div>
  );
};

export default Expenses;
