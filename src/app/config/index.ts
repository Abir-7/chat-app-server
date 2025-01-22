import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || 10,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  host_email: process.env.HOST_EMAIL,
  host_email_pass: process.env.HOST_EMAIL_PASSWORD,
  host_email_service: process.env.HOST_EMAIL_SERVICE,
  host_email_service_port: process.env.HOST_EMAIL_SERVICE_PORT,
  node_env: process.env.NODE_ENV,
};
