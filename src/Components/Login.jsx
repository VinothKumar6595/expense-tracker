import React, { useState } from "react";
import image from "../assets/bg.jpg";
import { signUpUrl } from "../utils/url";
import { data } from "autoprefixer";

const Login = () => {
  const [email, setEmail] = useState("");
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
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
    if (password === confirm) {
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
      try {
        console.log("User Signed Up Successfully");
      } catch {
        console.log(data.error.message);
      }
    }
    setEmail(""), setPassword(""), setConfirm("");
  };
  return (
    <div className=" h-[940px] pt-36 style">
      <div className="bg-gray-400 flex items-center justify-center w-[360px] h-[440px] m-auto rounded-xl ">
        <form className="flex flex-col" onSubmit={formSubmitHandler}>
          <h1 className=" flex justify-center text-2xl font-semibold mb-16">
            Sign-Up
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-3 w-72 mb-2 rounded-lg"
            required
            onChange={confirmPasswordChangeHandler}
            value={confirm}
          />
          <button className="p-3 w-72 mb-2 rounded-lg bg-blue-400 text-white mt-16 hover:bg-white hover:text-blue-400">
            Sign Up
          </button>
        </form>
      </div>
      <div className=" flex items-center justify-center  m-auto  ">
        <button className="p-3 w-[360px]  rounded-lg bg-blue-400 text-white mt-10 hover:bg-gray-400 hover:text-white">
          Have an Account? Login
        </button>
      </div>
    </div>
  );
};

export default Login;
