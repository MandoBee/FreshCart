import React, { useEffect, useState } from "react";
import useGetCart from "../../Hooks/useGetCart";
import { Link } from "react-router-dom";
import { cartContext } from "../Context/CartContext";
import { useContext } from "react";
import { NumericFormat } from 'react-number-format';
import { GridLoader } from "react-spinners";
import { wishlistContext } from "../Context/WishlistContext";


export default function Cart() {
  const { isLoading, isError, isFetching, error, data } = useGetCart();
  const { cartCount, cartPrice, setCartCount, AddProductItem, DeleteProduct, GetCartItems, DeleteProductItem } = useContext(cartContext);
  const {wishlistCount, setWishlistCount, AddWishlistItem, DeleteWishlistItem, GetWishlistItems} = useContext(wishlistContext);
  let cartItems = data?.data.data.products;
  const numOfItems = data?.data.data.numOfItems;
  const [cartDetails, setCartDetails] = useState(null);

  useEffect(() => {
    if (data) {
      cartItems=(data?.data.data.products); // Set cart details in state
    }
    
  }, [data]);
  
  
  return (
    (cartCount === 0 && !isError && !isLoading && !isFetching) ? (
      
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your cart is empty</h1>
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
          Shopping Cart
        </h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
            
              {/* Loop through cart items */}
              {cartItems?.map((item, idx) => (
              <div key={idx} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <Link to={`/productdetails/${item.product._id}`} className="shrink-0 md:order-1">
                    <img
                      className="h-20 w-20 dark:hidden"
                      src={item.product.imageCover}
                      alt={item.product.title}
                    />
                  </Link>
                  
                  <div className="flex items-center justify-between md:order-3 md:justify-end">
                    {/* Add - Less - Counter */}
                    <div className="flex items-center">
                      {/* Less Product */}
                      <button
                        type="button"
                        onClick={async() => {
                        const newCount = item.count - 1;
                        await DeleteProductItem(item.product._id, newCount);
                        item.count -= 1; // Decrease item count by one
                        }}
                        id="decrement-button"
                        data-input-counter-decrement="counter-input"
                        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                      >
                        <svg
                          className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      {/* End Less Product */}

                      {/* Counter */}
                      <span className="px-2">{item.count}</span>
                      {/* End Counter */}

                      {/* Add Product */}
                      <button
                        type="button"
                        onClick={() => {
                          AddProductItem(item.product._id);
                          item.count += 1; // Increase item count by one
                        }}
                        id="increment-button"
                        data-input-counter-increment="counter-input"
                        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                      >
                        <svg
                          className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                      {/* End Add Product */}
                    </div>
                    {/* Add - Less - Counter */}

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
                      to={`/productdetails/${item.product._id}`}
                      className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                    >
                      {item.product.title}
                    </Link>
                    <div className="flex items-center gap-4">
                      
                      {/* Add To Fav */}
                      <button
                        type="button"
                        onClick={() => AddWishlistItem(item.product._id)}
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
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
                            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                          />
                        </svg>
                        Add to Favorites
                      </button>
                      {/* End Add To Fav */}
                      
                      {/* Remove */}
                      <button
                        type="button"
                        onClick={async() => {
                          await DeleteProduct(item.product._id);
                          await GetCartItems(); // Refetch cart items after deletion
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
          
          {/* Order Summary */}
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Order summary
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Total price
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      <NumericFormat value={cartPrice} displayType="text" thousandSeparator={true} prefix="" decimalScale={2} fixedDecimalScale={true} />
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Store Pickup
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                    99.00
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Tax
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      <NumericFormat value={cartPrice * 0.14} displayType="text" thousandSeparator={true} prefix="" decimalScale={2} fixedDecimalScale={true} />
                    </dd>
                  </dl>
                </div>
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    <NumericFormat value={(cartPrice * 1.14)+99} displayType="text" thousandSeparator={true} prefix="LE. " decimalScale={2} fixedDecimalScale={true} />
                  </dd>
                </dl>
              </div>

              {/* To Checkout */}
              <Link
                to="/payment"
                className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-main hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Proceed to Checkout
              </Link>
              {/* To Checkout */}
              
              {/* Continu Shopping */}
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {" "}
                  or{" "}
                </span>
                <Link
                  to={"/"}
                  title=""
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                >
                  Continue Shopping
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                </Link>
              </div>
              {/* Continu Shopping */}

            </div>
          
          </div>
          {/* End Order Summary */}
        </div>
      </div>
    </section>
              )
 
             );

}
