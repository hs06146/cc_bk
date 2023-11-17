import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { UserController } from "./controllers/user.controller.js";
import { TokenController } from "./controllers/token.controller.js";

const app = express();
app.use(express.json());
app.use(cors());

const userController = new UserController();
const tokenController = new TokenController();

app.post("/users", userController.postUserData);

app.get("/users", userController.getUsersData);

app.post("/tokens/phone", tokenController.postToken);

app.patch("/tokens/phone", tokenController.patchToken);

mongoose
  .connect("mongodb://database:27017/mini-project")
  .then(() => {
    console.log("데이터베이스 연결 성공!");
  })
  .catch((err) => {
    console.log(err);
  });
console.log(`Server running at port 3000`);
app.listen(3000);
