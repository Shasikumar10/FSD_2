import { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import MessageBox from "./MessageBox";

function ItemCard({ item }) {
  const [openMessageBox, setOpenMessageBox] = useState(false);

  return (
    <Card sx={{ margin: "10px 0" }}>
      <CardContent>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="body1">{item.description}</Typography>
        <Typography variant="subtitle2">Location: {item.location}</Typography>
        <Button variant="contained" onClick={() => setOpenMessageBox(true)}>Contact Owner</Button>
      </CardContent>
      <MessageBox item={item} open={openMessageBox} handleClose={() => setOpenMessageBox(false)} />
    </Card>
  );
}

export default ItemCard;
