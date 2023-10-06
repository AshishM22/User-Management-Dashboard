import "./Pagination.css";
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const renderPageNumbers = () => {
    const pageNumbers = getPageNumbers();

    return pageNumbers.map((number) => (
      <button
        key={number}
        onClick={() => onPageChange(number)}
        className={`${
          currentPage === number ? "active " : "pagination-button"
        } }`}
        disabled={currentPage === totalPages && number === totalPages}
      >
        {number}
      </button>
    ));
  };

  return (
    <main className="pagination">
      <button
        onClick={() => onPageChange(1)}
        className={currentPage === 1 ? "disabled" : "pagination-button"}
        disabled={currentPage === 1}
      >
        &lt;&lt;
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={currentPage === 1 ? "disabled" : "pagination-button"}
      >
        &lt;
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={
          currentPage === totalPages ? "disabled" : "pagination-button"
        }
      >
        &gt;
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={
          currentPage === totalPages ? "disabled" : "pagination-button"
        }
      >
        &gt;&gt;
      </button>
    </main>
  );
};

export default Pagination;
