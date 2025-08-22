import React from "react";
import { Link } from "react-router";

  const Header = () => {
  return (
    <header className="shadow-md">
     
      <div className="text-center py-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          MasterBlog
        </h1>
      </div>

  
      <nav className="bg-gradient-to-r from-yellow-100 via-[#71565a] to-blue-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-center">
          <ul className="flex gap-10 text-lg font-medium text-white">
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
