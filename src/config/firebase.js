// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAeAj7b0el7SDBREtazdfPOPMW5reCBJsE",
	authDomain: "fir-2-4226c.firebaseapp.com",
	projectId: "fir-2-4226c",
	storageBucket: "fir-2-4226c.appspot.com",
	messagingSenderId: "264578557850",
	appId: "1:264578557850:web:932f5741c6b028bf8fbc23",
	measurementId: "G-DVJQJMFJ77",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleprovider = new GoogleAuthProvider();
export const db = getFirestore();
export const storage = getStorage();
