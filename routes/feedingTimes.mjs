import express from "express";
import {
  getAllFeedingTimes,
  createFeedingTime,
  updateFeedingTime,
  deleteFeedingTime,
} from "../services/feedingTimesServices.mjs";
import { authorize } from "../middleware/auth.mjs";

const router = express.Router();

router.get("/", authorize("read"), async (req, res) => {
  const feedingTimes = await getAllFeedingTimes();
  res.json(feedingTimes);
});

router.post("/", authorize("write"), async (req, res) => {
  const feedingTime = req.body;
  const newFeedingTime = await createFeedingTime(feedingTime);
  res.status(201).json(newFeedingTime);
});

router.put("/:id", authorize("write"), async (req, res) => {
  const { id } = req.params;
  const feedingTimeUpdates = req.body;
  const updatedFeedingTime = await updateFeedingTime(id, feedingTimeUpdates);

  if (!updatedFeedingTime) {
    res.status(404).json({ message: "Feeding time not found" });
  } else {
    res.json(updatedFeedingTime);
  }
});

router.delete("/:id", authorize("delete"), async (req, res) => {
  const { id } = req.params;
  const deleted = await deleteFeedingTime(id);

  if (!deleted) {
    res.status(404).json({ message: "Feeding time not found" });
  } else {
    res.status(204).end();
  }
});

export default router;
