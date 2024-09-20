import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-7 underline">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          src={currentUser.profilepicture}
          alt="profile_pic"
        />
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          defaultValue={currentUser.email}
          type="text"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer font-semibold">Delete Account</span>
        <span  className="text-red-700 cursor-pointer font-semibold">Sign out</span>
      </div>
    </div>
  );
}

export default Profile;
