import React from "react";
import { Link } from "react-router";
import logo from "../assets/logo.png";
const Header = () => {
  return (
    <header className="shadow-md">
      {/*  <div className="text-center py-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          MasterBlog
        </h1>
      </div>
 */}

      <nav className="bg-gradient-to-r from-yellow-100 via-[#71565a] to-blue-200">
        <div className="w-full mx-auto  py-4">
          <ul className="flex justify-between items-center gap-10 text-lg font-medium text-black px-4">
            <li className="text-2xl md:text-3xl font-bold text-gray-800  mr-none sm:mr-auto   ">
              <Link to="/" className="hover:text-red-400 transition-colors ">
                <img src={logo} alt="logo" />
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-red-400 transition-colors text-xl"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/posts"
                className="hover:text-red-400 transition-colors text-xl"
              >
                Create Post
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
