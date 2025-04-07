import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const categoryContext = createContext();

export default function CategoryContextProvider({ children }) {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } 
  }

  async function getSpecificCategory(categoryId) {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`
      );
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } 
  }

  return (
    <categoryContext.Provider
      value={{ categories, setCategories, getCategories, getSpecificCategory }}
    >
      {children}
    </categoryContext.Provider>
  );
}
