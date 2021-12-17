import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

// setup database
const db = mysql.createPool({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    port: process.env.RDS_PORT
  });

export default db