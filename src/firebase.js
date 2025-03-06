export const saveEmail = async (email) => {
  try {
    const response = await fetch('https://firebase-email-service-cac21b655613.herokuapp.com/add-entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return true; // Successfully saved
  } catch (error) {
    console.error('Error saving email:', error);
    return false; // Error occurred
  }
};