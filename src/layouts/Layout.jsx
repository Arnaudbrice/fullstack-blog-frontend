import React from "react";
import { Outlet } from "react-router";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-[#E8E8E8]">
        <Header />
        <main className="row-start-2 row-end-3 pt-4">
          <div className="max-w-6xl mx-auto px-4">
            <Outlet />
          </div>
        </main>

        <Footer />

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
    </>
  );
};

export default Layout;
