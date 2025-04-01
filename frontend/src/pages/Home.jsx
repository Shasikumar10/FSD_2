import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleClaim = async (itemId) => {
    if (!user) {
      alert("You must be logged in to claim an item.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/claims", {
        itemId,
        userEmail: user.email,
      });

      alert("Claim request submitted!");
    } catch (error) {
      console.error("Error claiming item:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Lost & Found Items</h2>
      <div className="row">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item._id} className="col-md-4">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{item.itemName}</h5>
                  <p className="card-text">{item.description}</p>
                  <p><strong>Location:</strong> {item.location}</p>
                  <p><strong>Category:</strong> {item.category}</p>
                  <p><strong>Posted by:</strong> {item.user}</p>
                  {user && (
                    <button 
                      className="btn btn-success" 
                      onClick={() => handleClaim(item._id)}
                    >
                      Claim Item
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
