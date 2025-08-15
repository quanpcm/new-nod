import React from "react";
import { useUser } from "../context/UserContext";
import "./UserInfo.css";

export default function UserInfo() {
  const { user } = useUser();

  if (!user) return null; // chưa load xong thì không render

  return (
    <div className="user-info">
      <img src={user.avatar || "/default-avatar.png"} alt="Avatar" />
      <div>
        <p><strong>{user.name}</strong></p>
        <p>Email: {user.email}</p>
        <p>Số dư: {user.balance?.toLocaleString() ?? 0} VNĐ</p>
      </div>
    </div>
  );
}
