import express from "express";
import { getAllAnimals, createAnimal } from "../services/animalsService.mjs";
import { authorize } from "../middleware/auth.mjs";

const router = express.Router();

// GET animals
router.get("/", authorize("read"), async (req, res) => {
  const animals = await getAllAnimals();
  res.json(animals);
});

// GET animal by id
router.get("/:id", authorize("read"), async (req, res) => {
  const animal = await getAllAnimals(req.params.id);
  res.json(animal);
});

router.post("/", authorize("write"), async (req, res) => {
  const animal = req.body;
  const newAnimal = await createAnimal(animal);
  res.status(201).json(newAnimal);
});

export default router;
