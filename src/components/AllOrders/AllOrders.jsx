import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { NumericFormat } from "react-number-format";
import { GridLoader } from "react-spinners";

export default function AllOrders() {
  const { id } = jwtDecode(localStorage.getItem("userToken"));
  const { data, error, isLoading, isError } = useQuery("orders", GetUserOrders);

  async function GetUserOrders() {
    try {
      return await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  }

  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        {isLoading && (
          <div className="flex flex-wrap justify-center items-center min-h-screen">
            <GridLoader color="#0aad0a" loading margin={0} size={30} />
          </div>
        )}
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-main dark:text-white sm:text-2xl">
                My orders
              </h2>
            </div>

            <div className="mt-6 flow-root sm:mt-8">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {/* Headers */}
                <div className="flex flex-wrap items-center gap-y-2 py-3">
                  <dl className="w-1/5 ">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                      Order ID:
                    </dt>
                  </dl>

                  <dl className="w-1/5 ">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400 text-end">
                      Date:
                    </dt>
                  </dl>

                  <dl className="w-1/5 ">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400 text-end">
                      Price:
                    </dt>
                  </dl>

                  <dl className="w-1/5 ">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400 text-end">
                      Paid:
                    </dt>
                  </dl>

                  <dl className="w-1/5 ">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400 text-end">
                      Delivered:
                    </dt>
                  </dl>
                </div>
              </div>
              {/* Headers */}
              <hr className="my-1 border-gray-400 dark:border-gray-700" />

              {/* Data */}
              {data?.data.map((order) => (
                <div
                  className="flex flex-wrap items-center gap-y-2 py-3 "
                  key={order._id}
                >
                  <dl className="w-1/5 ">
                    <dd className=" text-sm text-gray-900 dark:text-white">
                      {order._id}
                    </dd>
                  </dl>

                  <dl className="w-1/5 ">
                    <dd className=" text-sm text-gray-900 dark:text-white text-end">
                      {order.createdAt.split("T")[0]}
                    </dd>
                  </dl>

                  <dl className="w-1/5 ">
                    <dd className=" text-sm text-gray-900 dark:text-white text-end">
                      <NumericFormat
                        value={order.totalOrderPrice}
                        displayType="text"
                        thousandSeparator={true}
                        prefix=""
                        decimalScale={2}
                        fixedDecimalScale={true}
                      />
                    </dd>
                  </dl>

                  <dl className="w-1/5 ">
                    <dd className=" text-sm text-gray-900 dark:text-white text-end">
                      {order.isPaid ? (
                        <span className="text-green-500">Paid</span>
                      ) : (
                        <span className="text-red-500">Not Paid</span>
                      )}
                    </dd>
                  </dl>

                  <dl className="w-1/5 ">
                    <dd className=" text-sm text-gray-900 dark:text-white text-end">
                      {order.isDelivered ? (
                        <span className="text-green-500">Delivered</span>
                      ) : (
                        <span className="text-red-500">Pending</span>
                      )}
                    </dd>
                  </dl>
                </div>
              ))}
              {/* Data */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
