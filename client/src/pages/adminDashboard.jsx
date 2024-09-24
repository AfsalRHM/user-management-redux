import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { app } from "../firebase";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAddUser, setIsAddUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);

  const navigate = useNavigate();

  const fileRef = useRef(null);

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  const goBack = () => {
    navigate("/admin");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/fetchusers", {
          method: "GET",
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsAddUser(false);
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const method = isAddUser ? "POST" : "PUT";
      const url = isAddUser
        ? "/api/admin/adduser"
        : `/api/admin/edituser/${currentUser._id}`;

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentUser),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const { updatedUser, message } = await response.json();
      console.log(message);

      if (isAddUser) {
        setUsers((prevUsers) => [...prevUsers, updatedUser]);
      } else {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          )
        );
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleDelete = async (user) => {
    try {
      const response = await fetch(`/api/admin/deleteuser/${user._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      const { message } = await response.json();
      setUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const addUser = () => {
    setCurrentUser({ username: "", email: "", password: "", profilepicture: "" });
    setIsAddUser(true);
    setIsModalOpen(true);
  };

  const { currentAdmin } = useSelector((state) => state.admin);

  if (!currentAdmin) {
    return <Navigate to="/admin-sign-in" replace />;
  }

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleImageUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setCurrentUser({ ...currentUser, profilepicture: downloadUrl })
        });
      }
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-slate-700">
        Admin Dashboard
      </h1>
      <div>
        <input
          type="text"
          placeholder="Search Users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-3 border border-gray-300 px-4 py-2 rounded-lg mr-4"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-gray-100 text-left text-sm font-semibold text-gray-700">
                ID
              </th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Profile pic
              </th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-gray-600">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b text-gray-600">
                  <img
                    src={user.profilepicture}
                    className="w-11 h-11 rounded-full object-cover border border-gray-300"
                    alt="User Profile"
                  />
                </td>
                <td className="py-2 px-4 border-b text-gray-600">
                  {user.username}
                </td>
                <td className="py-2 px-4 border-b text-gray-600">
                  {user.email}
                </td>
                <td className="py-2 px-4 border-b text-gray-600 space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center gap-8">
          <button
            onClick={addUser}
            className="text-white bg-gray-600 mt-9 p-2 rounded-full self-center hover:opacity-90"
          >
            Add user
          </button>
          <button
            onClick={goBack}
            className="bg-blue-400 mt-9 p-2 rounded-full self-center hover:opacity-90"
          >
            Go Back
          </button>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold text-center mb-6">
              {isAddUser ? "Add User" : "Edit User"}
            </h2>
            <form onSubmit={handleSave}>
              <div className="flex flex-col items-center mb-6">
                <input
                  type="file"
                  ref={fileRef}
                  hidden
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <img
                  className="h-24 w-24 rounded-full object-cover cursor-pointer mb-4"
                  src={currentUser.profilepicture}
                  alt="profile_pic"
                  onClick={() => fileRef.current.click()}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={currentUser?.username || ""}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, username: e.target.value })
                  }
                  className="border border-gray-300 p-3 w-full rounded focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={currentUser?.email || ""}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, email: e.target.value })
                  }
                  className="border border-gray-300 p-3 w-full rounded focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              {isAddUser && (
                <div className="mb-6">
                  <label className="block text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={currentUser?.password || ""}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currentUser,
                        password: e.target.value,
                      })
                    }
                    className="border border-gray-300 p-3 w-full rounded focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              )}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                >
                  {isAddUser ? "Add" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
