import catchAsync from "./../config/utils/catchAsync.js";
import AppError from "./../config/utils/appError.js";
import { prisma } from "../config/db/connectDB.js";
export const addToWatchList = catchAsync(async (req, res, next) => {
  const { movie_id, status, rating, notes } = req.body;
  const movie = await prisma.movie.findUnique({
    where: { id: movie_id },
  });
  if (!movie) return next(new AppError("no movie found with that id", 400));
  const watchlist = await prisma.watchListItem.findUnique({
    where: {
      user_id_movie_id: {
        user_id: req.user.id,
        movie_id,
      },
    },
  });
  if (watchlist)
    return next(new AppError("movie already exist in this watchlist", 400));
  const watchlistItem = await prisma.watchListItem.create({
    data: {
      user_id: req.user.id,
      movie_id,
      status,
      rating,
      notes,
    },
  });
  res.status(201).json({
    status: "success",
    data: {
      watchlistItem,
    },
  });
});
