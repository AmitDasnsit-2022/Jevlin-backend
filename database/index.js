import mysql2 from "mysql2";

const connection = 
 () => {
    try {
      const db =   mysql2.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      })
      console.log("Database connected successfully");
      return db
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export default connection;