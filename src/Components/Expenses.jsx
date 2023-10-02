import React, { useState, useEffect, useContext } from "react";
import ExpenseForm from "./ExpenseForm";
import axios from "axios";
import { addExpenseUrl } from "../utils/url";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Store/Auth-Context";

const Expenses = (props) => {
  const ctx = useContext(AuthContext);
  const [spentMoney, setSpentMoney] = useState("");
  const [expense, SetExpense] = useState("");
  const [expenseList, setExpenseList] = useState([]);
  const [category, setCategory] = useState("");
  // const [id, setId] = useState("");
  useEffect(() => {
    console.log(localStorage.getItem("endpoint"));
    axios
      .get(`${addExpenseUrl}${ctx.endpoint}/expenses.json`)
      .then((response) => {
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
      const response = await axios(
        `${addExpenseUrl}${ctx.endpoint}/expenses.json`
      );
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
      ctx.setEditExpense(false);
    } catch (error) {
      console.log(error);
    }
  };

  const expenseDeleteHandler = async (id) => {
    const response = await axios.delete(
      `${addExpenseUrl}${ctx.endpoint}/expenses/${id}.json`
    );
    console.log("Expense Deleted SuccessFully");
    console.log(response);
    axios
      .get(`${addExpenseUrl}${ctx.endpoint}/expenses.json`)
      .then((response) => {
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
  };

  const editExpenseHandler = async (id) => {
    const filteredExpense = expenseList.filter((expense) => {
      return id === expense.id;
    });
    console.log(filteredExpense);
    setCategory(filteredExpense[0].category);
    SetExpense(filteredExpense[0].expense);
    setSpentMoney(filteredExpense[0].spentMoney);
    setId(id);
    ctx.setEditExpense(true);
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
        <button
          className="w-24 bg-blue-300 p-1 rounded-xl hover:bg-blue-400"
          onClick={() => editExpenseHandler(expense.id)}
        >
          Edit
        </button>
        <button
          className="w-24 bg-red-300 p-1 rounded-xl ml-5 hover:bg-red-400"
          onClick={() => expenseDeleteHandler(expense.id)}
        >
          Delete
        </button>
      </li>
    );
  });

  return (
    <div>
      <ExpenseForm
        onAddExpense={expenseAddHandler}
        spentMoney={spentMoney}
        setSpentMoney={setSpentMoney}
        expense={expense}
        SetExpense={SetExpense}
        category={category}
        setCategory={setCategory}
        // id={id}
        // setId={setId}
      />
      <div>
        <ul>{listOfExpenses}</ul>
      </div>
    </div>
  );
};

export default Expenses;
