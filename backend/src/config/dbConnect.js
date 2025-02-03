import {connect} from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const dbConnect = async () => {
  try {
    const mongDbConnection = await connect(process.env.CONNECTION_STRING);
    console.log('Database connected successfully', mongDbConnection.connection.host);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

export default dbConnect;