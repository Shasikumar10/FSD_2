import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [item, setItem] = useState({ name: "", description: "", location: "", contactInfo: "" });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/items/${id}`).then((res) => {
      setItem(res.data);
    });
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/items/${id}`, item, {
        headers: { Authorization: token },
      });
      navigate("/my-items");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" textAlign="center">Edit Item</Typography>
      <TextField fullWidth label="Name" value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} />
      <TextField fullWidth label="Description" value={item.description} onChange={(e) => setItem({ ...item, description: e.target.value })} />
      <TextField fullWidth label="Location" value={item.location} onChange={(e) => setItem({ ...item, location: e.target.value })} />
      <Button variant="contained" color="primary" fullWidth onClick={handleUpdate}>Update Item</Button>
    </Container>
  );
}

export default EditItem;
