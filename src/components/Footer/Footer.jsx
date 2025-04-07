import React, { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import GoogleDonloadPic from "../../assets/images/google-play-badge-logo.png";
import AppleDownloadPic from "../../assets/images/download-on-the-app-store-apple-logo.png";
import Payment1 from "./../../assets/images/Pay-Paypal-Logo.png";
import Payment2 from "./../../assets/images/Pay-Mastercard-Logo.png";
import Payment3 from "./../../assets/images/Pay-Amazon-Logo.png";
import Payment4 from "./../../assets/images/Pay-Amex-Logo.png";

export default function Footer() {
  const [count, setCount] = useState(0);

  return (
    <footer className="bg-light font-sans dark:bg-gray-900 w-full mt-10 absolute ">

      <div className="container p-3 mx-auto grid grid-cols-1 gap-2 ">

        {/*************************** part 1 ************************************/}
        <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white pt-4">Get the Freshcart App.</h1>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
          <input
            id="email"
            type="text"
            className="px-3 py-2 md:col-span-4 text-gray-700 bg-white border rounded-md  focus:border-main  focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
            placeholder="Email Address"
          />
          <button className="w-full px-3 py-2.5 text-sm font-medium  text-white transition-colors duration-300 transform  focus:outline-none bg-main rounded-lg hover:bg-green-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
            Share App Link
          </button>
        </div>
        {/*************************** part 1 ************************************/}
        <hr className=" border-gray-200 my-1 dark:border-gray-700 " />
        {/*************************** part 2 ************************************/}
        <div className="flex flex-row justify-between items-center">
          
          <div className="flex lg:flex-row lg:items-center col-span-2 lg:justify-center gap-4 flex-col items-center justify-center">
            
            <p className="font-sans lg:text-2xl` ">Payment Prtners</p>
            
            <div className="flex items-center justify-start gap-2 h-10">
              <img className="hover:cursor-pointer w-8 sm:w-14" src={Payment1} alt="Download From Google Play" />
              <img className="hover:cursor-pointer w-8 sm:w-14" src={Payment2} alt="Download From Google Play" />
              <img className="hover:cursor-pointer w-8 sm:w-14" src={Payment3} alt="Download From Google Play" />
              <img className="hover:cursor-pointer w-8 sm:w-14" src={Payment4} alt="Download From Google Play" />
            </div>
          </div>

          <div className="flex lg:flex-row lg:items-center col-span-2 lg:justify-center gap-4 flex-col items-center justify-center">
            
            <p className="font-sans lg:text-2xl` ">Get FreshCart App</p>
            
            <div className="flex items-center justify-end gap-2 ">
              <img className="hover:cursor-pointer w-16 sm:w-28" src={GoogleDonloadPic} alt="Download From Google Play" />
              <img className="hover:cursor-pointer w-16 sm:w-28" src={AppleDownloadPic} alt="Download From Google Play" />
            </div>
          
          </div>
        
        </div>
        {/*************************** part 2 ************************************/}
    
        <hr className=" border-gray-200 my-1 dark:border-gray-700 " />

        {/*************************** part 3 ************************************/}
        <div className=" ">
          
          <ul id="SocialMedia" className="flex items-center justify-center gap-3 my-3">
            <li><a href="#"><i className="fa-brands fa-instagram hover:text-main"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-facebook hover:text-main"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-tiktok hover:text-main"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-twitter hover:text-main"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-linkedin hover:text-main"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-youtube hover:text-main"></i></a></li>
          </ul>
        
          <p className="font-sans text-center md:text-lg ">© 2024 FreshCart. All rights reserved.</p>

        </div>
        {/*************************** part 3 ************************************/}
        </div>
    </footer>
  );
}
