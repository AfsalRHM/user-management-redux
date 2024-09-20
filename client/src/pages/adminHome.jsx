import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function adminHome() {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const handleGoToProfile = () => {
      navigate("/admin-dashboard");
    };
    return (
      <div className="flex justify-center items-center min-h-screen flex-col">
        {currentUser ? (
          <h1 className="text-3xl font-bold mb-4 text-slate-700">
          Welcome Admin, {currentUser.username}
        </h1>
        ) : (
          <h1 className="text-3xl font-bold mb-4 text-slate-700">
            Welcome Admin, Guest
          </h1>
        )}
        
        <button
          onClick={handleGoToProfile}
          className="bg-blue-400 p-2 rounded-2xl hover:opacity-90"
        >
          Go to Dashboard
        </button>
      </div>
    )
}
