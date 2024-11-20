import mongoose from "mongoose";

const connection = () => {
    try {
      mongoose.connect("mongodb://localhost:27017/jevlin");
      mongoose.connection.on("connected", () => {
        console.log("Connected to Database");
      });
      mongoose.connection.on("disconnected", () => {
        console.log("Disconnected from Database");
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export default connection;