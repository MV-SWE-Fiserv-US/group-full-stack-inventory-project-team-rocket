import React, { useState, useEffect } from "react";
import { ItemsList } from "./ItemsList";
import { Item } from "./Item";
import apiURL from "../api";
import { DeleteButton } from "./DeleteButton";

export const App = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // New state
  const [isAddingItem, setIsAddingItem]= useState(null);
  async function fetchItems() {
    try {
      const response = await fetch(`http://localhost:3000/item`);
	  console.log(response)
	  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const itemsData = await response.json();
	  console.log("Fetched items: ", itemsData);
      setItems(itemsData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]); // Add the new article to the list
    setIsAddingItem(false); // Close the form
  };

  const handleCancelAddItem = () => {
    setIsAddingItem(false); // Close the form
  };

  


  async function deleteItem (itemToDelete) {
    try{
      const response = await fetch(`${apiURL}/item/${itemToDelete}`, {
        method: "DELETE",
      });
      setSelectedItem(null)
      
    }catch(err){
      console.log("error deleting item", err)
    }
  }

  useEffect(() => {
    fetchItems();
  }, [selectedItem]); //selectedItem added to dependancy
  //deleteItem sets selectedItem to null which will cause useEffect to trigger to update the list 
  //ternary will display list of items when selectedItem is null as well.

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  return (
    <main>
      <h1>Item Store</h1>
      {isAddingArticle ? (
         <AddItem onAdd={handleAddItem} onCancel={handleCancelAddItem} />
      ) :
	   selectedItem ? (
        <div>
          <button onClick={handleBack}>Back to Items</button>
          <Item item={selectedItem} />
          <DeleteButton deleteItem={deleteItem} item={selectedItem} />
        </div>
      ) : (
        <>
          <button onClick={() => setIsAddingArticle(true)}>
            Add New Item
          </button>
          <h2>All Items</h2>
		  <button onClick={() => setIsAddingItem(true)}>
            Create New Article
          </button>
          <ItemsList items={items} onSelectItem={handleSelectItem} />
        </>
      )}
    </main>
  );
};

