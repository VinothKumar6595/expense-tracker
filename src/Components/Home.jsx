import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import AuthContext from "../Store/Auth-Context";
import { getUserDetailsUrl } from "../utils/url";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../Store/redux";
import { profileActions } from "../Store/ProfileSlice";

import DarkTheme from "./DarkTheme";

const Home = () => {
  // const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isPremium = localStorage.getItem("isPremium");
  // const isloggedIn = useSelector((state) => state.auth.isloggedIn);
  const isloggedIn = localStorage.getItem("isLoggedIn");
  const darkMode = useSelector((state) => state.darkTheme.darkTheme);
  console.log(isloggedIn);
  const isSignedUp = useSelector((state) => state.auth.isSignedUp);
  console.log(isSignedUp);
  const endpoint = localStorage.getItem("endpoint");
  const token = localStorage.getItem("token");
  const isProfileUpdated = useSelector(
    (state) => state.profile.isProfileUpdated
  );
  const [dispName, setDispName] = useState("");
  useEffect(() => {
    console.log(token);
    fetch(getUserDetailsUrl, {
      method: "POST",
      body: JSON.stringify({
        idToken: token,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);
          console.log(data.users[0].emailVerified);
          // ctx.setEmailVerification(data.users[0].emailVerified);
          dispatch(
            profileActions.emailVerification(data.users[0].emailVerified)
          );
          setDispName(data.users[0].displayName);
          if (
            data.users[0].displayName.length &&
            data.users[0].photoUrl.length > 0
          ) {
            // ctx.setProfileUpdated(true);
            dispatch(profileActions.profileUpdation());
          } else {
            throw new Error(data.error.message);
          }
        });
      } else {
        throw new Error("Error Getting Initial Data");
      }
    });
  }, []);

  return (
    <div
      className={`flex ${
        darkMode ? "bg-black text-white" : "bg - gray - 200"
      } h-24   items-center pl-10
    border-b-solid border-b-2 border-b-black pr-10`}
    >
      {" "}
      <h1 className="text-4xl w-[800px]">Welcome To Expense Tracker!!!</h1>
      {!isProfileUpdated && (
        <h4 className="bg-stone-400 p-2.5 rounded-3xl ml-[700px] w-[500px]">
          Your Profile is incomplete.{" "}
          <Link
            to="/profile"
            className="m-auto text-lg text-blue-900 border-b-solid border-b-2 border-b-blue-400"
          >
            Complete Now
          </Link>
        </h4>
      )}
      {isProfileUpdated && (
        <h4 className="bg-stone-400 p-2.5 rounded-3xl ml-10  w-[900px] flex">
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
      {isPremium && (
        <div className="ml-[100px]">
          <DarkTheme />
        </div>
      )}
      <button
        className="p-2 bg-gray-500 w-32 ml-10 rounded-3xl hover:bg-red-400 hover:text-white"
        onClick={() => navigate("/profile")}
      >
        Edit Profile
      </button>
      <button
        className="p-2 bg-gray-500 w-24 ml-24 rounded-3xl hover:bg-red-400 hover:text-white"
        onClick={() => dispatch(authActions.logout(navigate("/auth")))}
      >
        Log Out
      </button>
    </div>
  );
};

export default Home;
