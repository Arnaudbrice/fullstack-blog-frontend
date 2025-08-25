import React from "react";
import { Outlet } from "react-router";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <div>
        <Header />

        <ToastContainer
          className="mt-[9rem] text-lg"
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          limit={2}
          transition={Bounce}
        />
      </div>

      <main className="bg-[#05090a] bg-[url('https://transparenttextures.com/patterns/blizzard.png')] pb-16">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
