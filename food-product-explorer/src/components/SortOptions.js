import React from 'react';

const SortOptions = ({ onSortChange }) => {
  return (
    <select onChange={(event) => onSortChange(event.target.value)}>
      <option value="">Sort by...</option>
      <option value="name-asc">Name (A-Z)</option>
      <option value="name-desc">Name (Z-A)</option>
      <option value="nutrition-asc">Nutrition Grade (A-E)</option>
      <option value="nutrition-desc">Nutrition Grade (E-A)</option>
    </select>
  );
};

export default SortOptions;