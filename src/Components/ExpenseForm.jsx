import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ExpenseForm = (props) => {
  const navigate = useNavigate("");
  const [spentMoney, setSpentMoney] = useState("");
  const moneyChangeHandler = (event) => {
    setSpentMoney(event.target.value);
  };
  const [expense, SetExpense] = useState("");
  const expenseChangeHandler = (event) => {
    SetExpense(event.target.value);
  };
  const [category, setCategory] = useState("");
  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);
  };
  const addExpenseHandler = (event) => {
    event.preventDefault();
    const myExpense = {
      spentMoney: spentMoney,
      expense: expense,
      category: category,
    };
    props.onAddExpense(myExpense);
    setSpentMoney("");
    setCategory("");
    SetExpense("");
  };
  return (
    <div>
      <div
        className="bg-gray-200 h-24  flex justify-between items-center pl-10
    border-b-solid border-b-2 border-b-black pr-10"
      >
        {" "}
        <h1
          className="text-4xl font-serif font-bold hover:cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Expense Tracker
        </h1>
        <button
          className="p-2 bg-gray-500 w-24 ml-24 rounded-3xl hover:bg-red-400 hover:text-white"
          onClick={() => ctx.logout()}
        >
          Log Out
        </button>
      </div>
      <div className="bg-gray-200 flex h-24 items-center text-xl font-serif font-semibold justify-around ">
        <form onSubmit={addExpenseHandler}>
          <label className="p-5">Money Spent</label>
          <input
            type="number"
            className="p-2.5 mr-5 rounded-xl"
            onChange={moneyChangeHandler}
            value={spentMoney}
            required
          />
          <label className="p-5">Expense Description</label>
          <input
            type="text"
            className="p-2.5 mr-5 rounded-xl"
            onChange={expenseChangeHandler}
            value={expense}
            required
          />
          <label className="p-5">Choose a Category</label>
          <input
            list="category"
            className="p-2.5 mr-5 rounded-xl"
            onChange={categoryChangeHandler}
            value={category}
            required
          />
          <datalist id="category">
            <option value="Food" />
            <option value="Dress" />
            <option value="Movie" />
            <option value="Petrol" />
            <option value="Salary" />
          </datalist>
          <button className="bg-white p-2.5 rounded-3xl hover:bg-black hover:text-white">
            Add Expenses
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
