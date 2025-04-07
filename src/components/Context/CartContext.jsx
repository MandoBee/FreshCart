import axios from "axios";
import React, { useState, createContext } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query"; // Import useQueryClient

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartPrice, setCartPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]); // Initialize cartItems state
  const [cartId, setCartId] = useState(null); // Initialize cartId state
  const queryClient = useQueryClient(); // Initialize query client
  const headers = { token: localStorage.getItem("userToken"), };

  async function GetCartItems() {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",
        { headers: headers, }
      );
      const totalCount = res.data.data.products.reduce((sum, product) => sum + product.count, 0);
      setCartCount(totalCount); // Log the total count
      const totalPrice = res.data.data.products.reduce((sum, product) => sum + product.price * product.count, 0);
      setCartPrice(totalPrice); // Log the total price
      setCartItems(res.data.data.products); // Set cart items state
      setCartId(res.data.data._id); // Set cart ID state

      
      
    } catch (err) {
      console.log(err);
      throw err; // Re-throw the error if you want to handle it elsewhere
    }
  }

  async function AddProductItem(productId) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart/`,
        { productId: productId, },
        { headers: headers, }
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Product added to cart successfully");
          GetCartItems();
        } else {
          toast.error("Failed to add product to cart");
          console.log(res.data.err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function DeleteProductItem(productId, productCount) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: productCount, },
        { headers: headers, }
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Item removed from cart successfully");
          GetCartItems();
        } else {
          toast.error("Failed to remove item from cart");
          console.log(res.data.err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function DeleteProduct(productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: headers,
      })
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Product deleted from cart successfully");
          queryClient.invalidateQueries("userCart"); // Invalidate the userCart query to refetch data
        } else {
          toast.error("Failed to delete product from cart");
          console.log(res.data.err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
async function ClearCart () {
  return await axios
  .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers: headers,
  })
  .then((res) => {
    if (res.data.message === "success") {
      toast.success("Your Order Proceded And Your Cart cleared successfully");
      queryClient.invalidateQueries("userCart"); // Invalidate the userCart query to refetch data
    } else {
      toast.error("Failed to clear cart");
      console.log(res.data.err);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

  return (
    <cartContext.Provider
      value={{
        cartCount,
        cartPrice,
        cartItems,
        cartId,
        ClearCart,
        setCartCount,
        AddProductItem,
        DeleteProduct,
        DeleteProductItem,
        GetCartItems,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
