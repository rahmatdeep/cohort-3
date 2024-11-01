const { default: mongoose } = require("mongoose");
const express = require("express");
(async () => {
  await mongoose.connect(
    "mongodb+srv://admin:ROse1rlhQ78JRhBn@cluster0.fjvxy.mongodb.net/course-selling-app"
  );
})();

const app = express();


app.post("/user/signup", (req, res) => {});

app.post("/user/signin", (req, res) => {});

app.get("/user/purchases", (req, res) => {});

app.post("/course/purchase", (req, res) => {});

app.get("/courses", (req, res) => {});

app.listen(3000);
