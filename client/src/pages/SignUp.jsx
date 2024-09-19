import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7 underline">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          id="Username"
          placeholder="Enter your Username"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="text"
          id="Email"
          placeholder="Enter your Email"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="text"
          id="Password"
          placeholder="Enter your Password"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500 font-semibold transition duration:0 hover:duration-1000 hover:underline">
            Sign In
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
