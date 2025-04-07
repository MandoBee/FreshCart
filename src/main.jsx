import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.css";
import "flowbite/dist/flowbite.min.js";
import CartContextProvider from "./components/Context/CartContext.jsx";
import AuthContextProvider from "./components/Context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";
import CategoryContextProvider from "./components/Context/CategoryContext.jsx";
import BrandsContextProvider from "./components/Context/BrandsContext.jsx";
import WishListContextProvider from "./components/Context/WishlistContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <WishListContextProvider>
          <AuthContextProvider>
            <CategoryContextProvider>
              <BrandsContextProvider>
                <App />
                <Toaster />
              </BrandsContextProvider>
            </CategoryContextProvider>
          </AuthContextProvider>
        </WishListContextProvider>
      </CartContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
