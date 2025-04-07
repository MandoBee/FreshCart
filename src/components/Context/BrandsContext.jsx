import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const brandsContext = createContext();

export default function BrandsContextProvider({ children }) {
  const [brands, setBrands] = useState([]);

  async function getBrands() {
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setBrands(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } 
  }

  async function getSpecificBrand(brandId) {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`
      );
      setBrands(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } 
  }

  return (
    <brandsContext.Provider
      value={{ brands, setBrands, getBrands, getSpecificBrand }}
    >
      {children}
    </brandsContext.Provider>
  );
}
