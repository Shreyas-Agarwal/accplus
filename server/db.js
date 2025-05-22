// const mongoose = require('mongoose');
// require('dotenv').config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB1_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log('MongoDB connected');

//   } catch (err) {
//     console.error('DataBase connection failed:', err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;



// Native MongoDB driver example
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    const db1 = await mongoose.createConnection(process.env.MONGODB1_URI) // db1 -> USERS

    // const db2 = await mongoose.createConnection(process.env.MONGODB2_URI) // Connecting to second database
    const db2 = await mongoose.createConnection(process.env.MONGODB1_URI) // Connecting to first database db2 -> HUBS

    

    console.log('Both MongoDB databases connected successfully');

    // return { db1, db2 };
     return { db1, db2 };

  } catch (error) {
    console.error("Error connecting to databases:", error);
    throw error;
  }
};

export default connectDB;

