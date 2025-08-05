import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../configs/firebaseConfig';
import './Create.css';

const Create = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    subId: '0001',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'products', 'list_product', formData.subId, formData.id);
      await setDoc(docRef, {
        name: formData.name,
        price: formData.price,
        description: formData.description,
      });
      alert('✅ Sản phẩm đã được tạo thành công!');
      setFormData({ id: '', name: '', price: '', description: '', subId: '0001' });
    } catch (error) {
      console.error("❌ Lỗi khi tạo sản phẩm:", error);
      alert("Đã xảy ra lỗi khi tạo sản phẩm.");
    }
  };

  return (
    <div className="create-container">
      <h2>🛠️ Tạo Sản Phẩm Mới</h2>
      <form onSubmit={handleSubmit} className="create-form">
        <label>Mã sản phẩm (ID):</label>
        <input name="id" value={formData.id} onChange={handleChange} required />

        <label>Tên sản phẩm:</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label>Giá:</label>
        <input name="price" value={formData.price} onChange={handleChange} required />

        <label>Mô tả:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />

        <label>Thuộc danh mục (subId):</label>
        <select name="subId" value={formData.subId} onChange={handleChange}>
          <option value="0001">0001 - Mèo con</option>
          <option value="0002">0002 - Phụ kiện</option>
          <option value="0003">0003 - Đồ ăn</option>
        </select>

        <button type="submit">Thêm sản phẩm</button>
      </form>
    </div>
  );
};

export default Create;
