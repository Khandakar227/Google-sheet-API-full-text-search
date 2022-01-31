import express from 'express';
import handler from "../handlers/moviesHandler.js";

const router = express.Router();

router.get("/", handler);

export default router;
