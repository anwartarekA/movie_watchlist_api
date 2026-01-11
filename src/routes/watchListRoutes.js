import express from "express";
const router = express();
import { addToWatchList } from "./../controllers/watchListController.js";
import protect from "../config/utils/protect.js";
router.use(protect);
router.post("/", addToWatchList);
export default router;
