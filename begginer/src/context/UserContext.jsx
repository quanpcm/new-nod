import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Đường dẫn đúng!

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
  const storedEmail = localStorage.getItem("loggedInUser");
  if (storedEmail) {
    const loadUser = async () => {
      const docSnap = await getDoc(doc(db, "users", storedEmail));
      if (docSnap.exists()) {
        setUser(docSnap.data());
      }
    };
    loadUser();
  }
    }, []);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
    
  );
};


