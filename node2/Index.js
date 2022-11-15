const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const fileUpload = require("express-fileupload");
var mysql = require("mysql");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// connection configurations
var dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "interview",
});

dbConn.connect();

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  dbConn.query(
    "SELECT `id`, `email`, `created_at`, `password` FROM `info` WHERE `email` = ? AND `password`=?",
    [email, password],
    function (error, results, fields) {
      if (error) throw error;

      // check has data or not
      let message = "";
      let status;
      if (results === undefined || results.length == 0) {
        message = "Login Failed";
        status = 400;
      } else {
        status = 200;
        message = "Successfully Login";
      }

      return res.send({ status: status, data: results[0], message: message });
    }
  );
});
app.get("/crud/getalll", function (req, res) {
  dbConn.query("SELECT * FROM info", function (error, results, fields) {
    if (error) throw error;

    // check has data or not
    let message = "";
    if (results === undefined || results.length == 0)
      message = "employee table is empty";
    else message = "Successfully retrived all ";

    return res.send({ data: results });
  });
});
app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  dbConn.query(
    "INSERT INTO info (email, password) VALUES (?, ?)",
    [email, password],
    function (error, results, fields) {
      if (error) throw error;

      // check has data or not
      let message = "";
      let status;
      if (results === undefined || results.length == 0) {
        message = "Signup Failed";
        status = 400;
      } else {
        status = 200;
        message = "Successfully Signup";
      }

      return res.send({ status: status, data: results[0], message: message });
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
