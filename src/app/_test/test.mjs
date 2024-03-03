import bcrypt from "bcryptjs";

console.log(await bcrypt.hash("password123", 10));
