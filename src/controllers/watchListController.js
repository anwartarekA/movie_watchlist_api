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
// get all watchlist
export const getAllWatchList = catchAsync(async (req, res, next) => {
  const watchlistItems = await prisma.watchListItem.findMany({
    select: {
      rating: true,
      status: true,
      user: {
        select: {
          name: true,
        },
      },
      movie: {
        select: {
          title: true,
          rating: true,
        },
      },
    },
  });
  if (!watchlistItems) return next(new AppError("no watchlist found", 500));
  res.status(200).json({
    status: "success",
    data: {
      watchlistItems,
    },
  });
});
// get watchlist
export const getWatchList = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("provide id", 400));
  const watchlist = await prisma.watchListItem.findFirst({
    where: { id },
    select: {
      user: {
        select: {
          name: true,
        },
      },
      movie: {
        select: {
          title: true,
          rating: true,
        },
      },
    },
  });
  if (!watchlist)
    return next(new AppError("no watchlist found with that id", 404));
  res.status(200).json({
    status: "success",
    data: {
      watchlist,
    },
  });
});
