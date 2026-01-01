// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1dtPfT_tIlhNruPfdVDOGx4LiTPAtgAI",
  authDomain: "assignment--11-49ba1.firebaseapp.com",
  projectId: "assignment--11-49ba1",
  storageBucket: "assignment--11-49ba1.firebasestorage.app",
  messagingSenderId: "906041169074",
  appId: "1:906041169074:web:07f127dad3e41c922ea5ab",
  measurementId: "G-MR9NTCLDE8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;