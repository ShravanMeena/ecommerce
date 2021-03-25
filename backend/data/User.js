import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin user",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("admin", 10),
    isAdmin: true,
  },
  {
    name: "User1",
    email: "user1@gmail.com",
    password: bcrypt.hashSync("user1", 10),
  },
  {
    name: "User2",
    email: "user2@gmail.com",
    password: bcrypt.hashSync("user2", 10),
  },
];

export default users;
