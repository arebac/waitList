import validator from "validator";

export const saveEmail = async (email) => {
  // ✅ Validate email before sending request
  if (!validator.isEmail(email)) {
    return { success: false, error: "invalid" }; // Return an error type
  }

  try {
    const response = await fetch("https://firebase-email-service-cac21b655613.herokuapp.com/add-entry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    // ✅ Handle duplicate email separately
    if (response.status === 409) {
      return { success: false, error: "duplicate" }; // Return duplicate email error
    }

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return { success: true }; // ✅ Successfully saved
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
    }
    return { success: false, error: "unknown" }; // Return unknown error type
  }
};