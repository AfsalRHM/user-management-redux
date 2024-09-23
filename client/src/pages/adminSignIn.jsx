import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { signInSuccess, signInFailure } from "../redux/user/adminSlice";

import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

function AdminSignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});

  const { error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/admin-sign-in", {
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
      navigate("/admin");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  const { currentAdmin } = useSelector((state) => state.admin);
  if (currentAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7 underline">
        Admin Sign In
      </h1>
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
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign In
        </button>
        {/* <OAuth /> */}
      </form>
      <p className="text-red-700 mt-5">
        {error ? error.message || "Something is Wrong." : ""}
      </p>
    </div>
  );
}

export default AdminSignIn;
