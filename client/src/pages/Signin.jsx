import React from 'react'
// import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  const handleSubmit=()=>{

  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      {/* <ToastContainer /> */}
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          //onChange={handleChange}
        />
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          //onChange={handleChange}
        />
        <button
          //onClick={handleSubmit}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >Sign In
          {/* {loadig ? "loading..." : "Sign up"} */}
        </button>
        </form>
        <div className="flex gap-2 mt-5">
        <p>New user?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
        </div>
  )
}
 