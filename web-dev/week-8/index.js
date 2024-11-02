const mongoose = require("mongoose");
const dontenv = require("dotenv");
dontenv.config();
const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

app.get("/health-check", (req, res) => {
  res.json({
    message: "server is online",
  });
});

(async () => {
  await mongoose.connect(process.env.DB);
  console.log("db connected");
  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
})();
