import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
    <div>
      <h1>Hồ sơ</h1>
      <p>Email: {user.email}</p>
      <p>Mật khẩu: {user.password}</p>
      <p>Số dư: {user.balance}</p>
    </div>
  );
}

export default Profile;

