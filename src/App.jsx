import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { API_URL } from "./data";
import CarCard from "./components/CarCard";
import CarModal from "./components/CarModal";
import Pagination from "./components/Pagination";

const App = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("wishlist")) || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("low");
  const [selectedCar, setSelectedCar] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const carsPerPage = 10;

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched car data:", data);  // Log data to check API response
        setCars(data);
        setFilteredCars(data);
      })
      .catch(() => alert("Failed to fetch car data."));
  }, []);

  useEffect(() => {
    let result = [...cars].filter(car =>
      car.brand.toLowerCase().includes(search) ||
      car.model.toLowerCase().includes(search)
    );

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredCars(result);
    setCurrentPage(1);
  }, [search, sort, cars]);

  const handleWishlistToggle = (carId) => {
    const updated = wishlist.some(c => c.id === carId)
      ? wishlist.filter(c => c.id !== carId)
      : [...wishlist, cars.find(c => c.id === carId)];

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const start = (currentPage - 1) * carsPerPage;
  const paginatedCars = filteredCars.slice(start, start + carsPerPage);

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Car Finder</h3>
          <button className="btn btn-dark" onClick={() => setDarkMode(!darkMode)}>
            Toggle Dark Mode
          </button>
        </div>

        <div className="row mb-3">
          <div className="col-md-4 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search for cars..."
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </div>
          <div className="col-md-4 mb-2">
            <select className="form-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="low">Sort by Price: Low to High</option>
              <option value="high">Sort by Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
          {paginatedCars.map(car => (
            <CarCard
              key={car.id}
              car={car}
              inWishlist={wishlist.some(w => w.id === car.id)}
              onDetails={(id) => setSelectedCar(cars.find(c => c.id === id))}
              onToggleWishlist={handleWishlistToggle}
            />
          ))}
        </div>

        <Pagination
          totalPages={Math.ceil(filteredCars.length / carsPerPage)}
          currentPage={currentPage}
          onChange={setCurrentPage}
        />

        <CarModal
          show={!!selectedCar}
          onHide={() => setSelectedCar(null)}
          car={selectedCar}
        />
      </div>
    </div>
  );
};

export default App;
