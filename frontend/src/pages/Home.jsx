import { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Button, TextField } from "@mui/material";
import axios from "axios";

function Home() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/items");
        setItems(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Filter items based on search query and location query
  useEffect(() => {
    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        item.location.toLowerCase().includes(locationQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, locationQuery, items]);

  // Mark item as found
  const markAsFound = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/items/mark-found/${id}`);
      setItems(items.map((item) => (item._id === id ? { ...item, isFound: true } : item)));
    } catch (error) {
      console.error("Error marking item as found:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Lost & Found Items
      </Typography>

      {/* Search and Filter Inputs */}
      <TextField
        label="Search by Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <TextField
        label="Filter by Location"
        variant="outlined"
        fullWidth
        margin="normal"
        value={locationQuery}
        onChange={(e) => setLocationQuery(e.target.value)}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography>{item.description}</Typography>
                    <Typography color="textSecondary">{item.location}</Typography>
                    <Typography color="textSecondary">
                      Status: {item.isFound ? "Found" : "Lost"}
                    </Typography>
                    {!item.isFound && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => markAsFound(item._id)}
                      >
                        Mark as Found
                      </Button>
                    )}
                    {token && (
                      <Button
                        variant="contained"
                        color="secondary"
                        href={`/edit/${item._id}`}
                        style={{ marginTop: "10px" }}
                      >
                        Edit
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography align="center">No matching items found</Typography>
          )}
        </Grid>
      )}
    </Container>
  );
}

export default Home;
