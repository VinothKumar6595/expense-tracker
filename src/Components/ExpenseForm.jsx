import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import AuthContext from "../Store/Auth-Context";
import { addExpenseUrl } from "../utils/url";
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../Store/ProfileSlice";
import { authActions } from "../Store/redux";
import DarkTheme from "./DarkTheme";

const ExpenseForm = (props) => {
  // const ctx = useContext(AuthContext);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkTheme.darkTheme);
  const editExpense = useSelector((state) => state.editing.isEditing);
  const expensesFromRedux = useSelector((state) => state.expenses.expenses);
  const endpoint = localStorage.getItem("endpoint");
  const isPremium = useSelector((state) => state.expenses.isPremium);
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
    if (!editExpense) {
      try {
        const response = await axios.post(
          `${addExpenseUrl}${endpoint}/expenses.json`,
          JSON.stringify(myExpense)
        );
        console.log(response.data);
        props.onAddExpense();
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
          `${addExpenseUrl}${endpoint}/expenses/${props.id}.json`,
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
  };

  return (
    <div>
      <div
        className={`${
          darkMode
            ? "bg-black text-white border-b-solid border-b-2 border-b-white"
            : "bg-gray-200 text-black border-b-solid border-b-2 border-b-black"
        } h-24  flex justify-between items-center pl-10
     pr-10`}
      >
        {" "}
        <h1
          className="text-4xl font-serif font-bold hover:cursor-pointer"
          onClick={() => {
            navigate("/home");
          }}
        >
          Expense Tracker
        </h1>
        {/* <button
          className="p-2 bg-gray-500 w-24 ml-24 rounded-3xl hover:bg-red-400 hover:text-white"
          onClick={() => navigate("/profile")}
        >
          Edit Profile
        </button> */}
        {isPremium && (
          <div className="ml-[1200px]">
            <DarkTheme />
          </div>
        )}
        <button
          className="p-2 bg-gray-500 w-24 ml-24 rounded-3xl hover:bg-red-400 hover:text-white"
          onClick={() => dispatch(authActions.logout(navigate("/auth")))}
        >
          Log Out
        </button>
      </div>
      <div
        className={`flex ${
          darkMode ? "bg-black text-white" : "bg-gray-200 text-black"
        } h-24 items-center text-xl font-serif font-semibold justify-around `}
      >
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
          <button
            className={` p-2.5 ${
              darkMode
                ? "bg-gray-500 text-white hover:bg-slate-700"
                : "bg-white text-black hover:bg-slate-300"
            } rounded-3xl`}
          >
            {editExpense ? "Edit Expense" : "Add Expenses"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
