import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CustomDropdown = ({ label, options, value, setValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className=" relative z-50" ref={dropdownRef}>
      {/* Label */}
      <label className="block text-sm font-medium text-slate-300 mb-1.5">
        {label}
      </label>

      {/* Selected Value */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center cursor-pointer justify-between px-3 py-2 text-sm bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
      >
        <span className="capitalize">{value}</span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </motion.span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute z-[9999] mt-2 w-full bg-slate-800 border border-slate-700 rounded-md shadow-lg overflow-hidden"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setValue(option.value);
                  setIsOpen(false);
                }}
                className={`w-full z-[9999] text-left px-3 py-2 text-sm capitalize transition ${
                  value === option.value
                    ? "bg-indigo-500/20 text-indigo-400"
                    : "text-slate-300 hover:bg-slate-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDropdown;
