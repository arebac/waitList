import validator from "validator";

export const saveEmail = async (email) => {
  // ✅ Validate email before sending request
  if (!validator.isEmail(email)) {
    console.error("Invalid email format");
    return false;
  }

  try {
    const response = await fetch("https://firebase-email-service-cac21b655613.herokuapp.com/add-entry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    // ✅ Handle duplicate email separately
    if (response.status === 409) {
      console.warn("⚠️ Duplicate email detected. User is already on the waitlist.");
      return false;
    }

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return true; // ✅ Successfully saved
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error saving email:", error);
    }
    return false;
  }
};