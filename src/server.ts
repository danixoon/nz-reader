import * as express from "express";
import * as mongoose from "mongoose";
import * as path from "path";

import library from "./routes/api/library";
import order from "./routes/api/order";

import * as dotenv from "dotenv";
import smpt from "./smpt";

dotenv.config();

const app = express();

async function init() {
  // app.on(express.json());
  app.use(smpt);
  app.use("/api/library", library);
  app.use("/api/order", order);

  // Static file declaration
  // app.use(express.static(path.join(__dirname, "../client/build")));

  if (!process.env.MONGO_URI) throw "ENV VARIABLES INCORRECT";

  //production mode
  if (process.env.NODE_ENV === "production") {
    console.log("yeah");

    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
  }

  const db = process.env.MONGO_URI as string;

  mongoose
    .connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
    .then(() => console.log("MongoDB connected"))
    .catch(console.log);

  const port = process.env.PORT || 5000;

  app.listen(port, async () => {
    console.log(`Server listening at ${port} port`);
    // console.log("yeah");
    // await test();
  });
}

init();
