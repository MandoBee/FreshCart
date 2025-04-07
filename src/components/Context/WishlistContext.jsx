import axios from "axios";
import React, { useState, createContext } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query"; // Import useQueryClient

export const wishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistPrice, setWishlistPrice] = useState(0);
  const queryClient = useQueryClient(); // Initialize query client
  const headers = { token: localStorage.getItem("userToken"), };

  async function GetWishlistItems() {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: headers, }
        
      );

      
      // const totalCount = res.data.count.reduce((sum, product) => sum + product.count, 0);
      setWishlistCount(res.data.count); // Log the total count
      
      // const totalPrice = res.data.data[0]?.price.reduce((sum, product) => sum + product.price * product.count, 0);
      // setWishlistPrice(totalPrice); // Log the total price
      
    } catch (err) {
      console.log(err);
      throw err; // Re-throw the error if you want to handle it elsewhere
    }
  }

  async function AddWishlistItem(productId) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist/`,
        { productId: productId, },
        { headers: headers, }
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Product added to wishlist successfully");
          GetWishlistItems();
        } else {
          toast.error("Failed to add product to wishlist");
          console.log(res.data.err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function DeleteWishlistItem(productId, productCount) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: headers, }
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Item removed from wishlist successfully");
          GetWishlistItems();
        } else {
          toast.error("Failed to remove item from wishlist");
          console.log(res.data.err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function DeleteWishlistProduct(productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: headers,
      })
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Product deleted from wishlist successfully");
          queryClient.invalidateQueries("userWishlist"); // Invalidate the userwishlist query to refetch data
        } else {
          toast.error("Failed to delete product from wishlist");
          console.log(res.data.err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <wishlistContext.Provider
      value={{
        wishlistCount,
        wishlistPrice,
        setWishlistCount,
        AddWishlistItem,
        DeleteWishlistProduct,
        DeleteWishlistItem,
        GetWishlistItems,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
