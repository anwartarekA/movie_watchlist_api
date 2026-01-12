import express from "express";
const router = express();
import {
  addToWatchList,
  getAllWatchList,
  getWatchList,
  updateWatchList,
  deleteWatchList,
  getMostWatchlist,
} from "./../controllers/watchListController.js";
import protect from "../config/utils/protect.js";
router.get("/most-watchlist", getMostWatchlist);
router.use(protect);
router.route("/").post(addToWatchList).get(getAllWatchList);
router
  .route("/:id")
  .get(getWatchList)
  .put(updateWatchList)
  .delete(deleteWatchList);

export default router;
