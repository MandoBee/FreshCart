import React, { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { Radio } from "flowbite-react";
import { NumericFormat } from "react-number-format";
import { Link, useParams } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { cartContext } from "../Context/CartContext";
import useGetCart from "../../Hooks/useGetCart";

export default function Payment() {
  const { isLoading, isError, isFetching, error, data } = useGetCart();
  const {cartPrice} = useContext(cartContext);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showSavedAddresses, setShowSavedAddresses] = useState(true);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const token = localStorage.getItem("userToken"); // Retrieve token from local storage

  // New state for address details
  const [addressDetails, setAddressDetails] = useState({
    details: "",
    city: "",
    phone: "",
    name: "",
  });


  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

const getUserAddress = async () => {
  try {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/addresses",
      {
        headers: {
          token: token,
        },
      }
    );
    // Handle success
    console.log("User address retrieved successfully", response.data);
    // Set the address details in state if needed 
    setSavedAddresses(response?.data.data); // Update saved addresses state
  } catch (error) {
    // Handle error
    console.error("Error retrieving user address", error);
    }
  };

const deleteAddress = async (addressId) => {
  try {
    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
      {
        headers: {
          token: token,
        },
      }
    );
    // Handle success
    console.log("Address deleted successfully", response.data);
    getUserAddress(); // Refresh the saved addresses after deletion
  } catch (error) {
    // Handle error
    console.error("Error deleting address", error);
  }
};

  useEffect(() => {
    getUserAddress(); // Fetch user address when the component mounts or when needed
    console.log("Fetching user address...", savedAddresses);
  }, [savedAddresses.length]); // Add savedAddresses as a dependency to re-fetch when it changes

  // Set first saved address as selected when addresses are loaded
  useEffect(() => {
    if (savedAddresses.length > 0 && !selectedAddressId) {
      setSelectedAddressId(savedAddresses[0]._id);
    }
  }, [savedAddresses, selectedAddressId]);

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/addresses",
        addressDetails,
        {
          headers: {
            token: token,
            
          },
        }
      );
      // Handle success
      console.log("Address saved successfully", response.data);
      getUserAddress(); // Refresh the saved addresses after saving a new one
    } catch (error) {
      // Handle error
      console.error("Error saving address", error);
    }
  };

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
            <h2 className="text-xl font-semibold text-main dark:text-white sm:text-2xl">
              Checkout
            </h2>
            
            <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-8">
              
              {/* Address Details Section */}
              <div className="lg:w-1/2 lg:pr-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Address Details
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowSavedAddresses(!showSavedAddresses)}
                    className="text-primary-700 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-600 text-sm font-medium rounded-lg ring-4 focus:ring-primary-300 "
                    
                  >
                    {showSavedAddresses ? "Create New Address" : "Use Saved Address"}
                  </button>
                </div>

                {/* Address Form or Saved Addresses List */}
                {showSavedAddresses ? (
                  <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:p-8">
                    {savedAddresses.length > 0 ? (
                      <div className="space-y-4">
                        {savedAddresses.map((address) => (
                          <div key={address._id} className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <Radio
                                id={address._id}
                                name="savedAddresses"
                                checked={selectedAddressId === address._id}
                                onChange={() => setSelectedAddressId(address._id)}
                              />
                              <div>
                                <label htmlFor={address._id} className="text-gray-900 dark:text-white">
                                  City: {address.city}
                                </label>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Phone: {address.phone}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm('Are you sure you want to delete this address?')) {
                                  deleteAddress(address._id);
                                }
                              }}
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-500"
                              title="Delete address"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">
                        No saved addresses found.
                      </p>
                    )}
                  </div>
                ) : (
                  <form
                    onSubmit={handleAddressSubmit}
                    className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:p-8"
                  >
                <div className="mb-6">
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address*
                  </label>
                    <input
                    type="text"
                    id="address"
                    name="address"
                    value={addressDetails.address}
                    onChange={handleAddressChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="123 Main St"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={addressDetails.city}
                    onChange={handleAddressChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="City"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={addressDetails.phone}
                    onChange={handleAddressChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="123-456-7890"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="addressName"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address Name*
                  </label>
                    <input
                    type="text"
                    id="addressName"
                    name="addressName"
                    value={addressDetails.addressName}
                    onChange={handleAddressChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Home"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-main hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Save Address
                </button>
              </form>
                )}
              </div>
              {/* Address Form or Saved Addresses List */}

              {/* Payment Section */}
              <div className="lg:w-1/2 lg:pl-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Payment
                </h3>
                <div className="flex items-center">
                  <span className="mr-2 text-sm">Cash</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={paymentMethod === 'credit'}
                      onChange={() => setPaymentMethod(paymentMethod === 'cash' ? 'credit' : 'cash')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    <span className="ml-2 text-sm">Credit</span>
                  </label>
                </div>
              </div>
              {paymentMethod === 'credit' ? (
                <form
                  action="#"
                  className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:p-8"
                >
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="full_name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Full name*{" "}
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="Bonnie Green"
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="card-number-input"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Card number*{" "}
                    </label>
                    <input
                      type="text"
                      id="card-number-input"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                      pattern="^4[0-9]{12}(?:[0-9]{3})?$"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="card-expiration-input"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Card expiration*{" "}
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                        <svg
                          className="h-4 w-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        id="card-expiration-input"
                        type="text"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="MM/YY"
                        pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                        title="Please enter a valid expiration date in MM/YY format"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="cvv-input"
                      className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      CVV*
                      <button
                        data-tooltip-target="cvv-desc"
                        data-tooltip-trigger="hover"
                        className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
                      >
                        <svg
                          className="h-4 w-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <div
                        id="cvv-desc"
                        role="tooltip"
                        className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                      >
                        The last 3 digits on back of card
                      <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                    </label>
                    <input
                      type="number"
                      id="cvv-input"
                      aria-describedby="helper-text-explanation"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="•••"
                      required
                    />
                  </div>
                </div>
                {/* Payment Summary Section */}
                <div className="mt-6 grow sm:mt-8 lg:mt-0">
                  <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Original price
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          <NumericFormat
                            value={cartPrice}
                            displayType="text"
                            thousandSeparator={true}
                            prefix="LE. "
                            decimalScale={2}
                            fixedDecimalScale={true}
                          />
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Store Pickup
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          $99
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Tax
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          <NumericFormat
                            value={cartPrice * 0.14}
                            displayType="text"
                            thousandSeparator={true}
                            prefix=""
                            decimalScale={2}
                            fixedDecimalScale={true}
                          />
                        </dd>
                      </dl>
                    </div>

                      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total
                      </dt>
                        <dd className="text-base font-bold text-gray-900 dark:text-white">
                        <NumericFormat
                          value={cartPrice * 1.14 + 99}
                          displayType="text"
                          thousandSeparator={true}
                          prefix="LE. "
                          decimalScale={2}
                          fixedDecimalScale={true}
                        />
                      </dd>
                    </dl>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-8">
                    <img
                      className="h-8 w-auto dark:hidden"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
                      alt=""
                    />
                    <img
                      className="hidden h-8 w-auto dark:flex"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
                      alt=""
                    />
                    <img
                      className="h-8 w-auto dark:hidden"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                      alt=""
                    />
                    <img
                      className="hidden h-8 w-auto dark:flex"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                      alt=""
                    />
                    <img
                      className="h-8 w-auto dark:hidden"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                      alt=""
                    />
                    <img
                      className="hidden h-8 w-auto dark:flex"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                      alt=""
                    />
                  </div>
                </div>
                {/* Payment Summary Section */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-main hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Pay now
                </button>
              </form>
              ) : (
                <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <p className="text-gray-700 dark:text-gray-300">
                    Cash on Delivery selected. Payment will be collected when your order arrives.
                  </p>
                </div>
              )}
            </div>
            </div>

            <p className="mt-6 text-center text-gray-500 dark:text-gray-400 sm:mt-8">
              Payment processed by{" "}
              <Link
                to="#"
                title=""
                className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
              >
                Paddle
              </Link>{" "}
              for{" "}
              <Link
                to="/"
                title=""
                className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
              >
                FreshCart
              </Link>{" "}
              - Egypt
            </p>
          </div>
        </div>
      </section>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/datepicker.min.js"></script>
    </>
  );
}
