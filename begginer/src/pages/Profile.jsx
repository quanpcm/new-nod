import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../pages/Profile.css";


function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="profile-container">
      <img
        className="profile-avatar"
        src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
        alt="Avatar"
      />
      <h1 className="profile-title">👤 Hồ Sơ Cá Nhân</h1>
      <p className="profile-info">📧 Email: <span>{user.email}</span></p>
      <p className="profile-info">🔒 Mật khẩu: <span>{user.password}</span></p>
      <p className="profile-info">💰 Số dư: <span>{user.balance.toLocaleString()}đ</span></p>
    </div>
  );
}

export default Profile;
