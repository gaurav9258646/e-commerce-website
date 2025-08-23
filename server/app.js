require("dotenv").config();
const express = require("express");
const cors = require("cors")
const { connectDB } = require("./src/config/db");
const userRoutes = require("./src/routes/users");
const adminRoutes = require("./src/routes/admin");
const authMiddleware = require("./src/middlewares/auth.middleware");
const authRoutes  = require("./src/routes/auth.routes");
const  adminOnly = require ("./src/middlewares/admin.middlewares");
const   publicRoutes = require("./src/routes/public.routes")
const app = express();
const PORT = 4000;

connectDB();

app.use(cors())

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/auth",authRoutes);

app.use("",publicRoutes)

app.use(authMiddleware);


// admin routes
app.use("/admin", adminOnly, adminRoutes);

app.use("/user",userRoutes)

// user routes
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});