import { cartContext} from '../Context/CartContext'
import { useContext } from 'react'
import { Link,useParams } from 'react-router-dom'
import { GridLoader } from 'react-spinners'
import useGetAllProducts from '../../Hooks/useGetAllProducts'
import {categoryContext} from "../Context/CategoryContext";
import { wishlistContext } from '../Context/WishlistContext'


export default function ProductsByBrand() {
  const brandId = useParams().id;
  const { isLoading, isError, isFetching, error, data } = useGetAllProducts();
  const allProducts = data?.data.data;
  const {wishlistCount, setWishlistCount, AddWishlistItem, DeleteWishlistItem, GetWishlistItems} = useContext(wishlistContext);

  const { cartCount, cartPrice, setCartCount, AddProductItem, DeleteProduct, GetCartItems, DeleteProductItem } = useContext(cartContext);
  const {categories, setCategories, getCategories, getSpecificCategory} = useContext(categoryContext);
  
  // Filter products by Brand ID
  const filteredProducts = allProducts?.filter(product => product.brand._id === brandId);
  
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
      <section className="bg-gray-50 py-3 antialiased dark:bg-gray-900 md:py-3">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
            <h2 className="text-xl font-semibold text-main dark:text-white sm:text-2xl">
              {filteredProducts[0]?.brand.name}
            </h2>
          </div>
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 grid gap-3 sm:grid-cols-2 md:mb-8 lg:grid-cols-4 xl:grid-cols-6 ">
            {/* Loop through filtered products */}
            {filteredProducts.map(function (product, idx) {
              return (
                <div
                  key={idx}
                  className="bg-white shadow-sm rounded-lg border-2  "
                >
                  <Link to={`/productdetails/${product.id}`}>
                    <img
                      src={product.imageCover}
                      alt={product.name}
                      className="w-full h-48 object-contain object-center"
                    />
                  </Link>

                  {/* ProductData */}
                  <div className="p-4 min-h-28">
                    <h3 className="text-gray-800 font-semibold text-md">
                      {product.brand.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {product.title.split(" ").slice(0, 5).join(" ")}...
                    </p>
                  </div>
                  {/* End ProductData */}

                  {/* Ratings */}
                  <div className="flex items-center justify-between px-2.5 ">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <div className="text-gray-600 text-xs font-semibold">
                        {product.ratingsAverage}
                      </div>
                    </div>
                    <span className=" text-gray-600 text-xs font-semibold  py-1.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                      ({product.ratingsQuantity} reviews)
                    </span>
                  </div>
                  {/* End Ratings */}

                  {/* Price */}
                  <div className="flex justify-between items-center m-2  ">
                    <button
                      onClick={() => AddProductItem(product.id)}
                      className="px-3 py-1 bg-main text-white text-sm font-semibold rounded">
                      <i className="fas fa-cart-plus px-2"></i>
                    </button>
                    <span className="text-gray-800 text-md font-semibold">
                      LE.{product.price}
                    </span>
                    <button                       
                      onClick={() => AddWishlistItem(product.id)}
                      className="px-3 py-1 bg-main text-white text-sm font-semibold rounded">
                      <i className="fas fa-heart px-2 "></i>
                    </button>
                  </div>
                  {/* End Price */}
                </div>
              );
            })}
            {/* End Loop */}
          </div>
        </div>
      </div>
      </section>
    </>
  )
}
