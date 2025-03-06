import { useState } from "react";
import styles from "../components/waitlist.module.css"; // Import the CSS file
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveEmail } from "../firebase"; // Import Firestore function

const WaitList = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  // Function to validate email
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
  
    if (!isValidEmail(email)) {
      toast.error("❌ Please enter a valid email address.");
      return;
    }
  
    setLoading(true);
  
    const success = await saveEmail(email);
    if (success) {
      setSubmitted(true);
      toast.success("🎉 Success! You're on the waitlist!");
    } else {
      toast.error("⚠️ Something went wrong. Please try again.");
    }
  
    setLoading(false);
  };


  return (
    <div className={styles.waitlistcontainer}>
      <ToastContainer position="top-center" autoClose={3000} /> {/* Toast container */}

      <div className={styles.waitlistcontent}>
      <img src="logo_no_background.5b9fd4286b9cbfd212fd.png"/> 
        <h1>Is coming to the Web</h1>
        <h2>Are You Ready?</h2>
        <p>Work out anytime, anywhere. No limits. No excuses.</p>
        <p>Join the waitlist and be the first to experience it!</p>

        {submitted ? (
          <p className={styles.successMessage}>🎉 Thanks! You’re on the waitlist.</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.waitlistform}>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className={styles.input}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Notify Me"}
            </button>
          </form>
        )}

        <p className={styles.note}>
          Get pumped! 💪 We’ll notify you when we go live! 🔥
        </p>
      </div>
    </div>
  );
};

export default WaitList;