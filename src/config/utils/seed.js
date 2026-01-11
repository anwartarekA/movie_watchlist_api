import { prisma, disconnectDB } from "./../db/connectDB.js";
const main = async () => {
  const createdBy = "78a5d95b-f1b2-4e3d-ac3f-8bce9cb38c59";
  const movies = [
    {
      user_id: createdBy,
      title: "movie1",
      rating: 4,
      releaseYear: 2020,
      runtime: 120,
      url: "movie1@watch.com",
    },
    {
      user_id: createdBy,
      title: "movie2",
      rating: 5,
      releaseYear: 2021,
      runtime: 110,
      url: "movie2@watch.com",
    },
    {
      user_id: createdBy,
      title: "movie3",
      rating: 3.5,
      releaseYear: 2018,
      runtime: 100,
      url: "movie3@watch.com",
    },
    {
      user_id: createdBy,
      title: "movie4",
      rating: 4,
      releaseYear: 2020,
      runtime: 120,
      url: "movie4@watch.com",
    },
    {
      user_id: createdBy,
      title: "movie5",
      rating: 5,
      releaseYear: 2025,
      runtime: 120,
      url: "movie5@watch.com",
    },
    {
      user_id: createdBy,
      title: "movie6",
      rating: 4,
      releaseYear: 2026,
      runtime: 120,
      url: "movie6@watch.com",
    },
    {
      user_id: createdBy,
      title: "movie7",
      rating: 4,
      releaseYear: 2020,
      runtime: 120,
      url: "movie7@watch.com",
    },
    {
      user_id: createdBy,
      title: "movie8",
      rating: 4,
      releaseYear: 2020,
      runtime: 120,
      url: "movie8@watch.com",
    },
    {
      user_id: createdBy,
      title: "movie9",
      rating: 4,
      releaseYear: 2020,
      runtime: 120,
      url: "movie9@watch.com",
    },
    {
      user_id: createdBy,
      title: "movie10",
      rating: 4,
      releaseYear: 2020,
      runtime: 120,
      url: "movie10@watch.com",
    },
  ];
  for (let movie of movies) {
    console.log("movie will be created.....");
    await prisma.movie.create({
      data: movie,
    });
    console.log("movie is created");
  }
  console.log("movies are created.");
  await disconnectDB();
  process.exit(0);
};
main();
