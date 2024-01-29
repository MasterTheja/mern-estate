import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [loadig, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    console.log("e.target.id==>", e.target.value);
    setFormData((formData) => ({
      ...formData,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("formdat====>", formData);
    if (formData.username && formData.email && formData.password) {
      // try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.errorMsg) {
        toast.error(data.errorMsg);
      } else {
        toast.success(data);
        setTimeout(() => navigate("/sign-in"), 2000);
        console.log("data=====>", data, formData);
      }
      setLoading(false);
      // } catch (error) {
      //   setLoading(false);
      //   console.log("error===>", error);
      //   const js  = JSON.stringify(error)
      //   toast.error('Please fill all the Details');
      // }
    } else {
      setLoading(false);
      console.log("Please enter the Details");
      toast.error("Please enter the Details");
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <ToastContainer />
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
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
          {loadig ? "loading..." : "Sign up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
