import express from "express";
const router = express();
import {
  addToWatchList,
  getAllWatchList,
  getWatchList,
  updateWatchList,
  deleteWatchList,
  getMostWatchlist,
  getMaxRating,
} from "./../controllers/watchListController.js";
import protect from "../config/utils/protect.js";
import validateRequest from "../middlewares/validateRequest.js";
import { validateAddWatchListSchema } from "../validators/validateWatchListSchema.js";
router.get("/most-watchlist", getMostWatchlist);
router.get("/maxRating", getMaxRating);

router.use(protect);
router
  .route("/")
  .post(validateRequest(validateAddWatchListSchema), addToWatchList)
  .get(getAllWatchList);
router
  .route("/:id")
  .get(getWatchList)
  .put(updateWatchList)
  .delete(deleteWatchList);

export default router;
