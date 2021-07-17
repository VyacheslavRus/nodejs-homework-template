const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const contactsRouter = require("../routes/api/contacts");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// const MONGODB_URI =
//   "mongodb+srv://rus_00777:DHKaC6mb7KnrPIQT@clusterrus.lb66e.mongodb.net/db-contacts?retryWrites=true&w=majority";

dotenv.config();

const PORT = process.env.PORT || 3000;

class Server {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    this.initConfig();
    await this.initDatabase();
    this.initErrorHandling();
    this.listen();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: "*" }));
    this.server.use(logger("dev"));
  }

  initRoutes() {
    this.server.use("/api/contacts", contactsRouter);
  }

  initConfig() {
    dotenv.config({ path: path.join(__dirname, "../.env") });
  }

  async initDatabase() {
    try {
      const { MONGODB_URI } = process.env;
      await mongoose.connect(MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      });
      console.log("Database connection successful");
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  initErrorHandling() {
    this.server.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      res.status(statusCode).send(err.message);
    });
  }

  listen() {
    this.server.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  }
}
new Server().start();
