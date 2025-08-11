import React from "react";
import { useUser } from "../context/UserContext";
import "./UserInfo.css";

const UserInfo = () => {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className="user-info-box">
      <p>Email: {user.email}</p>
      <p>Số dư: {user.balance.toLocaleString()} VND</p>
    </div>
  );
};

export default UserInfo;
