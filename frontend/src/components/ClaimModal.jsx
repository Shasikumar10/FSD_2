import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const ClaimModal = ({ show, handleClose, itemId }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/claims/create", {
        itemId,
        name,
        contact,
        message,
      });

      alert("Claim request submitted successfully!");
      handleClose();
    } catch (error) {
      console.error("Error submitting claim:", error);
      alert("Failed to submit claim request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Claim This Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contact Information</Form.Label>
            <Form.Control type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Why do you claim this item?</Form.Label>
            <Form.Control as="textarea" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Claim"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ClaimModal;
