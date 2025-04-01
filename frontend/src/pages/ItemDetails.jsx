import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Spinner, Alert, Button } from "react-bootstrap";

function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setItem(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch item details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-4">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-4">
        <Alert variant="danger">{error}</Alert>
        <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="shadow-lg">
        <Card.Img
          variant="top"
          src={item.image || "https://via.placeholder.com/500"}
          alt={item.name}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="text-center">{item.name}</Card.Title>
          <Card.Text className="text-center">
            <strong>Category:</strong> {item.category}
          </Card.Text>
          <Card.Text className="text-center">{item.description}</Card.Text>
          <div className="text-center">
            <Button as={Link} to="/" variant="primary">Back to Home</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ItemDetails;
