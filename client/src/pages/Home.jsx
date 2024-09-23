import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleGoToProfile = () => {
    navigate("/profile");
  };
  if(!currentUser){
    return <Navigate to='/sign-in' replace/>
  }
  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      {currentUser ? (
        <h1 className="text-3xl font-bold mb-4 text-slate-700">
        Welcome, {currentUser.username}
      </h1>
      ) : (
        <h1 className="text-3xl font-bold mb-4 text-slate-700">
          Welcome, Guest
        </h1>
      )}
      
      <button
        onClick={handleGoToProfile}
        className="bg-blue-400 p-2 rounded-2xl hover:opacity-90"
      >
        Go to Profile
      </button>
    </div>
  );
};

export default Home;
