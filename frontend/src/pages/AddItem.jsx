import { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const [formData, setFormData] = useState({ name: "", description: "", location: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/items", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add item");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>Add Lost Item</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Item Name" name="name" margin="normal" onChange={handleChange} required />
        <TextField fullWidth label="Description" name="description" margin="normal" onChange={handleChange} required />
        <TextField fullWidth label="Location" name="location" margin="normal" onChange={handleChange} required />
        <Button fullWidth variant="contained" color="primary" type="submit">Submit</Button>
      </form>
    </Container>
  );
}

export default AddItem;
