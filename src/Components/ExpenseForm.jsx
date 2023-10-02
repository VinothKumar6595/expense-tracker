import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Store/Auth-Context";
import { addExpenseUrl } from "../utils/url";

const ExpenseForm = (props) => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate("");

  const moneyChangeHandler = (event) => {
    props.setSpentMoney(event.target.value);
  };
  const expenseChangeHandler = (event) => {
    props.SetExpense(event.target.value);
  };
  const categoryChangeHandler = (event) => {
    props.setCategory(event.target.value);
  };

  const addExpenseHandler = async (event) => {
    event.preventDefault();
    const myExpense = {
      spentMoney: props.spentMoney,
      expense: props.expense,
      category: props.category,
    };
    if (!ctx.editExpense) {
      try {
        const response = await axios.post(
          `${addExpenseUrl}${ctx.endpoint}/expenses.json`,
          JSON.stringify(myExpense)
        );
        console.log(response.data);
        props.onAddExpense();
        // const data = await response.json();
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const editedExpense = {
          spentMoney: props.spentMoney,
          expense: props.expense,
          category: props.category,
        };
        const response = await axios.put(
          `${addExpenseUrl}${ctx.endpoint}/expenses/${props.id}.json`,
          JSON.stringify(editedExpense)
        );
        console.log(response.data);
        console.log("Edited SuccessFully");
        props.onAddExpense();
      } catch (error) {
        console.log(error);
      }
    }
    // props.onAddExpense(myExpense);
    props.setSpentMoney("");
    props.setCategory("");
    props.SetExpense("");
    // props.setId("");
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
            value={props.spentMoney}
            required
          />
          <label className="p-5">Expense Description</label>
          <input
            type="text"
            className="p-2.5 mr-5 rounded-xl"
            onChange={expenseChangeHandler}
            value={props.expense}
            required
          />
          <label className="p-5">Choose a Category</label>
          <input
            list="category"
            className="p-2.5 mr-5 rounded-xl"
            onChange={categoryChangeHandler}
            value={props.category}
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
            {ctx.editExpense ? "Edit Expense" : "Add Expenses"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
