import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDTzF_ukjTm3Z464covb1BQqmf95dxEQU",
  authDomain: "pham-chanh-minh-quan-781fe.firebaseapp.com",
  projectId: "pham-chanh-minh-quan-781fe",
  storageBucket: "pham-chanh-minh-quan-781fe.firebasestorage.app",
  messagingSenderId: "139317227383",
  appId: "1:139317227383:web:7bbeb2eb1ca118a19efb72"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);