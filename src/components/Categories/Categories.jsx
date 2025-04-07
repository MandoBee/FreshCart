import React, { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { GridLoader } from "react-spinners";
import {categoryContext} from "../Context/CategoryContext";

export default function Categories() {
  const [count, setCount] = useState(0);
  const {categories, setCategories, getCategories, getSpecificCategory} = useContext(categoryContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && (
        <div className="flex flex-wrap justify-center items-center min-h-screen">
          <GridLoader color="#0aad0a" loading margin={0} size={30} />
        </div>
      )}

      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
            <h2 className="text-xl font-semibold text-main dark:text-white sm:text-2xl">
              Shop by category
            </h2>
          </div>

            <div  className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {categories.map((category) => (
              <Link key={category._id}
                to={`/products/${category._id}`}
                className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="me-2 h-16 w-16 shrink-0 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                  src={category.image}
                  alt={category.name}
                />
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {category.name}
                </span>
              </Link>
            ))}
            </div>
         
        </div>
      </section>
    </>
  );
}
