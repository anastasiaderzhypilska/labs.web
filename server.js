import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let zoos = [
  { id: 1, name: "City Zoo", visitors: 50000, animals: 200, public_string: "Urban Area" },
  { id: 2, name: "Safari Park", visitors: 75000, animals: 300, public_string: "Wildlife Reserve" },
  { id: 3, name: "National Zoo", visitors: 100000, animals: 500, public_string: "National Park" }
];

app.get("/zoos", (req, res) => {
  const search = req.query.search?.toLowerCase() || "";
  let filtered = zoos.filter(zoo => zoo.name.toLowerCase().includes(search));

  const sort = req.query.sort;
  const order = req.query.order;
  if (sort === "visitors") {
    filtered = filtered.sort((a, b) =>
      order === "desc" ? b.visitors - a.visitors : a.visitors - b.visitors
    );
  }

  res.json(filtered);
});

app.post("/zoos", (req, res) => {
  const newZoo = { id: Date.now(), ...req.body };
  zoos.push(newZoo);
  res.json(newZoo);
});

app.put("/zoos/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = zoos.findIndex(z => z.id === id);
  if (index !== -1) {
    zoos[index] = { ...zoos[index], ...req.body };
    res.json(zoos[index]);
  } else {
    res.status(404).json({ error: "Zoo not found" });
  }
});

app.delete("/zoos/:id", (req, res) => {
  const id = Number(req.params.id);
  zoos = zoos.filter(z => z.id !== id);
  res.json({ message: "Deleted successfully" });
});

app.get("/zoos/count", (req, res) => {
  const search = req.query.search?.toLowerCase() || "";
  const filtered = zoos.filter(zoo =>
    zoo.name.toLowerCase().includes(search)
  );
  const total = filtered.reduce((sum, zoo) => sum + zoo.animals, 0);
  res.json({ total });
});

app.listen(3000, () => console.log(" Server running on http://localhost:3000"));
