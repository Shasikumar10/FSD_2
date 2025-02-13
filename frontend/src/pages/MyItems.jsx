import { useEffect, useState } from "react";
import { Container, Card, CardContent, Typography, Button } from "@mui/material";
import axios from "axios";

function MyItems() {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/items/my-items", {
      headers: { Authorization: token },
    }).then((res) => setItems(res.data));
  }, []);

  const markAsFound = async (id) => {
    await axios.put(`http://localhost:5000/api/items/${id}/found`, {}, {
      headers: { Authorization: token },
    });
    window.location.reload();
  };

  return (
    <Container>
      <Typography variant="h4" textAlign="center">My Posted Items</Typography>
      {items.map((item) => (
        <Card key={item._id} sx={{ margin: "10px 0" }}>
          <CardContent>
            <Typography variant="h5">{item.name}</Typography>
            <Typography variant="body1">{item.description}</Typography>
            <Typography variant="subtitle2">Location: {item.location}</Typography>
            {item.found ? (
              <Typography color="green">✔ Found</Typography>
            ) : (
              <Button variant="contained" color="success" onClick={() => markAsFound(item._id)}>Mark as Found</Button>
            )}
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default MyItems;
