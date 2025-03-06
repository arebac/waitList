import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAvbteC6O-bDvyJ-m-WKltR6IDTaKcWFXk",
  authDomain: "cubeappwaitlist-4c401.firebaseapp.com",
  projectId: "cubeappwaitlist-4c401",
  storageBucket: "cubeappwaitlist-4c401.firebasestorage.app",
  messagingSenderId: "147585862617",
  appId: "1:147585862617:web:da8c1f893e76f63007a7c8",
  measurementId: "G-6QNB3W7ZL2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // 🔹 Connect to Firestore

// Function to Save Emails to Firestore
export const saveEmail = async (email) => {
  try {
    await addDoc(collection(db, "waitlist"), { email });
    return true; // Successfully saved
  } catch (error) {
    console.error("Error saving email:", error);
    return false; // Error occurred
  }
};

export { db };