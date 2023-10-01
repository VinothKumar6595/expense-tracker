import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import axios from "axios";
import { addExpenseUrl } from "../utils/url";

const Expenses = (props) => {
  const [expenseList, setExpenseList] = useState([]);
  useEffect(() => {
    axios.get(addExpenseUrl).then((response) => {
      const expenses = [];
      console.log(response.data);
      for (const key in response.data) {
        expenses.push({
          id: key,
          spentMoney: response.data[key].spentMoney,
          expense: response.data[key].expense,
          category: response.data[key].category,
        });
      }
      setExpenseList(expenses);
      console.log(expenseList);
    });
  }, []);
  const expenseAddHandler = async () => {
    try {
      const response = await axios(addExpenseUrl);
      const expenses = [];
      console.log(response.data);
      for (const key in response.data) {
        expenses.push({
          id: key,
          spentMoney: response.data[key].spentMoney,
          expense: response.data[key].expense,
          category: response.data[key].category,
        });
      }
      setExpenseList(expenses);
      console.log(expenseList);
    } catch (error) {
      console.log(error);
    }
  };

  const listOfExpenses = expenseList.map((expense) => {
    return (
      <li
        key={expense.id}
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
