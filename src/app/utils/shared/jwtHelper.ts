import jwt from "jsonwebtoken";

const verifyToken = <T>(token: string, secret: string): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    console.log(token, "Token being verified");
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.error("JWT Verification Error:", err.message); // Log error for debugging
        reject("Invalid or expired token");
      } else {
        resolve(decoded as T);
      }
    });
  });
};

const generateToken = (payload: object, secret: string, expiresIn: string) => {
  return jwt.sign(payload, secret, { expiresIn });
};
export const JwtHelper = { verifyToken, generateToken };
