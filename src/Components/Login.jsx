import React, { useContext, useEffect, useState } from "react";
import { logInUrl, signUpUrl } from "../utils/url";
// import AuthContext from "../Store/Auth-Context";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/redux";
import axios from "axios";
import { expenseActions } from "../Store/Expenses";
import { addExpenseUrl } from "../utils/url";

const Login = () => {
  // const ctx = useContext(AuthContext);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // const isloggedIn = useSelector((state) => state.auth.isloggedIn);
  const isloggedIn = localStorage.getItem("isLoggedIn");
  const endpoint = localStorage.getItem("endpoint");
  const isPremium = useSelector((state) => state.expenses.isPremium);
  console.log(isloggedIn);
  const isSignedUp = useSelector((state) => state.auth.isSignedUp);
  const token = localStorage.getItem("token");
  const expenses = useSelector((state) => state.expenses.expenses);

  useEffect(() => {
    if (isloggedIn) {
      const getExpenses = async () => {
        try {
          const response = await axios(
            `${addExpenseUrl}${endpoint}/expenses.json`
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
          dispatch(expenseActions.addToExpense(expenses));
          console.log(expenses);
          const totalAmount = expenses.reduce((current, expense) => {
            return current + Number(expense.spentMoney);
          }, 0);
          dispatch(expenseActions.addAmount(totalAmount));
          console.log(totalAmount);
        } catch (error) {
          console.log(error);
        }
      };
      navigate("/expenses");
      getExpenses();
    }
  }, []);

  const [email, setEmail] = useState("");
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  // const endpoint = useSelector(
  //   (state) => (state.auth.endpoint = `/${email.replace(/\.|@/g, "")}`)
  // );
  const [password, setPassword] = useState("");
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const [confirm, setConfirm] = useState("");
  const confirmPasswordChangeHandler = (event) => {
    setConfirm(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const endPoints = `/${email.replace(/\.|@/g, "")}`;
    // localStorage.setItem("endPoints", endPoints);

    if (!isSignedUp) {
      if (password === confirm) {
        try {
          const response = await fetch(signUpUrl, {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken: true,
            }),
            headers: { "Content-Type": "application/json" },
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error.message);
          } else {
            alert("User Sign up Successfull !!!");
          }
        } catch (error) {
          console.log(error.message);
        }
      } else {
        alert("Password does't match");
      }
    } else {
      try {
        const response = await fetch(logInUrl, {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error.message);
        }
        console.log(data);
        console.log("User Logged In Successfully");
        // ctx.login(data.idToken, endPoints);
        // localStorage.setItem("endpoint", endPoint);
        dispatch(authActions.endpoint(endPoints));
        dispatch(authActions.login(data.idToken));
        navigate("/home");
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    }
    setEmail(""), setPassword(""), setConfirm("");
  };
  return (
    <div className=" h-[940px] pt-36 style">
      <div className="bg-gray-400 flex items-center justify-center w-[360px] h-[440px] m-auto rounded-xl ">
        <form className="flex flex-col" onSubmit={formSubmitHandler}>
          <h1 className=" flex justify-center text-2xl font-semibold mb-16">
            {isSignedUp ? "Log In" : "Sign-Up"}
          </h1>
          <input
            type="email"
            placeholder="E-Mail"
            className="p-3 w-72 mb-2 rounded-lg"
            required
            onChange={emailChangeHandler}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 w-72 mb-2 rounded-lg"
            required
            onChange={passwordChangeHandler}
            value={password}
          />
          {!isSignedUp && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="p-3 w-72 mb-2 rounded-lg"
              required
              onChange={confirmPasswordChangeHandler}
              value={confirm}
            />
          )}
          <button className="p-3 w-72 mb-2 rounded-lg bg-blue-400 text-white mt-16 hover:bg-white hover:text-blue-400">
            {isSignedUp ? "Login" : "Sign Up"}
          </button>
          {isSignedUp && (
            <Link
              to="/changepwd"
              className="m-auto text-blue-900 border-b-solid border-b-2 border-b-blue-400"
            >
              Forgot Password
            </Link>
          )}
        </form>
      </div>
      <div className=" flex items-center justify-center  m-auto  ">
        <button
          className="p-3 w-[360px]  rounded-lg bg-blue-400 text-white mt-10 hover:bg-gray-400 hover:text-white"
          onClick={(event) => {
            event.preventDefault();
            dispatch(authActions.signUp());
          }}
        >
          {isSignedUp
            ? "Don't have an account? Sign-Up"
            : "Have an Account? Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
