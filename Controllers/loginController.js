import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Signup from "../Modules/Signup.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await Signup.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Fetch the secret key from environment variables
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT secret key not found in environment variables.");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      jwtSecret,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
      token,
    });
  } catch (error) {
    console.error("Error in login:", error.message);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
