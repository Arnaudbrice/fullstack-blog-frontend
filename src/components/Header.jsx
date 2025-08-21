import React from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-primary">
        <Link to="/">Home</Link>MasterBlog
      </h1>
      <nav>
        <ul className="flex justify-center gap-4 text-xl">
          <Link to="/">Home</Link>
          <Link to="/posts">Create Post</Link>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
