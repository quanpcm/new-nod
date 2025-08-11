import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../configs/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import "./LoginAndRegister.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedUser = userCredential.user;
      localStorage.setItem("userPassword", password);

      const userRef = doc(db, "users", loggedUser.uid);
      let userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, { balance: 200000, purchased: [] });
        userSnap = await getDoc(userRef);
      }

      const data = userSnap.data();
      setUser({
        email: loggedUser.email,
        uid: loggedUser.uid,
        password,
        balance: data.balance,
        purchased: data.purchased,
      });

      alert("Login successful!");
      navigate("/main");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;