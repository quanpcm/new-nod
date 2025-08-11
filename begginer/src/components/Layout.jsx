// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import UserInfo from "./UserInfo"; // 👈 thêm dòng này

function Layout() {
  return (
    <div>
      <NavBar />
      <UserInfo /> {/* 👈 hiển thị UserInfo ở đây */}
      <Outlet />
    </div>
  );
}

export default Layout;
