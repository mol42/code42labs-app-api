// initialize dotenv
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });

import { initializeDI, diContext } from "./di";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
// we need to initialize DI before routes are initialized
// since controllers are using services which registered to
// dependency injection
initializeDI();
diContext.container.mqClientService.init();
//
const authRoute = require("./routes/auth-route");
const skillsRoute = require("./routes/skills-route");
const app = express();

// CORS support
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || process.env.CORS_ORIGIN.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
//

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRoute);
app.use("/skills", skillsRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log(req.path);
  const err = new Error("Not Found");
  // err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};

  console.log("err", err);
  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.end();
});

//console.log("NODE_ENV", process.env.NODE_ENV);

export default app;
