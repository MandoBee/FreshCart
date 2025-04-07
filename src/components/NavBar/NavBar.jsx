import React, { useContext, useEffect, useState } from 'react';
import styles from './NavBar.module.css';
import Logo from '../../assets/images/freshcart-logo.svg';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { cartContext } from '../Context/CartContext';
import {wishlistContext} from '../Context/WishlistContext'
import { authContext } from '../Context/AuthContext';


export default function NavBar() {

    const {cartCount, GetCartItems}= useContext(cartContext)
    const {wishlistCount,  GetWishlistItems}= useContext(wishlistContext)

    const {token,setToken}=useContext(authContext)

    const [isOpen, setIsOpen] = useState(false);

    function toggleMenu() {
        setIsOpen(!isOpen);
    }

    function logout() {
      localStorage.removeItem('userToken')
      setToken(null)
    }
      
    useEffect(() => {
      GetCartItems(); // Fetch cart items on component mount
    }, [cartCount]); // Empty dependency array to run only on mount

    useEffect(() => {
      GetWishlistItems(); // Fetch cart items on component mount
    }, [wishlistCount]); // Empty dependency array to run only on mount

return (
 
<nav className="bg-light border-gray-200 dark:bg-gray-900  fixed top-0 w-full z-[999]">
  <div className="container py-3 max-w-screen-xl flex justify-between ">
    
    <div id='NavigationL' className="flex items-center justify-center gap-1">  
      <Link to="/home" className="flex w-40 items-center">
        <img src={Logo} width={'200px'} alt="Fresh Cart Logo" />
      </Link>
      
      <div className={`absolute md:relative top-[48px] md:top-0 left-0 w-full md:block md:w-auto ${isOpen ? '' : 'hidden'}`} id="navbar-default" aria-hidden={!isOpen}>

        <ul className="font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-light md:flex-row md:space-x-1 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-light dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          {token ? 
          <>
            <li>
            <NavLink to={''} onClick={toggleMenu} className="block m-2 py-2 px-1 text-gray-900 rounded   md:border-0   dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">Home</NavLink>
            </li>
            
            <li>
              <NavLink to={'categories'} onClick={toggleMenu} className="block m-2 py-2 px-1 text-gray-900 rounded   md:border-0   dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Categories</NavLink>
            </li>
            <li>
              <NavLink to={'brands'} onClick={toggleMenu} className="block m-2 py-2 px-1 text-gray-900 rounded   md:border-0   dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Brands</NavLink>
            </li>
            <li>
              <NavLink to={'wishlist'} onClick={toggleMenu} className="block m-2 py-2 px-1 text-gray-900 rounded   md:border-0   dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <i className="fas fa-shopping-basket">{wishlistCount > 0 && <span className="px-2 py-1">{wishlistCount}</span>}</i> 
              </NavLink>
            </li>
           
            <li>
              <NavLink to={'cart'} onClick={toggleMenu} className="block m-2 py-2 px-1 text-gray-900 rounded   md:border-0   dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <i className="fas fa-shopping-cart">{cartCount > 0 && <span className="px-2 py-1">{cartCount}</span>}</i> 
              </NavLink>
            </li>
            <li>
              <NavLink to={'allorders'} onClick={toggleMenu} className="block m-2 py-2 px-1 text-gray-900 rounded   md:border-0   dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                {/* <i className="fas fa-shopping-basket">{wishlistCount > 0 && <span className="px-2 py-1">{wishlistCount}</span>}</i>  */}
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink to={'login'} onClick={() => { logout(); setIsOpen(false); }} className='md:hidden block m-2 py-2 px-1 text-gray-900 rounded   md:border-0  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>Logout</NavLink>

            </li>
          
           
          </>: 
            <>
              <li>
              <NavLink to={'register'} className='md:hidden block m-2 py-2 px-1 text-gray-900 rounded   md:border-0  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent' onClick={() => setIsOpen(false)}>Register</NavLink>

              </li>
              <li>
                <NavLink to={'login'} onClick={toggleMenu} className='md:hidden block m-2 py-2 px-1 text-gray-900 rounded   md:border-0  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>Login</NavLink>
              </li>
            </>}
        </ul>
      </div>
    </div>

    <div id='NavigationR' className="flex items-center gap-1 ">  
      <ul id='UserMenu' className='font-medium flex items-center gap-1 md:flex-row md:space-x-1' >
        {token ? 
          <li>
            <NavLink to={'login'} onClick={logout} className='hidden m-1 md:block py-2 px-3 text-gray-900 rounded   md:border-0  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>Logout</NavLink>
          </li> : 
          <>
            <li>
              <NavLink to={'register'} className='hidden m-1 md:block py-2 px-3 text-gray-900 rounded   md:border-0  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>Register</NavLink>
            </li>
            <li>
              <NavLink to={'login'} className='hidden m-1 md:block py-2 px-3 text-gray-900 rounded   md:border-0  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>Login</NavLink>
            </li>
        </>}
      </ul>
    </div>

    <button data-collapse-toggle="navbar-default" type="button" onClick={toggleMenu} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded={isOpen ? 'true' : 'false'}>

      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>
    
  </div>
  
</nav>
)
}
