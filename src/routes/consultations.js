import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  res.json({ message: "Consultation créée (à implémenter)" });
});

router.get("/", (req, res) => {
  res.json({ message: "Liste des consultations (à implémenter)" });
});

router.put("/:id/notes", (req, res) => {
  res.json({ message: `Notes modifiées pour consultation ${req.params.id}` });
});

export default router;
