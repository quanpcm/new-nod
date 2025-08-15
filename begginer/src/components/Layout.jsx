// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import UserInfo from "./UserInfo";

function Layout() {
  return (
    <div>
      <UserInfo />
      <NavBar />
      <Outlet />
    </div>
  );
}

export default Layout;
