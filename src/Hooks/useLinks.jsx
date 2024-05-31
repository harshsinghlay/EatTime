// src/hooks/useNavlinks.jsx
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useLinks = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const [links, setLinks] = useState({ navlinks: [], footerlinks: [] });

  useEffect(() => {
    const navlinks = [
      {
        name: "Home",
        url: "/",
        status: true,
        submenu: false,
        sublinks: [],
      },
      {
        name: "Menu",
        url: "/menu",
        status: true,
        submenu: true,
        sublinks: [
          {
            Head: "Veg",
            sublink: [
              { name: "Burger", link: "/menu/burger", active: true },
              { name: "Pizza", link: "/menu/pizza", active: true },
              { name: "Bread", link: "/menu/bread", active: true },
              { name: "Chocolate", link: "/menu/chocolate", active: true },
              { name: "Dessert", link: "/menu/dessert", active: true },
              { name: "Drinks", link: "/menu/drink", active: true },
              { name: "Sandwich", link: "/menu/sandwich", active: true },
              { name: "Ice Cream", link: "/menu/ice cream", active: true },
            ],
          },
          {
            Head: "Non-Veg",
            sublink: [
              { name: "Bbq", link: "/menu/bbq", active: true },
              { name: "Sausages", link: "/menu/sausage", active: true },
              { name: "Steaks", link: "/menu/steak", active: true },
              { name: "Porks", link: "/menu/pork", active: true },
              { name: "Fried Chicken", link: "/menu/fried chicken", active: true },
            ],
          },
        ],
      },
      {
        name: "Account",
        url: "/dashboard/profile",
        status: authStatus,
        submenu: true,
        sublinks: [
          {
            Head: "",
            sublink: [
              { name: "Logout", link: "/dashboard/profile", active: authStatus },
              { name: "My Profile", link: "/dashboard/profile", active: authStatus },
              { name: "Log in", link: "/login", active: !authStatus },
              { name: "Sign up", link: "/signup", active: !authStatus },
              { name: "My Orders", link: "/dashboard/orders", active: authStatus },
              { name: "My Wishlist", link: "/dashboard/wishlist", active: authStatus },
              { name: "My Addresses", link: "/dashboard/addresses", active: authStatus },
            ],
          },
        ],
      },
      {
        name: "Blog",
        url: "/blogs",
        status: true,
        submenu: true,
        sublinks: [
          {
            Head: "",
            sublink: [
              { name: "All Blogs", link: "/blogs", active: true },
              { name: "My Blogs", link: "/myblogs", active: authStatus },
              { name: "Add Blog", link: "/addblog", active: authStatus },
            ],
          },
        ],
      },
      {
        name: "Contact",
        url: '/contact',
        status: true,
        submenu: false,
        sublinks: [],
      },
    ];
    const footerlinks = [
      {
        head: "Contact Information",
        isSublinks: true,
        sublinks: [
          {
            status: true,
            name: "4005 Silver business point India",
            url: "",
          },
          {
            status: true,
            name: "7778082681",
            url: "",
          },
          {
            status: true,
            name: "info@EatTime.com",
            url: "",
          },
        ],
      },
      {
        head: "Your Account",
        isSublinks: true,
        sublinks: [
          {

            status: !authStatus,
            name: "Login",
            url: "/login",

          },
          {
            status: !authStatus,
            name: "Sign Up",
            url: "/signup",
          },
          {

            status: authStatus,
            name: "Personal Info",
            url: "/dashboard/profile",

          },
          {

            status: authStatus,
            name: "Orders",
            url: "/dashboard/orders",

          },
          {
            status: authStatus,
            name: "Credit Slip",
            url: "",

          },
          {

            status: authStatus,
            name: "Address",
            url: "/dashboard/addresses",

          },
          {

            status: authStatus,
            name: "Wishlist",
            url: "/dashboard/wishlist",

          },
        ],
      },
      {
        head: "Our Restaurent",
        isSublinks: true,
        sublinks: [
          {

            status: true,
            name: "Contact Us",
            url: "/contact",
          },
          {

            status: true,
            name: "FAQ",
            url: "/contact",
          },
          {
            status: true,
            name: "Secure Payment",
            url: "",
          },
        ],
      },
      {
        head: "Extras",
        isSublinks: true,
        sublinks: [
          {
            status: true,
            name: "Prices Drop",
            url: "",

          },
          {

            status: true,
            name: "New Products",
            url: "/menu",

          },
          {

            status: true,
            name: "Best Sales",
            url: "/menu/pizza",

          },
          {
            status: true,
            name: "Delivery",
            url: "",

          },
          {
            status: true,
            name: "Stores",
            url: "",

          },
        ],
      },
    ];
    setLinks({ navlinks, footerlinks });
  }, [authStatus]);

  return links;
};

export default useLinks;
