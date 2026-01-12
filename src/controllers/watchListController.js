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
      status: true,
      rating: true,
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
export const updateWatchList = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("provide id", 400));
  const updatedWatchList = await prisma.watchListItem.update({
    where: { id },
    data: {
      user_id: req.body.user_id,
      movie_id: req.body.movie_id,
      rating: req.body.rating,
      status: req.body.status,
      notes: req.body.notes,
    },
  });
  if (!updatedWatchList)
    return next(new AppError("no watchlist found with that id", 400));
  res.status(200).json({
    status: "success",
    data: {
      updatedWatchList,
    },
  });
});
// delete watchlist
export const deleteWatchList = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("provide id", 400));
  const deletedWatchList = await prisma.watchListItem.delete({
    where: {
      id,
    },
  });
  if (!deleteWatchList)
    return next(new AppError("no watchlist found with that id", 404));
  res.status(200).json({
    status: "success",
    data: {
      deletedWatchList,
    },
  });
});
// get the most 3 wathchlist
export const getMostWatchlist = catchAsync(async (req, res, next) => {
  const mostWatchlist = await prisma.watchListItem.groupBy({
    by: ["movie_id"],
    _count: {
      movie_id: 1,
    },
    orderBy: {
      _count: {
        movie_id: "desc",
      },
    },
    take: 3,
  });
  const finalResult = [];
  await Promise.all(
    mostWatchlist.map(async (item) => {
      let newItem = {};
      newItem["title"] = Object.values(
        await prisma.movie.findUnique({
          where: { id: item.movie_id },
          select: {
            title: true,
          },
        }),
      )[0];
      newItem["count"] = item._count.movie_id;
      finalResult.push(newItem);
    }),
  );
  res.status(200).json({
    status: "success",
    data: {
      mostWatchlist: finalResult,
    },
  });
});
