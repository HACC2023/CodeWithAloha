"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LoginButton from "./LoginButton";
import DonateButton from "./DonateButton";

const Navbar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for the user role
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-container">
          <div className="spinner"></div>
          <img src="/assets/seal.png" alt="Loading" className="spinner-image" />
        </div>
      </div>
    );
  }
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const gradient = {
    background: "linear-gradient(black 0%, rgba(0, 0, 0, 0) 100%)",
  };
  return (
    <nav className="w-full  p-5 uppercase" style={gradient}>
      <div className="flex justify-between items-center mx-12">
        <a href="/" className="text-white font-bold text-xl flex items-center">
          <img src="/assets/seal.png" className="h-12" alt="Logo" />
          &ensp;OCEAN WATCH
        </a>

        {/* Burger menu icon for small screens */}
        <div className="lg:hidden ">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none cursor-pointer"
          >
            {isMenuOpen ? (
              // Render X icon when the menu is open
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              // Render burger icon when the menu is closed
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            )}
          </button>
        </div>

        {/* Overlay to capture clicks and close the menu */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 opacity-50 z-10"
            onClick={toggleMenu}
          ></div>
        )}

        <ul
          className={`lg:flex lg:space-x-8 lg:items-center lg:justify-center font-semibold text-xl ${
            isMenuOpen
              ? "flex flex-col items-start justify-between gap-2 fixed z-50 bg-slate-900 right-0 top-0 w-1/2 h-[400px] rounded-bl-md shadow-xl p-8"
              : "hidden"
          }`}
        >
          {" "}
          <li>
            <a
              href="/"
              className="text-white hover:shadow-lg pb-2
            hover:font-bold transition-all ease-in text-sm
         "
            >
              Home
            </a>
          </li>
          <li className="relative group">
            <a
              href="https://www.hpu.edu/about-us/index.html"
              target="_blank"
              className="text-white hover:shadow-lg pb-2
            hover:font-bold transition-all ease-in text-sm
         "
            >
              About
            </a>
          </li>
          <li className="relative group">
            <a
              href="/report"
              className="text-white hover:shadow-lg pb-2
            hover:font-bold transition-all ease-in text-sm
         "
            >
              Report
            </a>
          </li>
          {/* Conditional Login Links */}
          {(userRole === "admin" || userRole === "removal") && (
            <li>
              <a
                href="/removaljobs"
                className="text-white hover:shadow-lg pb-2 hover:font-bold transition-all ease-in text-sm"
              >
                Removal
              </a>
            </li>
          )}
          {(userRole === "admin" || userRole === "removal") && (
            <li>
              <a
                href="/claimedjobs"
                className="text-white hover:shadow-lg pb-2 hover:font-bold transition-all ease-in text-sm"
              >
                Claim
              </a>
            </li>
          )}
          {(userRole === "admin" || userRole === "removal") && (
            <li>
              <a
                href="/results"
                className="text-white hover:shadow-lg pb-2 hover:font-bold transition-all ease-in text-sm"
              >
                Dashboard
              </a>
            </li>
          )}
          {isMenuOpen && (
            <div>
              <li>
                <a
                  href="https://www.hpu.edu/giving/index.html"
                  target="_blank"
                  className="text-yellow-400 hover:shadow-lg pb-2 
            hover:font-bold transition-all ease-in text-sm
         "
                >
                  Donate
                </a>
              </li>
            </div>
          )}
          <li>
            <a href="login">
              <LoginButton />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
