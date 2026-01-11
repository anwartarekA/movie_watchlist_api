import express from "express";
const router = express();
import {
  addToWatchList,
  getAllWatchList,
  getWatchList,
} from "./../controllers/watchListController.js";
import protect from "../config/utils/protect.js";
router.use(protect);
router.route("/").post(addToWatchList).get(getAllWatchList);
router.route("/:id").get(getWatchList);

export default router;
