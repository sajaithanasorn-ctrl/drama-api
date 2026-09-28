import express from "express";

//Intializing the express app
const app = express();
app.use(express.json());

const dramas = [
  { id: 1, title: "The Sixth Sense", country: "Thai", genre: "Fantasy", year: 2012, episodes: 20, watched: true },
  { id: 2, title: "Mist of Love", country: "Thai", genre: "Romance", year: 2022, episodes: 24, watched: true },
  { id: 3, title: "Beauty and the Wild", country: "Thai", genre: "Romance", year: 2021, episodes: 19, watched: false },
  { id: 4, title: "Love Me", country: "Korean", genre: "Romance", year: 2026, episodes: 12, watched: false },
];
let nextDramaId = 5;

// GET all dramas
app.get("/dramas", (req, res) => {
  res.json(dramas);
});

app.get("/dramas_query", (req, res) => {
  const country = req.query.country;

  if (country === "Thai") {
    res.json(dramas.filter((drama) => drama.country === "Thai"));
  } else if (country === "Korean") {
    res.json(dramas.filter((drama) => drama.country === "Korean"));
  } else {
    res.status(400).json({
      error: "Invalid query parameter. Use 'country=Thai' or 'country=Korean'",
    });
  }
});

// POST create a new drama 
app.post("/dramas", (req, res) => {
  const title = req.body?.title;
  const country = req.body?.country;
  const genre = req.body?.genre;
  const year = req.body?.year;
  const episodes = req.body?.episodes;

  // Validation
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  if (country !== "Thai" && country !== "Korean") {
    return res.status(400).json({ error: "Country must be 'Thai' or 'Korean'" });
  }
  if (typeof episodes !== "number" || episodes <= 0) {
    return res.status(400).json({ error: "Episodes must be a positive number" });
  }
  if (year !== undefined && typeof year !== "number") {
    return res.status(400).json({ error: "Year must be a number" });
  }

  // Create and save
  const newDrama = {
    id: nextDramaId++,
    title: title,
    country: country,
    genre: genre || "Unknown",
    year: year,
    episodes: episodes,
    watched: false,
  };
  dramas.push(newDrama);
  res.status(201).json(newDrama);
});

// PATCH update a drama by id (with validation)
app.patch("/dramas/:id", (req, res) => {
  const dramaId = Number(req.params.id);
  const drama = dramas.find((drama) => drama.id === dramaId);

  if (!drama) {
    return res.status(404).json({ error: "Drama not found" });
  }

  const watched = req.body?.watched;
  if (watched !== undefined && typeof watched !== "boolean") {
    return res.status(400).json({ error: "Watched must be true or false" });
  }

  drama.title = req.body?.title || drama.title;
  drama.genre = req.body?.genre || drama.genre;
  drama.watched = watched ?? drama.watched;

  res.status(200).json(drama);
});

// DELETE a drama by id
app.delete("/dramas/:id", (req, res) => {
  const dramaId = Number(req.params.id);
  const index = dramas.findIndex((drama) => drama.id === dramaId);

  if (index === -1) {
    return res.status(404).json({ error: "Drama not found" });
  }

  const deletedDrama = dramas.splice(index, 1);
  res.status(200).json({ message: "Drama deleted successfully", deleted: deletedDrama[0] });
});


// Running app
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
