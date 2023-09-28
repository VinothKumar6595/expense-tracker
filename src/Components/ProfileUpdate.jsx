import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  getUserDetailsUrl,
  sendEmailVerificationUrl,
  updateProfileUrl,
} from "../utils/url";
import AuthContext from "../Store/Auth-Context";

const ProfileUpdate = () => {
  const ctx = useContext(AuthContext);

  const [name, setName] = useState("");
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const [profile, setProfile] = useState("");
  const profilePicHandler = (event) => {
    setProfile(event.target.value);
  };

  const editProfileHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(getUserDetailsUrl, {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.token,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      console.log(data);
      setName(data.users[0].displayName);
      setProfile(data.users[0].photoUrl);
      console.log("Edit User Details Now");
    } catch (error) {
      alert(error.message);
    }
  };

  const updateProfileHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(updateProfileUrl, {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.token,
          displayName: name,
          photoUrl: profile,
          returnSecureToken: false,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.Error.message);
      }
      console.log("User Profile Updated");
    } catch (error) {
      alert(error.message);
    }
    setName(""), setProfile("");
  };

  const verifyEmailHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(sendEmailVerificationUrl, {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: ctx.token,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      console.log(response);
      console.log(data);
      console.log("Email Verification Link sent to email");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Fragment>
      <div
        className="bg-gray-200 h-24  flex items-center pl-10
border-b-solid border-b-2 border-b-black pr-10"
      >
        <h1 className="text-4xl">Expense Tracker</h1>
        <h4 className="bg-stone-400 p-2.5 rounded-xl ml-[960px] w-96">
          Your Profile is Incomplete, Please Complete your profile to move
          further...{" "}
        </h4>
        <button
          className="p-2 bg-gray-500 w-24 ml-24 rounded-3xl hover:bg-red-400 hover:text-white"
          onClick={() => ctx.logout()}
        >
          Log Out
        </button>
      </div>
      <div className="w-[1800px] m-auto h-64 border-solid border-b-2 border-b-black pt-10 pl-24">
        <h3 className="font-bold text-lg pb-10 p-3 ">Contact Details</h3>
        <div>
          <form>
            <label className="font-bold p-3">Full Name</label>
            <input
              type="text"
              className="p-2.5 rounded-md w-96 border-solid border-2 border-black"
              onChange={nameChangeHandler}
              value={name}
            />
            <label className="font-bold p-3 ml-36">Profile Photo URL</label>
            <input
              type="url"
              className="p-2.5 rounded-md w-96 border-solid border-2 border-black"
              onChange={profilePicHandler}
              value={profile}
            />
            <div className="flex">
              <button
                className="bg-gray-300 w-36 p-2 rounded-lg text-black hover:bg-black hover:text-gray-300 mt-8 ml-10"
                onClick={updateProfileHandler}
              >
                Update Profile
              </button>
              <button
                className="bg-gray-300 p-2 w-36 rounded-lg text-black hover:bg-black hover:text-gray-300 mt-8 ml-[1200px]"
                onClick={editProfileHandler}
              >
                Edit Profile
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex">
        <button
          className="p-6 bg-slate-500 w-[500px] mt-36 ml-[700px] hover:bg-stone-400 hover:text-white rounded-lg font-semibold text-xl"
          onClick={verifyEmailHandler}
        >
          Verify Your Email Now!!!
        </button>
      </div>
    </Fragment>
  );
};

export default ProfileUpdate;
