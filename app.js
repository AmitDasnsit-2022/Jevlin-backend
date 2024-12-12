import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import logger from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { sequelize } from "./database/index.js"; // Sequelize connection
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", userRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// Synchronize database and start server
const PORT = process.env.PORT || 3000 ;

sequelize
  .sync({ alter: true }) 
  .then(() => {
    console.log("Database synchronized successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing the database:", error.message);
    process.exit(1);
  });

export default app;
