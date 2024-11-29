import React from "react";
import {Outlet} from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ToastLoading from "./components/ui/ToastLoading";

const App = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <ToastLoading/>
            <Footer/>
        </>
    );
};

export default App;
