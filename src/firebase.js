// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2gDUAU7qPpRt9DEmNpyXSyIQyKrhRMd0",
  authDomain: "clone-messanger-9087c.firebaseapp.com",
  databaseURL: "https://clone-messanger-9087c-default-rtdb.firebaseio.com",
  projectId: "clone-messanger-9087c",
  storageBucket: "clone-messanger-9087c.appspot.com",
  messagingSenderId: "164641490844",
  appId: "1:164641490844:web:796052834429e2d5a62a59",
  measurementId: "G-WVLS8ZTDTF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const storage = getStorage();
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export { db, storage };
