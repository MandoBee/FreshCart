import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../Context/CartContext";
import { useContext } from "react";
import { NumericFormat } from 'react-number-format';
import { GridLoader } from "react-spinners";
import { wishlistContext } from "../Context/WishlistContext";
import useGetWishlist from "../../Hooks/useGetWishlist";


export default function Wishlist() {
  const { isLoading, isError, isFetching, error, data } = useGetWishlist();
  const {wishlistCount, setWishlistCount, AddWishlistItem, DeleteWishlistItem, GetWishlistItems, DeleteWishlistProduct} = useContext(wishlistContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (data) {
      setWishlistItems(data.data.data);
      GetWishlistItems();
      // console.log("Wishlist Items: ", data.data.data);
      
    }
  }, [data]);
  
  
  return (
    (wishlistCount === 0 && !isError && !isLoading && !isFetching) ? (
      
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Wish List is empty</h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">Start shopping now!</p>
        <Link to={"/"} className="mt-6 inline-flex items-center px-4 py-2 text-sm font-medium text-main bg-primary-700 rounded-md hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          Go to Products
        </Link>
      </div>
      
    ) : (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      {isLoading && (
        <div className="flex flex-wrap justify-center items-center min-h-screen">
          <GridLoader color="#0aad0a" loading margin={0} size={30} />
        </div>
      )}
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-main dark:text-white sm:text-2xl">
          Wishlist
        </h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">

              {/* Loop through cart items */}
              {wishlistItems?.map((item, idx) => (
              <div key={idx} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <Link to={`/productdetails/${item.id}`} className="shrink-0 md:order-1">
                    <img
                      className="h-20 w-20 dark:hidden"
                      src={item.imageCover}
                      alt={item.title}
                    />
                  </Link>
                  
                  <div className="flex items-center justify-between md:order-3 md:justify-end">
                    

                    {/* Item Price */}
                    <div className="text-end md:order-4 md:w-32">
                      <p className="text-base font-bold text-gray-900 dark:text-white">
                        <NumericFormat value={item.price} displayType="text" thousandSeparator={true} prefix="LE. " decimalScale={2} fixedDecimalScale={true} />
                      </p>
                    </div>
                    {/* End Item Price */}
                  </div>

                  <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <Link
                      to={`/productdetails/${item.id}`}
                      className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                    >
                      {item.title}
                    </Link>
                    <div className="flex items-center gap-4">
                      
          
                      
                      {/* Remove */}
                      <button
                        type="button"
                        onClick={async() => {
                          await DeleteWishlistProduct(item.id);
                          await GetWishlistItems(); // Refetch cart items after deletion
                        }}

                        className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                      >
                        <svg
                          className="me-1.5 h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18 17.94 6M18 18 6.06 6"
                          />
                        </svg>
                        Remove
                      </button>
                      {/* End Remove */}

                    </div>
                  </div>
                </div>
              </div>
               ))}

              {/* End Loop */}


            </div>

          </div>
          {/* End Also Bought */}
          

        </div>
      </div>
    </section>
  ));
  
}
