import React, { useContext, useEffect, useRef, useState } from "react";
import logoImg from "/icon.png";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, LogOut, Settings } from "lucide-react";
import defaultUserImg from "/user.png";
import { AuthContext } from "../Context/Authcontext";

export const Navbar = ({}) => {
  const [isVisible, setIsVisible] = useState(true);

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
      className="fixed w-full z-50  "
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className=" container flex items-center justify-between mx-auto p-4 max-w-7xl ">
        {/* Logo on the left */}
        <Link to="/">
          <div className="h-10 w-10 relative flex items-center justify-center">
            <div className="absolute w-full h-full  rounded-full transform " />
            <img
              src={logoImg}
              alt="Logo"
              className="w-full h-full relative   "
            />
          </div>
        </Link>

        {/* user icon on right  */}
        <UserDropdown />
      </div>
    </motion.nav>
  );
};

const UserDropdown = () => {
  const { isAuthenticated, setisAuthenticated } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setisAuthenticated(false);
    setIsDropdownOpen(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="cursor-pointer flex items-center space-x-2 bg-gray-700 rounded-full p-1 hover:bg-gray-600 transition-colors duration-200"
      >
        <div
          className="w-8 h-8 rounded-full bg-gray-800 border-2 border-blue-400 flex items-center justify-center overflow-hidden"
        >
          <img
            src={defaultUserImg}
            alt="User"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "";
              e.target.parentElement.innerHTML =
                '<User className="w-5 h-5 text-gray-400" />';
            }}
          />
        </div>
      </button>

      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1 border border-gray-700"
        >
          {isAuthenticated ? (
            <>
              <div
                className="px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Authenticate</span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  navigate("/");
                }}
                className="w-full cursor-pointer text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setIsDropdownOpen(false);
                navigate("/auth/login");
              }}
              className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center space-x-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
