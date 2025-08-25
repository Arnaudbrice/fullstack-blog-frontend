import React from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="bg-[#000000] text-white border-b border-[#E8E8E8] shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          MasterBlog
        </h1>
      </div>

      <nav className="bg-[#F9FEAE]">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-center">
          <ul className="flex gap-8 text-[#000000] font-semibold">
            <li>
              <Link to="/" className="uppercase hover:opacity-70">
                Home
              </Link>
            </li>
            <li>
              <Link to="/posts" className="uppercase hover:opacity-70">
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
