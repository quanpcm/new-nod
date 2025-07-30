import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../configs/firebaseConfig';
import NavBar from '../components/NavBar.jsx'; // ✅ Sửa đúng đường dẫn
// import NavbarText from 'react-bootstrap/esm/NavbarText'; // nếu không dùng thì giữ comment

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      const subCollectionIds = ["0001", "0002", "0003"];

      for (const subId of subCollectionIds) {
        const subCollectionRef = collection(db, 'products', 'list_product', subId);
        const subSnapshot = await getDocs(subCollectionRef);

        console.log(`Sub-collection ${subId} has ${subSnapshot.size} documents.`);

        subSnapshot.forEach((doc) => {
          console.log("Fetched document:", doc.id, doc.data());
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

  useEffect(() => {
    console.log("Products updated:", products);
  }, [products]);

  return (
    <div>
      <NavBar /> {/* nếu bạn dùng NavBar */}
      <h2>Danh sách sản phẩm</h2>
      {products.length === 0 ? (
        <p>Không có sản phẩm nào.</p>
      ) : (
        products.map((product, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Giá: {product.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
