import "dotenv/config";

import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoute.js";
import productsRoutes from "./routes/productsRoute.js";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json());

/* User Authentication */
app.use("/api/auth", authRoutes);
/* CRUD Operations */
app.use("/api/products", productsRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
