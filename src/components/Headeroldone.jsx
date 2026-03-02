// Header.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 👇 Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 
      ${isScrolled ? "bg-black/50 shadow-lg" : "bg-transparent"}`}
    >
      <div className="relative max-w-6xl mx-auto flex items-center px-4 py-3">
        {/* LEFT: LOGO */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/img/Logo.png"
              alt="PG Logo"
              className="h-10 md:h-14 w-auto object-contain"
            />
          </Link>
        </div>

        {/* CENTER: NAV */}
        <nav className="hidden md:flex text-sm bg-[#00000033] absolute left-1/2 -translate-x-1/2 items-center space-x-6 text-white uppercase bg-black/30 rounded-md px-5 py-3 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#40BD02]" : "hover:text-[#40BD02]"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/abouts"
            className={({ isActive }) =>
              isActive ? "text-[#40BD02]" : "hover:text-[#40BD02]"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/business"
            className={({ isActive }) =>
              isActive ? "text-[#40BD02]" : "hover:text-[#40BD02]"
            }
          >
            Businesses
          </NavLink>

          <NavLink
            to="/news-updates"
            className={({ isActive }) =>
              isActive ? "text-[#40BD02]" : "hover:text-[#40BD02]"
            }
          >
            News & Updates
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-[#40BD02]" : "hover:text-[#40BD02]"
            }
          >
            Contact Us
          </NavLink>
        </nav>

        {/* RIGHT: BUTTON */}
        <div className="ml-auto hidden md:block">
          <Link
            to="/admin/login"
            className="px-5 py-2  text-white font-semibold 
      bg-gradient-to-r from-[#40BD02] to-[#37B8E1] 
      hover:scale-105 transition"
          >
            Businesses
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden ml-auto text-white"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed h-[90%] inset-0 bg-white z-50">
          {/* TOP BAR */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            {/* LOGO */}
            <img
              src="/img/Logo.png"
              alt="PG Logo"
              className="h-10 md:h-14 w-auto object-contain"
            />

            {/* CLOSE ICON */}
            <button onClick={() => setMenuOpen(false)}>
              <X size={28} className="text-black" />
            </button>
          </div>

          {/* MENU */}
          <nav className="flex flex-col divide-y divide-gray-200 px-6">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `py-4 uppercase font-semibold ${
                  isActive ? "text-[#40BD02]" : "text-gray-800"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/abouts"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `py-4 uppercase font-medium ${
                  isActive ? "text-[#40BD02]" : "text-gray-800"
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/business"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `py-4 uppercase font-medium ${
                  isActive ? "text-[#40BD02]" : "text-gray-800"
                }`
              }
            >
              Businesses
            </NavLink>

            <NavLink
              to="/news-updates"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `py-4 uppercase font-medium ${
                  isActive ? "text-[#40BD02]" : "text-gray-800"
                }`
              }
            >
              News & Updates
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `py-4 uppercase font-medium ${
                  isActive ? "text-[#40BD02]" : "text-gray-800"
                }`
              }
            >
              Contact Us
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
