import jwt from "jsonwebtoken";

const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "defaultSecret", {
    expiresIn: "30d",
  });
};

export default generateToken;