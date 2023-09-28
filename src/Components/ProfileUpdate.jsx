import React, { Fragment, useContext, useState } from "react";
import { updateProfileUrl } from "../utils/url";
import AuthContext from "../Store/Auth-Context";

const ProfileUpdate = () => {
  const ctx = useContext(AuthContext);
  const [name, setName] = useState("");
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const [profile, setProfile] = useState(null);
  const profilePicHandler = (event) => {
    setProfile(event.target.value);
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

  return (
    <Fragment>
      <div
        className="bg-gray-200 h-24  flex items-center justify-between pl-10
border-b-solid border-b-2 border-b-black pr-10"
      >
        <h1 className="text-4xl">Expense Tracker</h1>
        <h4 className="bg-stone-400 p-2.5 rounded-xl w-96">
          Your Profile is 64% Completed . Please Complete your profile to move
          further...{" "}
        </h4>
      </div>
      <div className="w-[1800px] m-auto h-64 border-solid border-b-2 border-b-black pt-10 pl-24">
        <h3 className="font-bold text-lg pb-10 p-3 ">Contact Details</h3>
        <div>
          <form onSubmit={updateProfileHandler}>
            <label className="font-bold p-3">Full Name</label>
            <input
              type="text"
              className="p-2.5 rounded-md w-96 border-solid border-2 border-black"
              onChange={nameChangeHandler}
            />
            <label className="font-bold p-3 ml-36">Profile Photo URL</label>
            <input
              type="url"
              className="p-2.5 rounded-md w-96 border-solid border-2 border-black"
              onChange={profilePicHandler}
            />
            <div>
              <button className="bg-gray-300 p-2 rounded-lg text-black hover:bg-black hover:text-gray-300 mt-8 ml-10">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileUpdate;
