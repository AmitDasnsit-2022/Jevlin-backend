import bcrypt from "bcryptjs";
import Signup from "../Modules/Signup.js";

export const signup = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    
    const existingUser = await Signup.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await Signup.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error in signup:", error.message);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
