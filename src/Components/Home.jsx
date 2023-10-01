import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Store/Auth-Context";
import { getUserDetailsUrl } from "../utils/url";

const Home = () => {
  const ctx = useContext(AuthContext);
  const [dispName, setDispName] = useState("");
  useEffect(() => {
    fetch(getUserDetailsUrl, {
      method: "POST",
      body: JSON.stringify({
        idToken: ctx.token,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);
          console.log(data.users[0].emailVerified);
          ctx.setEmailVerification(data.users[0].emailVerified);
          setDispName(data.users[0].displayName);
          if (
            data.users[0].displayName.length &&
            data.users[0].photoUrl.length > 0
          ) {
            ctx.setProfileUpdated(true);
          }
        });
      } else {
        throw new error(data.error.message);
      }
    });
  }, []);

  return (
    <div
      className="bg-gray-200 h-24  flex items-center pl-10
    border-b-solid border-b-2 border-b-black pr-10"
    >
      {" "}
      <h1 className="text-4xl w-[800px]">Welcome To Expense Tracker!!!</h1>
      {!ctx.isProfileUpdated && (
        <h4 className="bg-stone-400 p-2.5 rounded-3xl ml-[780px]">
          Your Profile is incomplete. {""}
          <Link
            to="/profile"
            className="m-auto text-lg text-blue-900 border-b-solid border-b-2 border-b-blue-400"
          >
            Complete Now
          </Link>
        </h4>
      )}
      {ctx.isProfileUpdated && (
        <h4 className="bg-stone-400 p-2.5 rounded-3xl ml-96  w-[800px] flex">
          Welcome Back <p className="font-bold ml-1">{dispName}</p> ! your
          Profile is 100% Completed.Go To
          <Link
            to="/expenses"
            className="m-auto text-lg text-blue-900 border-b-solid border-b-2 border-b-blue-400"
          >
            Add Expense
          </Link>
        </h4>
      )}
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
