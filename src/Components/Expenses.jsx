import React, { useState, useEffect, useContext } from "react";
import ExpenseForm from "./ExpenseForm";
import axios from "axios";
import { addExpenseUrl } from "../utils/url";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
// import AuthContext from "../Store/Auth-Context";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/redux";
import { editActions } from "../Store/EditSlice";
import { expenseActions } from "../Store/Expenses";
import DownloadIcon from "@mui/icons-material/Download";

const Expenses = (props) => {
  // const ctx = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.darkTheme.darkTheme);
  const endpoint = localStorage.getItem("endpoint");
  const isPremium = localStorage.getItem("isPremium");
  const isEditing = useSelector((state) => state.editing.isEditing);
  const [spentMoney, setSpentMoney] = useState("");
  const [expense, SetExpense] = useState("");
  const [expenseList, setExpenseList] = useState([]);
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const expensesFromRedux = useSelector((state) => state.expenses.expenses);
  const totalAmount = useSelector((state) => state.expenses.amount);

  useEffect(() => {
    console.log(localStorage.getItem("endpoint"));
    console.log(endpoint);
    axios.get(`${addExpenseUrl}${endpoint}/expenses.json`).then((response) => {
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
      dispatch(expenseActions.addToExpense(expenses));
      console.log(expenseList);
      console.log(expensesFromRedux);
      const totalExpense = expensesFromRedux.reduce((curr, expense) => {
        return (curr = curr + Number(expense.spentMoney));
      }, 0);
      dispatch(expenseActions.addAmount(totalExpense));
      console.log(totalExpense);
    });
  }, []);
  const expenseAddHandler = async () => {
    try {
      const response = await axios(`${addExpenseUrl}${endpoint}/expenses.json`);
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
      dispatch(expenseActions.addToExpense(expenses));
      // console.log(expensesFromRedux);
      const totalExpense = expenses.reduce((curr, expense) => {
        return (curr = curr + Number(expense.spentMoney));
      }, 0);
      dispatch(expenseActions.addAmount(totalExpense));
      console.log(totalExpense);
      // ctx.setEditExpense(false);
      dispatch(editActions.stopEditing());
    } catch (error) {
      console.log(error);
    }
  };

  const expenseDeleteHandler = async (id) => {
    const response = await axios.delete(
      `${addExpenseUrl}${endpoint}/expenses/${id}.json`
    );
    console.log("Expense Deleted SuccessFully");
    console.log(response);
    axios.get(`${addExpenseUrl}${endpoint}/expenses.json`).then((response) => {
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
      dispatch(expenseActions.addToExpense(expenses));
      const totalExpense = expenses.reduce((curr, expense) => {
        return (curr = curr + Number(expense.spentMoney));
      }, 0);
      dispatch(expenseActions.addAmount(totalExpense));
      console.log(totalExpense);
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
    setId(filteredExpense[0].id);
    dispatch(editActions.editUser());
  };

  const makeCsv = (rows) => {
    return rows.map((r) => r.join(",")).join("\n");
  };

  const DownloadCsv = () => {
    console.log("Download");
    console.log(expensesFromRedux);
    const expensesArray = expensesFromRedux.map(Object.values);
    console.log(expensesArray);
    const resultData = expensesArray.map((expense) => {
      return [expense];
    });
    console.log(resultData);
    const data = [[["id", "Spent Money", "Expense", "Category"]]];
    for (var i = 1; i < resultData.length; i++) {
      data.push(resultData[i]);
    }
    console.log(data);
    // const data = [
    //   ["id", "Spent Money", "Expense", "Category"],
    //   resultData[0],
    //   resultData[1],
    //   resultData[2],
    // ];
    const a1 = document.getElementById("a1");
    const blob1 = new Blob([makeCsv(data)]);
    a1.href = URL.createObjectURL(blob1);
  };
  const listOfExpenses = expenseList.map((expense) => {
    return (
      <li
        key={expense.id}
        className="flex bg-gray-400 h-12 text-lg items-center justify-center w-[1080px] m-auto mt-1.5 rounded-xl"
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

  return totalAmount < 10000 || isPremium ? (
    <div>
      <div>
        <ExpenseForm
          onAddExpense={expenseAddHandler}
          spentMoney={spentMoney}
          setSpentMoney={setSpentMoney}
          expense={expense}
          SetExpense={SetExpense}
          category={category}
          setCategory={setCategory}
          id={id}
        />
        <div
          className={`flex ${
            darkMode ? "bg-black text-white" : "bg-gray-200 text-black"
          } h-[960px] items-top text-xl font-serif font-semibold justify-around `}
        >
          <ul className="m-auto mt-10">{listOfExpenses}</ul>
          {isPremium && (
            <a
              id="a1"
              download="Expenses.csv"
              className="m-auto mt-10 hover:cursor-pointer"
              onClick={DownloadCsv}
            >
              <DownloadIcon className=" hover:cursor-pointer ml-24" />
              Download Expenses
            </a>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className={"bg-gray-200 w-full h-[960px] pt-80"}>
      <button
        className="bg-gray-500 p-8 w-[300px] flex items-center justify-center text-2xl font-bold rounded-3xl m-auto  pos hover:bg-black hover:text-white"
        onClick={() =>
          dispatch(expenseActions.premiumUser(navigate("/expenses")))
        }
      >
        Activate Premium
      </button>
      <NavLink to="/home" className="underline text-blue-500 ml-[900px]">
        GO TO HOME
      </NavLink>
    </div>
  );
};

export default Expenses;
