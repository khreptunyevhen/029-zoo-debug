import express from "express";
import {
    getAllHabitats,
    createHabitat,
    updateHabitat,
    deleteHabitat,
} from "../services/habitatsService.mjs";
import { authorize } from "../middleware/auth.mjs";

const router = express.Router();

router.get("/", authorize("read"), async (req, res) => {
    const habitats = await getAllHabitats();
    res.json(habitats);
});

router.post("/", authorize("write"), async (req, res) => {
    const habitat = req.body;
    const newHabitat = await createHabitat(habitat);
    res.status(201).json(newHabitat);
});

router.put("/:id", authorize("write"), async (req, res) => {
    const { id } = req.params;
    const habitatUpdates = req.body;
    const updatedHabitat = await updateHabitat(id, habitatUpdates);

    if (!updatedHabitat) {
        res.status(404).json({ message: "Habitat not found" });
    } else {
        res.json(updatedHabitat);
    }
});

router.delete("/:id", authorize("delete"), async (req, res) => {
    const { id } = req.params;
    const deleted = await deleteHabitat(id);

    if (!deleted) {
        res.status(404).json({ message: "Habitat not found" });
    } else {
        res.status(204).end();
    }
});

export default router;
