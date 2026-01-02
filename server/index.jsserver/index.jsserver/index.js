import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- DATABASE ---------- */
mongoose
  .connect(
    "mongodb+srv://usrinivasan240_db_user:MyStrongPass123@cluster0.my3jvrd.mongodb.net/elibrary"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

/* ---------- USER SCHEMA ---------- */
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", UserSchema);

/* ---------- REGISTER API ---------- */
app.options("/api/auth/register", (req, res) => {
  res.sendStatus(200);
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "Registered", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/* ---------- SERVER ---------- */
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- DATABASE ---------- */
mongoose
  .connect(
    "mongodb+srv://usrinivasan240_db_user:MyStrongPass123@cluster0.my3jvrd.mongodb.net/elibrary"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

/* ---------- USER SCHEMA ---------- */
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", UserSchema);

/* ---------- REGISTER API ---------- */
app.options("/api/auth/register", (req, res) => {
  res.sendStatus(200);
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "Registered", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/* ---------- SERVER ---------- */
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- DATABASE ---------- */
mongoose
  .connect(
    "mongodb+srv://usrinivasan240_db_user:MyStrongPass123@cluster0.my3jvrd.mongodb.net/elibrary"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

/* ---------- USER SCHEMA ---------- */
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", UserSchema);

/* ---------- REGISTER API ---------- */
app.options("/api/auth/register", (req, res) => {
  res.sendStatus(200);
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "Registered", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/* ---------- SERVER ---------- */
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- DATABASE ---------- */
mongoose
  .connect(
    "mongodb+srv://usrinivasan240_db_user:MyStrongPass123@cluster0.my3jvrd.mongodb.net/elibrary"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

/* ---------- USER SCHEMA ---------- */
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", UserSchema);

/* ---------- REGISTER API ---------- */
app.options("/api/auth/register", (req, res) => {
  res.sendStatus(200);
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "Registered", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/* ---------- SERVER ---------- */
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
