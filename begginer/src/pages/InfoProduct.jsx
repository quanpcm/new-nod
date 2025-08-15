import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../configs/firebaseConfig";

const InfoProduct = () => {
  const { state } = useLocation();
  const { product } = state || {};
  const { user, updateBalance } = useUser();
  const navigate = useNavigate();

  if (!product) {
    return <p>Không tìm thấy sản phẩm!</p>;
  }

  const handleBuy = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập!");
      return;
    }

    if (user.balance < product.price) {
      alert("Số dư không đủ để mua sản phẩm này!");
      return;
    }

    const newBalance = user.balance - product.price;
    await updateBalance(newBalance);

    // Lưu lịch sử mua hàng
    const userRef = doc(db, "users", user.email);
    await updateDoc(userRef, {
      orders: arrayUnion({
        productId: product.id,
        name: product.name,
        price: product.price,
        date: new Date().toISOString(),
      }),
    });

    alert("Mua hàng thành công!");
    navigate("/orders");
  };

  return (
    <div className="product-info-container">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Giá: {Number(product.price).toLocaleString()}đ</p>
      <button onClick={handleBuy}>Xác nhận mua</button>
    </div>
  );
};

export default InfoProduct;
