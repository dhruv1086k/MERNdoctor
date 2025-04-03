import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";

// app config
const app = express();
connectDB(); // config for mongodb
connectCloudinary(); // config for cloudinary

// middleswares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api̥ endpoints
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Working api endpoint");
});

// port
app.listen(process.env.PORT || 4000, () =>
  console.log("server started", process.env.PORT)
);
