import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Navbar01 from "components/layout/Navbar01";

const App = () => {
  return (
    <>
      <Navbar/>
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
