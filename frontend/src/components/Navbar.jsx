import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex justify-between items-center text-sm py-4 border-b border-b-gray-400 relative">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="w-44 cursor-pointer"
      />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-8 font-medium">
        {[
          { name: "HOME", path: "/" },
          { name: "ALLDOCTORS", path: "/doctors" },
          { name: "ABOUT", path: "/about" },
          { name: "CONTACT", path: "/contact" },
        ].map((item, index) => (
          <NavLink key={index} to={item.path}>
            <li className="py-1 hover:text-primary transition">{item.name}</li>
          </NavLink>
        ))}
      </ul>

      {/* User Profile & Mobile Menu Button */}
      <div className="flex items-center gap-4">
        {/* Profile Menu */}
        {token ? (
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-2">
              <img
                src={assets.profile_pic}
                alt="Profile"
                className="w-8 rounded-full"
              />
              <img
                src={assets.dropdown_icon}
                alt="Dropdown"
                className="w-2.5"
              />
            </div>
            {/* Dropdown */}
            <div className="absolute top-8 hidden right-0 bg-white shadow-lg rounded-md p-4 group-hover:block w-48 z-20">
              <p
                onClick={() => navigate("/profile")}
                className="hover:text-black cursor-pointer"
              >
                My Profile
              </p>
              <p
                onClick={() => navigate("/my-appointments")}
                className="hover:text-black cursor-pointer"
              >
                My Appointments
              </p>
              <p
                onClick={() => setToken(false)}
                className="hover:text-red-500 cursor-pointer"
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-6 py-2 rounded-full hidden md:block"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <RiMenu3Fill
            className="text-2xl cursor-pointer"
            onClick={() => setShowMenu(true)}
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-white w-64 shadow-lg z-50 p-6 transform ${
          showMenu ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Menu</h2>
          <RiCloseFill
            className="text-2xl cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
        </div>
        <ul className="mt-6 flex flex-col gap-6 text-base">
          {[
            { name: "HOME", path: "/" },
            { name: "ALLDOCTORS", path: "/doctors" },
            { name: "ABOUT", path: "/about" },
            { name: "CONTACT", path: "/contact" },
          ].map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setShowMenu(false)}
            >
              <li className="py-1 hover:text-primary transition">
                {item.name}
              </li>
            </NavLink>
          ))}
        </ul>
        <div className="mt-8">
          {token ? (
            <button
              onClick={() => setToken(false)}
              className="w-full bg-red-500 text-white py-2 rounded-md"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-primary text-white py-2 rounded-md"
            >
              Create Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
