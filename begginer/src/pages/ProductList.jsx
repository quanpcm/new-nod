import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../configs/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      const subCollectionIds = ["0001", "0002", "0003"]; // ID sản phẩm

      for (const subId of subCollectionIds) {
        const subCollectionRef = collection(db, "products", "list_product", subId);
        const subSnapshot = await getDocs(subCollectionRef);

        subSnapshot.forEach((docSnap) => {
          data.push({
            id: docSnap.id,
            ...docSnap.data(),
          });
        });
      }

      setProducts(data);
    };

    fetchData();
  }, []);

  const handleViewProduct = (product) => {
    if (!user) {
      alert("Vui lòng đăng nhập để xem thông tin sản phẩm!");
      return;
    }
    navigate("/product-info", { state: { product } });
  };

  return (
    <div className="product-list-container">
      <div className="product-wrapper">
        <h2 className="section-title">🐾 Sản phẩm mới nhất</h2>
        <div className="product-grid">
          {products.map((product, index) => (
            <div className="product-card" key={index}>
              <img
                src={product.imageURL || "/assets/default-cat.png"}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p className="price">{Number(product.price).toLocaleString()}đ</p>
              <button className="buy-btn" onClick={() => handleViewProduct(product)}>
                Mua ngay
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
