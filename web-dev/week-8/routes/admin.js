const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { adminModel } = require("../db");

const adminRouter = express.Router();
adminRouter.use(express.json());

adminRouter.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 10);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  try {
    await adminModel.create({
      email,
      password,
      firstName,
      lastName,
    });
    res.json({
      message: "Admin creation sucessfull",
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await adminModel.findOne({ email });

    if (!user) {
      return res.status(403).json({ message: "email or password is wrong" });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "email or password is wrong" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY_ADMIN);

    res.json({ token });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
adminRouter
  .route("/course")
  .post((req, res) => {
    res.json({ message: "this is the post verb" });                                
  })
  .put((req, res) => {
    res.json({ message: "this is the put verb" });
  })
  .get((req, res) => {
    res.json({ message: "this is the get verb" });
  });

module.exports = { adminRouter };
