import React from "react";

const Pagination = ({ totalPages, currentPage, onChange }) => {
  if (totalPages <= 1) return null;

  return (
    <nav>
      <ul className="pagination mt-4 justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onChange(currentPage - 1)}>Prev</button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i + 1} className={`page-item ${i + 1 === currentPage ? "active" : ""}`}>
            <button className="page-link" onClick={() => onChange(i + 1)}>{i + 1}</button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onChange(currentPage + 1)}>Next</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
