import { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function AddItem() {
  const [item, setItem] = useState({ name: "", description: "", location: "" });

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/api/items", item, {
      headers: { Authorization: localStorage.getItem("token") },
    });

    socket.emit("newItem", res.data); // Send real-time update
    alert("Item added successfully!");
    setItem({ name: "", description: "", location: "" });
  };

  return (
    <Container>
      <Typography variant="h4">Report Lost Item</Typography>
      <TextField fullWidth label="Item Name" onChange={(e) => setItem({ ...item, name: e.target.value })} />
      <TextField fullWidth label="Description" onChange={(e) => setItem({ ...item, description: e.target.value })} />
      <TextField fullWidth label="Location" onChange={(e) => setItem({ ...item, location: e.target.value })} />
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </Container>
  );
}

export default AddItem;
