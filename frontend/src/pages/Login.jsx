import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/"; // Redirect to home
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Container>
      <Box mt={5} textAlign="center">
        <Typography variant="h4">Login</Typography>
      </Box>
      <TextField fullWidth margin="normal" label="Email" onChange={(e) => setEmail(e.target.value)} />
      <TextField fullWidth margin="normal" label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
}

export default Login;
