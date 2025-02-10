import React, { useState, useEffect } from "react";
import axios from "axios";

const FormPage = () => {
  const [data, setData] = useState([]); // To store all user data
  const [formData, setFormData] = useState({ name: "", age: "" }); // Form data
  const [isEditing, setIsEditing] = useState(false); // Editing state
  const [editId, setEditId] = useState(null); // ID of the record being edited

  const API_BASE = "http://localhost:1122"; // API Base URL

  // Fetch data from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE}/getdatas`);
      setData(response.data.totaldatas);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.age) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (isEditing) {
        // Update existing data
        await axios.put(`${API_BASE}/updatedatas/${editId}`, formData);
        setIsEditing(false);
        setEditId(null);
      } else {
        // Insert new data
        await axios.post(`${API_BASE}/insertdatas`, formData);
      }
      setFormData({ name: "", age: "" }); // Reset form
      fetchData(); // Refresh data
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`${API_BASE}/deletedatas/${id}`);
        fetchData();
      } catch (err) {
        console.error("Error deleting data:", err);
      }
    }
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, age: user.age });
    setIsEditing(true);
    setEditId(user._id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manage Users</h1>

      {/* Form */}
      <form onSubmit={handleFormSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
      </form>

      {/* Data Table */}
      <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>
                  <button onClick={() => handleEdit(user)} style={{ marginRight: "10px" }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No data found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FormPage;
