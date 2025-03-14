import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import Loading from "./Loading";
import toast, { Toaster } from 'react-hot-toast';

const MyTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    photo: null,
    id_card: null
  });

  const fetchData = async () => {
    try {
      const res = await axios.get("https://passengersmanagementsystem-1.onrender.com/api/users");
      setData(res.data.users);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setUpdateFormData({
      name: user.name,
      age: user.age,
      gender: user.gender,
      contact: user.contact,
      email: user.email,
      photo: user.photo,
      id_card: user.id_card
    });
    setShowUpdateForm(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append('name', updateFormData.name);
    formData.append('age', updateFormData.age);
    formData.append('gender', updateFormData.gender);
    formData.append('contact', updateFormData.contact);
    formData.append('email', updateFormData.email);

    if (updateFormData.photo instanceof File) {
      formData.append('photo', updateFormData.photo);
    }
    if (updateFormData.id_card instanceof File) {
      formData.append('id_card', updateFormData.id_card);
    }

    try {
      const response = await axios.put(
        `https://passengersmanagementsystem-1.onrender.com/api/update/${selectedUser._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        alert("User updated successfully!");
        setShowUpdateForm(false);
        fetchData();
      }
    } catch (err) {
      console.error("Update error:", err);
      alert(err.response?.data?.message || "Error updating user");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setUpdateFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setUpdateFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(`https://passengersmanagementsystem-1.onrender.com/api/delete/${id}`);
        if (response.status === 200) {
          alert("User deleted successfully!");
          fetchData();
        }
      } catch (err) {
        alert(err.response?.data?.message || "Error deleting user");
        console.error("Delete error:", err);
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="relative">
      <div className="p-4 overflow-x-auto">
        <div className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-600 text-sm">
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Age</th>
                <th className="px-6 py-4 font-semibold">Gender</th>
                <th className="px-6 py-4 font-semibold">Contact No.</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Photo</th>
                <th className="px-6 py-4 font-semibold">ID Card</th>
                <th className="px-6 py-4 font-semibold">Update</th>
                <th className="px-6 py-4 font-semibold">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                      <img
                        src={user.photo}
                        alt="User"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%239CA3AF"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/></svg>';
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a 
                      href={user.id_card}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      View ID
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleUpdate(user)}
                      className="text-blue-600 hover:text-blue-800 p-2 rounded transition-colors"
                      title="Update user"
                    >
                      <GrDocumentUpdate className="text-xl" />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-800 p-2 rounded transition-colors"
                      title="Delete user"
                    >
                      <MdDelete className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showUpdateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowUpdateForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <IoMdClose size={24} />
            </button>
            
            <h2 className="text-xl font-semibold mb-4">Update User</h2>
            
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={updateFormData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={updateFormData.age}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={updateFormData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact
                </label>
                <input
                  type="text"
                  name="contact"
                  value={updateFormData.contact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={updateFormData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photo
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleInputChange}
                  className="w-full"
                  accept="image/*"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID Card
                </label>
                <input
                  type="file"
                  name="id_card"
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Update User
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTable;