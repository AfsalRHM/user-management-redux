import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../redux/user/userSlice';

export default function adminHome() {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleGoToDashboard = () => {
      navigate("/admin-dashboard");
    };
    const handleSignOut = async () => {
        try {
            const response = await fetch("/api/auth/admin-sign-out");
            dispatch(signOut());
            navigate('/admin-sign-in')
        } catch (error) {
            console.log(error)
        }
    }  
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
          onClick={handleGoToDashboard}
          className="bg-blue-400 p-2 rounded-2xl hover:opacity-90"
        >
          Go to Dashboard
        </button>

        <button
          onClick={handleSignOut}
          className="bg-red-400 p-2 mt-4 rounded-2xl hover:opacity-90"
        >
          Sign out
        </button>
      </div>
    )
}
