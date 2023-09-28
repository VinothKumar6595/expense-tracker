import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Store/Auth-Context";

const Home = () => {
  const ctx = useContext(AuthContext);
  return (
    <div
      className="bg-gray-200 h-24  flex items-center pl-10
    border-b-solid border-b-2 border-b-black pr-10"
    >
      {" "}
      <h1 className="text-4xl">Welcome To Expense Tracker!!!</h1>
      <h4 className="bg-stone-400 p-2.5 rounded-3xl ml-[780px]">
        Your Profile is incomplete.{" "}
        {
          <Link
            to="/profile"
            className="m-auto text-lg text-blue-900 border-b-solid border-b-2 border-b-blue-400"
          >
            Complete Now
          </Link>
        }
      </h4>
      <button
        className="p-2 bg-gray-500 w-24 ml-24 rounded-3xl hover:bg-red-400 hover:text-white"
        onClick={() => ctx.logout()}
      >
        Log Out
      </button>
    </div>
  );
};

export default Home;
