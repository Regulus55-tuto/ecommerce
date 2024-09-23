import React from "react";
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { FaShopify } from "react-icons/fa";

const Navbar01 = () => {
  return (
    <header className={"flex justify-between border-b border-gray-300 p-2"}>
      <Link to={"/"} className={"flex items-center text-2xl text-brand"}>
        <FaShopify />
        <h1>Galaxy shop</h1>
      </Link>
      <nav className={"flex items-center gap-4 font-semibold"}>
        <Link to={"/products"}>Products</Link>
        <Link to={"/carts"}>Carts</Link>
        <Link to={"/products/new"}>
          <BsPencil />
        </Link>
        <Link to={"/login"}>
          <button>Login</button>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar01;
