import React from "react";

const Category = ({ categories, onSelect, selectedCategory }) => {
  return (
    <div>
      <h2> Category</h2>
      <select
        onChange={(e) => onSelect(e.target.value)}
        value={selectedCategory}
      >
        {categories?.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Category;
