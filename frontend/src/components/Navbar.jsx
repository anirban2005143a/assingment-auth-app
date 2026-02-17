import React, { useContext, useEffect, useRef, useState } from "react";
import logoImg from "/icon.png";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, LogOut, Settings, Menu, X } from "lucide-react";
import defaultUserImg from "/user.png";
import { AuthContext } from "../Context/Authcontext";

export const Navbar = ({}) => {
  const [isVisible, setIsVisible] = useState(true);
  const navRef = useRef(null);

  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <motion.nav
      ref={navRef}
      className="fixed w-full z-50 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-md border-b border-slate-700/50"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="container flex items-center justify-between mx-auto p-4 max-w-7xl">
        {/* Logo on the left */}
        <Link to="/" className="group">
          <motion.div
            className="h-10 w-10 relative flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <img
              src={logoImg}
              alt="Logo"
              className="w-full h-full relative filter drop-shadow-lg"
            />
          </motion.div>
        </Link>

        {/* user icon on right  */}
        <UserDropdown />
      </div>
    </motion.nav>
  );
};

const UserDropdown = () => {
  const { isAuthenticated, setisAuthenticated, userData } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    setisAuthenticated(false);
    setIsDropdownOpen(false);
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  console.log(userData)

  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="cursor-pointer flex items-center space-x-1 pr-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:to-slate-500 rounded-full p-1 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 border-2 border-indigo-400 flex items-center justify-center overflow-hidden group-hover:border-blue-300 transition-colors">
          <img
            src={defaultUserImg}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
        {userData?.fullname?.firstname && (
          <span className="text-sm text-slate-300 font-medium hidden sm:inline">
            {userData.fullname.firstname}
          </span>
        )}
      </motion.button>

      {isDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-3 w-56 bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl shadow-2xl pb-2 border border-slate-700 overflow-hidden"
        >
          {isAuthenticated ? (
            <>
              {/* User Info */}
              <div className="px-4 py-3 border-b border-slate-700 bg-slate-700/50">
                <p className="text-sm text-slate-300">{userData?.email}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {userData?.fullname?.firstname} {userData?.fullname?.lastname}
                </p>
              </div>

              {/* Logout Button */}
              <motion.button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center space-x-2 transition-colors duration-200 group"
                // whileHover={{ paddingLeft: "1.25rem" }}
              >
                <LogOut className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Logout</span>
              </motion.button>
            </>
          ) : (
            <motion.button
              onClick={() => {
                setIsDropdownOpen(false);
                navigate("/login");
              }}
              className="w-full text-left px-4 py-3 text-sm text-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300 flex items-center space-x-2 transition-colors duration-200 group"
              
            >
              <LogIn className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Login</span>
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );
};
