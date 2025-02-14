import { useEffect, useState } from "react";
import { Container, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/messages", { headers: { Authorization: localStorage.getItem("token") } })
      .then((res) => setMessages(res.data));
  }, []);

  return (
    <Container>
      <Typography variant="h4">Your Messages</Typography>
      {messages.map((msg) => (
        <Card key={msg._id} sx={{ margin: "10px 0" }}>
          <CardContent>
            <Typography variant="h6">From: {msg.senderId.name}</Typography>
            <Typography variant="body1">{msg.message}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Messages;
