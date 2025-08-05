import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../configs/firebaseConfig';
import NavBar from '../components/NavBar.jsx';
import './ProductList.css'; // Thêm CSS riêng

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      const subCollectionIds = ["0001", "0002", "0003"];

      for (const subId of subCollectionIds) {
        const subCollectionRef = collection(db, 'products', 'list_product', subId);
        const subSnapshot = await getDocs(subCollectionRef);

        subSnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      }

      setProducts(data);
    };

    fetchData();
  }, []);

  return (
    <div className="product-list-container">
      <div className="product-wrapper">
        <h2 className="section-title">🐾 Sản phẩm mới nhất</h2>
        <div className="product-grid">
          {products.map((product, index) => (
            <div className="product-card" key={index}>
              <img
                src={product.image || "/assets/default-cat.png"}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">{product.price}đ</p>
              <button className="buy-btn">Mua ngay</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
