const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "jsonwebtoken";
const { UserModel, TodoModel } = require("./db");
const { default: mongoose } = require("mongoose");

(async () => {
  await mongoose.connect(
    "mongodb+srv://admin:ROse1rlhQ78JRhBn@cluster0.fjvxy.mongodb.net/todo-class"
  );
})();

function auth(req, res, next) {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, JWT_SECRET);
  if (decodedData) {
    req.userId = decodedData.id;
    next();
  } else {
    res.status(403).json({
      msg: "Incorrect credentials",
    });
  }
}

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  const hashedPassword = await bcrypt.hash(password, 5);

  await UserModel.create({
    email,
    password: hashedPassword,
    name,
  });
  res.json({
    msg: "Sign up Success",
  });
});

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email: email,
  });

  if (!user) {
    res.status(403).json({ msg: "Invalid credentials" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET
    );
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      msg: "Incorrect credentials",
    });
  }
});

app.post("/todo", auth, (req, res) => {});

app.get("/todos", auth, (req, res) => {});

app.listen(3000);
