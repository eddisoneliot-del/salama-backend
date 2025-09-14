// backend/src/routes/upload.ts
import express from "express";
import multer from "multer";
import { supabase } from "../lib/supabase";
import { prisma } from "../lib/prisma";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const upload = multer();
const router = express.Router();

router.post("/", authMiddleware, upload.single("file"), async (req: AuthRequest, res) => {
  if (!req.file) return res.status(400).json({ message: "No file" });
  const buffer = req.file.buffer;
  const filename = `${Date.now()}-${req.file.originalname}`;
  const { data, error } = await supabase.storage.from("medical-records").upload(filename, buffer, {
    contentType: req.file.mimetype,
    upsert: false
  });
  if (error) return res.status(500).json({ error });
  const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/medical-records/${data.path}`;
  await prisma.medicalRecord.create({
    data: { ownerId: req.user.userId, filename: req.file.originalname, url: publicUrl, mime: req.file.mimetype }
  });
  return res.json({ url: publicUrl });
});

export default router;
