import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Layout from "./components/Layout";

// 👇 import UserProvider để dùng dữ liệu người dùng toàn cục
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Routes>
        {/* Các route có NavBar dùng Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="main" element={<ProductList />} />
          <Route path="create" element={<Create />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        {/* Các route không có NavBar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 404 */}
        <Route path="*" element={<p>404 - Không tìm thấy trang</p>} />
      </Routes>
    </UserProvider>
  );
}

export default App;
