import express from "express";
import animalsRouter from "./routes/animals.mjs";
import habitatsRouter from "./routes/habitats.mjs";
import feedingTimesRouter from "./routes/feedingTimes.mjs";
import usersRouter from "./routes/users.mjs";
import notificationsRouter from "./routes/notifications.mjs";

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.use("/api/animals", animalsRouter);
app.use("/api/habitats", habitatsRouter);
app.use("/api/feedingTimes", feedingTimesRouter);
app.use("/api/users", usersRouter);
app.use("/api/notifications", notificationsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
