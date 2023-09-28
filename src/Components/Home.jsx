import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="bg-gray-200 h-24  flex items-center justify-between pl-10
    border-b-solid border-b-2 border-b-black pr-10"
    >
      {" "}
      <h1 className="text-4xl">Welcome To Expense Tracker!!!</h1>
      <h4 className="bg-stone-400 p-2.5 rounded-3xl">
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
    </div>
  );
};

export default Home;
