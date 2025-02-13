import { useEffect, useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/profile", {
      headers: { Authorization: token },
    }).then((res) => setUser(res.data));
  }, []);

  const handleUpdate = async () => {
    await axios.put("http://localhost:5000/api/auth/profile", user, {
      headers: { Authorization: token },
    });
    alert("Profile updated successfully!");
  };

  return (
    <Container>
      <Typography variant="h4" textAlign="center">My Profile</Typography>
      <TextField fullWidth label="Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
      <TextField fullWidth label="Email" value={user.email} disabled />
      <Button variant="contained" color="primary" fullWidth onClick={handleUpdate}>Update Profile</Button>
    </Container>
  );
}

export default Profile;
