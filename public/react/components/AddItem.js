// addItem.js
import React, { useState } from "react";

export const AddItem = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onAdd(formData); // Trigger the callback to add the item
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "",
      image: "",
    }); // Reset form fields

    try {
        const response = await fetch(`http://localhost:3000/api/item`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });
  
        if (response.ok) {
          const newPage = await response.json();
          setPages((prevPages) => [...prevPages, newPage]);
         /* setIsAddingItem(false); // Return to the list view*/
          setFormData({ name: "", price: "", description: "", category: "", image: "" }); // Reset form
        } else {
          console.error("Failed to add article.");
        }
      } catch (err) {
        console.log("Error:", err);
      }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h3>Create a New Article</h3>
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="text"
        placeholder="Price"
        value={formData.price}
        onChange={handleInputChange}
        required
      />
      <input
        type="content"
        name="Description"
        placeholder="Description"
        value={formData.description}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image url"
        value={formData.image}
        onChange={handleInputChange}
      />
      <button type="submit">Add Article</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};
