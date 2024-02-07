import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  const [logInUserData, setLoginUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logInUserData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.errorMsg) {
        console.log('dataErrorMSg====>',data);
        toast.error(data.errorMsg)
      }else{
        console.log("data====>", data);
        toast.success('You Have Landed Successfully')
        setTimeout(() => navigate("/"), 3000);
      }
    } catch (error) {
      setLoading(false);
      console.log("catched error====>", error);
    }
  };
  const handleChange = (e) => {
    setLoginUserData((logInUserData) => ({
      ...logInUserData,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <ToastContainer />
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>New user?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
    </div>
  );
}
