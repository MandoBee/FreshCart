import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import { cartContext } from "../Context/CartContext";
import { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useGetProduct from "../../Hooks/useGetProduct";
import { GridLoader } from "react-spinners";
import { wishlistContext } from "../Context/WishlistContext";


export default function ProductDetails() {

  const productId = useParams().id;
  const { cartCount, setCartCount, AddProductItem, DeleteProduct,headers } = useContext(cartContext);
  const {wishlistCount, setWishlistCount, AddWishlistItem, DeleteWishlistItem, GetWishlistItems} = useContext(wishlistContext);
  const { isLoading, isError, isFetching, error, data } = useGetProduct();
  const productDetails = data?.data.data;

  if (isError) {
    return (
      <div className="flex flex-wrap justify-center items-center min-h-screen">
        <div className="text-red-500 font-semibold text-lg">
          {error.message}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center items-center min-h-screen">
        <GridLoader color="#0aad0a" loading margin={0} size={30} />
      </div>
    );
  }

  return (
    <>
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img
                className="w-full h-96 object-contain dark:hidden"
                src={productDetails?.imageCover}
                alt={productDetails?.name}
              />
            </div>
            <div className="mt-6 sm:mt-8 lg:mt-0">
            <img
                className="w-32 dark:hidden"
                src={productDetails?.brand.image}
                alt={productDetails?.name}
              />
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {productDetails?.title}
              </h1>
              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {productDetails?.description}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque aliquid voluptate explicabo, debitis perspiciatis officiis qui, magnam cumque molestiae reiciendis nisi aperiam maiores! Porro explicabo blanditiis aut. Voluptate, aut autem..
              </p>
              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
              {/* Product Price-Rating */}
              <div className="mt-4 items-center justify-between gap-4 flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  EGP {productDetails?.price}
                </p>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                    ({productDetails?.ratingsAverage} /5.0)
                  </p>
                  <Link
                    to="#"
                    className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                  >
                    {productDetails?.ratingsQuantity} Reviews
                  </Link>
                </div>
              </div>
              {/* End of Product Price-Rating */}
              

              <div className="mt-6 sm:gap-4 items-center flex justify-between ">
              <button 
                  onClick={()=>AddProductItem(productId)} 
                  className="px-3 py-1 bg-main w-36 text-white text-sm font-semibold rounded">
                  <i className="fas fa-cart-plus px-2"></i>
                  Add to cart
                </button>
                <button 
                  onClick={() => AddWishlistItem(productId)}
                  className="px-3 py-1 bg-main w-36 text-white text-sm font-semibold rounded">
                  <i className="fas fa-heart px-2 "></i>
                    Add to favorit
                </button>
                
              </div>

  
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
