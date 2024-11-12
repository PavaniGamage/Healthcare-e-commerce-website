// Pagination.jsx
import React from 'react';
import './Pagination.css'; 

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    // Handle next and previous page changes
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    // Generate dynamic page numbers based on total pages
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className='lordmore-pagination'>
        <div className='pagination'>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
  
          {currentPage > 3 && (
            <>
              <button onClick={() => setCurrentPage(1)}>1</button>
              {currentPage > 4 && <span>...</span>}
            </>
          )}
  
          {pageNumbers
            .slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))
            .map(number => (
              <button
                key={number}
                className={currentPage === number ? 'active' : ''}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            ))}
  
          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && <span>...</span>}
              <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
            </>
          )}
  
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    );
};

export default Pagination;
