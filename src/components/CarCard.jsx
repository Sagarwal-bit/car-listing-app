import React from "react";

const CarCard = ({ car, inWishlist, onDetails, onToggleWishlist }) => {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <img
          src={car.image}
          className="card-img-top"
          alt={car.model}
          style={{ height: "160px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title mb-2">{car.brand} {car.model}</h5>
            <div className="mb-2">
              <span className="car-badge">{car.year}</span>
              <span className="car-badge">{car.type}</span>
              <span className="car-badge">{car.mileage}</span>
              <span className="car-badge">{car.transmission}</span>
              <span className="car-badge">{car.people} seats</span>
            </div>
            <div>
              <strong className="text-primary fs-6">${car.price}/month</strong>
            </div>
          </div>
          <div className="mt-3 d-flex justify-content-between align-items-center">
            <button className="btn btn-outline-primary btn-sm" onClick={() => onDetails(car.id)}>
              Details
            </button>
            <button
              className={`wishlist-btn btn-sm ${inWishlist ? "btn-outline-danger" : ""}`}
              onClick={() => onToggleWishlist(car.id)}
            >
              {inWishlist ? "❤️ Wishlisted" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
