import { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";

function MessageBox({ item, open, handleClose }) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    await axios.post("http://localhost:5000/api/messages", {
      receiverId: item.userId,
      itemId: item._id,
      message,
    }, { headers: { Authorization: localStorage.getItem("token") } });

    alert("Message sent!");
    setMessage("");
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Contact Owner</DialogTitle>
      <DialogContent>
        <TextField fullWidth multiline rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={sendMessage} variant="contained">Send</Button>
      </DialogActions>
    </Dialog>
  );
}

export default MessageBox;
