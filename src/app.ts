import express, { Application } from "express";
import morgan from "morgan";
import cors = require("cors");
import helmet = require("helmet");

var bodyParser = require("body-parser");
const fs = require("fs") as any;
const path = require("path") as any;
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// Routes

import TaskboticRoute from "./routes/taskbotic.routes";

export class App {
  private app: Application;

  constructor(private port?: number | string) {
    console.info("Initializing TaskBotic Microservices");
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    console.info("Loading Settings");
    this.app.set("port", this.port || 3005);
  }

  middlewares() {
    this.app.use(morgan("combined", { stream: accessLogStream }));
    this.app.use(morgan("dev"));
    this.app.use(helmet());
    this.app.use(helmet.dnsPrefetchControl({ allow: true }));

    this.app.use(bodyParser.json({ limit: "20mb" }));
    this.app.use(
      bodyParser.urlencoded({
        limit: "20mb",
        extended: true,
        parameterLimit: 2000000,
      })
    );
    var corsOptions = {
      origin: "*", // Change to Azure VM IP
      methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
      preflightContinue: true,
      exposedHeaders: [
        "Bearer-Token",
        "Set-Cookie",
        "Content-Type",
        "ETag",
        "Date",
        "Connection",
      ],
    };
    this.app.use(cors(corsOptions));
  }

  routes() {
    this.app.use(TaskboticRoute);
    console.info("Loading Routes");
  }

  async listen() {
    (async () => {
      try {
        this.app.listen(this.app.get("port"), "0.0.0.0");
      } catch (error) {
        console.error(
          "There was a Error with the Server Initialization",
          error
        );
      }
    })();
    console.info(
      `Initializing TaskBotic Microservices Complete. Server is running on port:${this.app.get(
        "port"
      )}`
    );
  }
}
