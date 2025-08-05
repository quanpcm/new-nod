import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useUser } from "../context/UserContext";

const Orders = () => {
  const { user } = useUser();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchPurchasedProducts = async () => {
      const snapshot = await getDocs(collection(db, "products", "list_product", "all"));
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const filtered = items.filter(p => user.purchasedProductIds.includes(p.id));
      setProducts(filtered);
    };

    fetchPurchasedProducts();
  }, [user]);

  if (!user) return <p>Vui lòng đăng nhập</p>;

  return (
    <div className="p-4">
      <h2>Danh sách sản phẩm đã mua</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
