import React from "react";
import { Modal } from "react-bootstrap";

const CarModal = ({ show, onHide, car }) => {
  if (!car) return null;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{car.brand} {car.model}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={car.image} className="img-fluid mb-3" alt={car.model} />
        <ul>
          <li><strong>Year:</strong> {car.year}</li>
          <li><strong>Type:</strong> {car.type}</li>
          <li><strong>Mileage:</strong> {car.mileage}</li>
          <li><strong>Transmission:</strong> {car.transmission}</li>
          <li><strong>Capacity:</strong> {car.people} people</li>
          <li><strong>Price:</strong> ${car.price}</li>
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default CarModal;
