import React, { useState } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";

import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";

import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});

  const { error, loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  const {currentUser} = useSelector((state)=>state.user)
  if(currentUser){
    return <Navigate to='/' replace/>
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7 underline">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          id="Email"
          placeholder="Enter your Email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          id="Password"
          placeholder="Enter your Password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>New User?</p>
        <Link to="/sign-up">
          <span className="text-blue-500 font-semibold transition duration:0 hover:duration-1000 hover:underline">
            Sign Up
          </span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error.message || "Something is Wrong." : ""}
      </p>
    </div>
  );
}

export default SignIn;
