import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="flex justify-center items-center p-4 bg-black text-white mt-16 text-lg sm:text-xl  ">
        <p>
          {" "}
          &copy;{new Date().getFullYear()} Made with ❤️ by Arnaud, Thomas and
          Ahmed
        </p>
      </div>
    </footer>
  );
};

export default Footer;
