import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  arrayRemove,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA8wT7enCuEP2qRRG_i5e-BYGVVB_5jDyg",
  authDomain: "student-certificates.firebaseapp.com",
  projectId: "student-certificates",
  storageBucket: "student-certificates.appspot.com",
  messagingSenderId: "991849254686",
  appId: "1:991849254686:web:b9fb5e6868a33d1b7d030f",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app)

export {
  db,
  collection,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  auth
};
