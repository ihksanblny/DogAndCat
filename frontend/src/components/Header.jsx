import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
  const location = useLocation();

  const linkClass = (path) =>
    `hover:underline transition-all duration-200 ${
      location.pathname === path ? "font-semibold underline" : ""
    }`;

  return (
    <motion.nav
      className="bg-[#69DDFF] text-white px-6 py-4 flex justify-between items-center shadow-md font-poppins"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to="/"
        className="font-extrabold text-xl tracking-wide hover:scale-105 transition-transform"
      >
        🐶 Prediksi Hewan
      </Link>
      <div className="space-x-6 text-sm md:text-base">
        <Link to="/" className={linkClass("/")}>
          Home
        </Link>
        <Link to="/predict" className={linkClass("/predict")}>
          Prediksi
        </Link>
      </div>
    </motion.nav>
  );
}
