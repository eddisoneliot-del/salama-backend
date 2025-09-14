import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import consultationsRoutes from "./routes/consultations.js";
import paymentsRoutes from "./routes/payments.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes principales
app.use("/api/consultations", consultationsRoutes);
app.use("/api/payments", paymentsRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("✅ Backend Salama-Connect fonctionne !");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`);
});
