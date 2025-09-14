import express from "express";
import { prisma } from "../lib/prisma";
const router = express.Router();

// simulate init
router.post("/init", async (req, res) => {
  const { consultationId, amount, provider } = req.body;
  const tx = await prisma.transaction.create({ data: { consultationId, amount, provider }});
  // return a fake payment_id and url
  return res.json({ id: tx.id, paymentUrl: `https://pay.fake/${tx.id}` });
});

// webhook (provider would call)
router.post("/webhook", async (req, res) => {
  const { paymentId, status } = req.body;
  await prisma.transaction.update({ where: { id: paymentId }, data: { status }});
  if (status === "paid") {
    const tx = await prisma.transaction.findUnique({ where: { id: paymentId }});
    if (tx?.consultationId) {
      await prisma.consultation.update({ where: { id: tx.consultationId }, data: { paid: true }});
    }
  }
  res.sendStatus(200);
});

export default router;
