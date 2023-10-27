import React, { useContext, useState } from "react";
import { changePwdUrl } from "../utils/url";
// import AuthContext from "../Store/Auth-Context";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/redux";

import DarkTheme from "./DarkTheme";

const ChangePassword = () => {
  // const ctx = useContext(AuthContext);
  const dispatch = useDispatch();
  // const isloggedIn = useSelector((state) => state.auth.isloggedIn);
  const isloggedIn = localStorage.getItem("isLoggedIn");
  const darkMode = useSelector((state) => state.darkTheme.darkTheme);
  const isPremium = localStorage.getItem("isPremium");
  const [email, setEmail] = useState("");
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const changePwdHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(changePwdUrl, {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
        headers: { "Content-type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      console.log("Password Reset Mail sent!!!");
    } catch (error) {
      alert(error.message);
    }

    setEmail("");
  };
  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      } h-[980px]`}
    >
      {" "}
      <div
        className={` flex ${
          darkMode
            ? "bg-black text-white border-b-solid border-b-2 border-b-white"
            : "bg-gray-200 text-black border-b-solid border-b-2 border-b-black"
        } h-24  justify-between items-center pl-10
 pr-10`}
      >
        <h1 className="text-4xl">Expense Tracker</h1>
        {isPremium && (
          <div className="ml-[1200px]">
            <DarkTheme />
          </div>
        )}
        {isloggedIn && (
          <button
            className="p-2 bg-gray-500 w-24 ml-24 rounded-3xl hover:bg-red-400 hover:text-white"
            onClick={() => dispatch(authActions.logout(navigate("/auth")))}
          >
            Log Out
          </button>
        )}
      </div>
      <div className={`flex flex-col  w-96 mt-64 ml-[700px] `}>
        <form>
          <label className="ml-16 font-bold ">
            Enter the email which you have registered
          </label>
          <input
            type="email"
            placeholder="E-Mail"
            className="w-[500px] h-10 mt-2 border-solid border-2 border-black p-6 rounded-xl"
            onChange={emailChangeHandler}
          />
          <br />
          <button
            className="p-4 bg-slate-300 text-black mt-10 ml-28 w-64 rounded-3xl hover:bg-slate-400"
            onClick={changePwdHandler}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
