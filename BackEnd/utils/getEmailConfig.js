// Example usage in another controller
const someOtherController = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: getEmailConfig(), // Use the utility function to get email credentials
    });

    // Rest of your email sending logic
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
