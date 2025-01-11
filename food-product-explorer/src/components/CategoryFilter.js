import React from 'react';

const CategoryFilter = ({ categories, onCategorySelect }) => {
  return (
    <select onChange={(event) => onCategorySelect(event.target.value)}>
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;