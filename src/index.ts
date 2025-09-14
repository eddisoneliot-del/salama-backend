// backend/src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import uploadRoutes from "./routes/upload";
import consultationRoutes from "./routes/consultations";
import paymentRoutes from "./routes/payments";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);
app.use("/consultations", consultationRoutes);
app.use("/payments", paymentRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on ${port}`));
