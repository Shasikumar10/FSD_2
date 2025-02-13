import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/login";
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Container>
      <Box mt={5} textAlign="center">
        <Typography variant="h4">Register</Typography>
      </Box>
      <TextField fullWidth margin="normal" label="Name" onChange={(e) => setName(e.target.value)} />
      <TextField fullWidth margin="normal" label="Email" onChange={(e) => setEmail(e.target.value)} />
      <TextField fullWidth margin="normal" label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
        Register
      </Button>
    </Container>
  );
}

export default Register;
