import React, { useState, useEffect } from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

const Pagination = ({ totalItems, itemsPerPage } : PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalItems / itemsPerPage));
  const [inputPage, setInputPage] = useState('');

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputPage(value);
  };

  const handleGoToPage = () => {
    let pageNumber = parseInt(inputPage, 10);
    if (isNaN(pageNumber) || pageNumber <= 0) {
      pageNumber = 1;
    } else if (pageNumber > totalPages) {
      pageNumber = totalPages;
    }
    setCurrentPage(pageNumber);
    setInputPage('');
  };

  const renderPaginationNumbers = () => {
    const pageNumbers = [];
    const maxPageDisplay = 5;
    const middlePage = Math.ceil(maxPageDisplay / 2);

    let startPage = currentPage - middlePage + 1;
    let endPage = startPage + maxPageDisplay - 1;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages, maxPageDisplay);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - maxPageDisplay + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={i === currentPage ? 'active' : ''}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </span>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      {renderPaginationNumbers()}
      <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
      <div>
        <input
          type="number"
          value={inputPage}
          onChange={handleInputChange}
          placeholder="Go to page..."
        />
        <button onClick={handleGoToPage}>Go</button>
      </div>
    </div>
  );
};

export default Pagination;