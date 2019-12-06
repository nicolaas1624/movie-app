//jshint csversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

// app and other varibales
const app = express();
const router = express.Router();
const mainRouter = require(path.join(__dirname, "routes/router-map"));

// // view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//uses
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
// app.use("/", mainRouter);

/// HOME PAGE ///
app.use("/", function(req, res){
  res.send("Welcome to movie night!")
});
// app.use("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "public", "angular", "index.html"));
// });

// route not found; execute (404)
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// development error handler
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});

// exports.router = router;
// exports.appPath = __dirname;
// exports.appFunctions = {
//   logFile: function(scheme, msg) {
//     msg = timeStamp("YYYY-MM-DD HH:mm") + ": " + msg + "\r\n";
//     let filePath = __dirname + "/water/" + scheme + "/log-file.txt";
//     fs.appendFile(filePath, msg, "utf8", function(err){
//       if (err) {
//         console.log(err);
//       }
//     });
//   }
// };
