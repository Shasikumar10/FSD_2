import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";

const AdminClaims = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/claims");
        setClaims(res.data);
      } catch (error) {
        console.error("Error fetching claims", error);
      }
    };
    fetchClaims();
  }, []);

  const handleAction = async (claimId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/claims/update/${claimId}`, { status });
      setClaims(claims.map(claim => (claim._id === claimId ? { ...claim, status } : claim)));
    } catch (error) {
      console.error("Failed to update claim status");
    }
  };

  return (
    <Container>
      <h2>Admin Claims Panel</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item</th>
            <th>User</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim._id}>
              <td>{claim.itemId.title}</td>
              <td>{claim.userId.username}</td>
              <td>{claim.reason}</td>
              <td>{claim.status}</td>
              <td>
                <Button variant="success" onClick={() => handleAction(claim._id, "Approved")}>Approve</Button>
                <Button variant="danger" onClick={() => handleAction(claim._id, "Rejected")}>Reject</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminClaims;
