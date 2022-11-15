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
app.use(express.static(__dirname + "/public"));

const port = 4000;

app.post("/", (req, res) => {
  res.send("Hello World!");
});

// connection configurations
var dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "twoday",
});

dbConn.connect();

app.get("/readdata", function (req, res) {
  dbConn.query("SELECT * FROM employee", function (error, results, fields) {
    if (error) throw error;

    // check has data or not
    let message = "";
    if (results === undefined || results.length == 0)
      message = "employee table is empty";
    else message = "Successfully retrived all ";

    return res.send({ data: results });
  });
});

app.get("/getcategory", function (req, res) {
  dbConn.query("SELECT * FROM category", function (error, results, fields) {
    if (error) throw error;

    // check has data or not
    let message = "";
    if (results === undefined || results.length == 0)
      message = "employee table is empty";
    else message = "Successfully retrived all ";

    return res.send({ data: results });
  });
});
app.get("/getsubcategory", function (req, res) {
  dbConn.query("SELECT * FROM subcategoey", function (error, results, fields) {
    if (error) throw error;

    // check has data or not
    let message = "";
    if (results === undefined || results.length == 0)
      message = "employee table is empty";
    else message = "Successfully retrived all ";

    return res.send({ data: results });
  });
});
app.get("/getproducts", function (req, res) {
  dbConn.query("SELECT * FROM products", function (error, results, fields) {
    if (error) throw error;

    // check has data or not
    let message = "";
    if (results === undefined || results.length == 0)
      message = "employee table is empty";
    else message = "Successfully retrived all ";

    return res.send({ data: results });
  });
});
app.get("/log/getall", function (req, res) {
  dbConn.query(
    "SELECT category.name as cat_name, subcategoey.name as subcat_name,products.id as p_id, products.name as p_name , products.price , products.available_qty FROM ((category INNER JOIN subcategoey ON category.id= subcategoey.cid) INNER JOIN products ON subcategoey.id = products.scid)",
    function (error, results, fields) {
      if (error) throw error;

      // check has data or not
      let message = "";
      if (results === undefined || results.length == 0)
        message = "employee table is empty";
      else message = "Successfully retrived all ";

      return res.send({ data: results });
    }
  );
});
app.put("/updateall/:id", function (req, res) {
  let id = req.params.id;
  let pname = req.body.pname;
  let catname = req.body.catname;
  let scatname = req.body.scatname;
  let price = req.body.price;
  let available_qty = req.body.available_qty;
  if (pname) {
    dbConn.query(
      "UPDATE products,category,subcategoey  set category.name=?,subcategoey.name=?, products.name=?, products.price=?, products.available_qty=? WHERE category.id= subcategoey.cid AND subcategoey.id = products.scid AND products.id=?",
      [catname, scatname, pname, price, available_qty, id],
      function (err, results) {
        if (err) {
          throw err;
        }
        let message = "";
        if (results.changedRows == 0) {
          message = "please input";
        } else {
          message = "successfully updatedata";
        }
        return res.send({ data: results, message: message });
      }
    );
  } else {
    message = " please input data";
    return res.send({ message: message });
  }
});

app.get("/readData/:id", function (req, res) {
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide enter id" });
  }
  dbConn.query(
    `SELECT * FROM employee WHERE id=?`,
    id,
    function (error, results, fields) {
      if (error) throw error;

      // check has data or not
      let message = "";
      if (results === undefined || results.length == 0)
        message = " table is empty";
      else message = "Successfully retrived all ";

      return res.send({});
    }
  );
});
app.get("/singleproduct/:id", function (req, res) {
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide enter id" });
  }
  dbConn.query(
    `SELECT * FROM products WHERE id=?`,
    id,
    function (error, results, fields) {
      if (error) throw error;

      // check has data or not
      let message = "";
      if (results === undefined || results.length == 0)
        message = " table is empty";
      else message = "Successfully retrived all ";

      return res.send({});
    }
  );
});

app.post("/addEmployee", function (req, res) {
  let name = req.body.name;
  let nid = req.body.nid;

  // validation

  // insert to db
  if (name && nid) {
    dbConn.query(
      "INSERT INTO employee (name, nid) VALUES (?, ?)",
      [name, nid],
      function (error, results, fields) {
        return res.send({
          error: false,
          data: results,
          message: " successfully added",
        });
        console.log(results);
      }
    );
  } else {
    message = " please input data";
    return res.send({ message: message });
  }
});

app.post("/addProduct", function (req, res) {
  let name = req.body.name;
  let price = req.body.price;
  let available_qty = req.body.available_qty;
  let scid = req.body.scid;

  // validation

  // insert to db
  if (name && price) {
    dbConn.query(
      "INSERT INTO products (name, price, available_qty, scid) VALUES (?, ?, ?, ?)",
      [name, price, available_qty, scid],
      function (error, results, fields) {
        return res.send({
          error: false,
          data: results,
          message: " successfully added",
        });
        console.log(results);
      }
    );
  } else {
    message = " please input data";
    return res.send({ message: message });
  }
});

app.post("/addcategory", function (req, res) {
  let name = req.body.name;

  // validation

  // insert to db
  if (name) {
    dbConn.query(
      "INSERT INTO category (name) VALUES ( ? )",
      [name],
      function (error, results, fields) {
        return res.send({
          error: false,
          data: results,
          message: " successfully added",
        });
        console.log(results);
      }
    );
  } else {
    message = " please input data";
    return res.send({ message: message });
  }
});

app.post("/addsubcat", function (req, res) {
  let name = req.body.name;
  let cid = req.body.cid;

  // validation

  // insert to db
  if (name && cid) {
    dbConn.query(
      "INSERT INTO subcategoey (name, cid) VALUES (?, ?)",
      [name, cid],
      function (error, results, fields) {
        return res.send({
          error: false,
          data: results,
          message: " successfully added",
        });
        console.log(results);
      }
    );
  } else {
    message = " please input data";
    return res.send({ message: message });
  }
});

app.delete("/datadelete/:id", function (req, res) {
  let id = req.params.id;

  dbConn.query("DELETE FROM employee where id=?", id, function (err, results) {
    if (err) {
      throw err;
    }
    let message = "";
    if (results.affectedRows == 0) {
      message = " deleted";
    } else {
      message = " successfully delete";
    }
    return res.send({ data: results[0], message: message });
  });
});
app.delete("/delete/:id", function (req, res) {
  let id = req.params.id;

  dbConn.query("DELETE FROM products where id=?", id, function (err, results) {
    if (err) {
      throw err;
    }
    let message = "";
    if (results.affectedRows == 0) {
      message = " deleted";
    } else {
      message = " successfully delete";
    }
    return res.send({ data: results[0], message: message });
  });
});
app.delete("/scatdelete/:id", function (req, res) {
  let id = req.params.id;

  dbConn.query(
    "DELETE FROM subcategoey where id=?",
    id,
    function (err, results) {
      if (err) {
        throw err;
      }
      let message = "";
      if (results.affectedRows == 0) {
        message = " deleted";
      } else {
        message = " successfully delete";
      }
      return res.send({ data: results[0], message: message });
    }
  );
});
app.delete("/catdelete/:id", function (req, res) {
  let id = req.params.id;

  dbConn.query("DELETE FROM category where id=?", id, function (err, results) {
    if (err) {
      throw err;
    }
    let message = "";
    if (results.affectedRows == 0) {
      message = " deleted";
    } else {
      message = " successfully delete";
    }
    return res.send({ data: results[0], message: message });
  });
});

app.put("/updatedata/:id", function (req, res) {
  let id = req.params.id;
  let name = req.body.name;
  let nid = req.body.nid;
  if (name && nid && id) {
    dbConn.query(
      "UPDATE employee set name=?,nid=? WHERE id=?",
      [name, nid, id],
      function (err, results) {
        if (err) {
          throw err;
        }
        let message = "";
        if (results.changedRows == 0) {
          message = "please input";
        } else {
          message = "successfully updatedata";
        }
        return res.send({ data: results, message: message });
      }
    );
  } else {
    message = " please input data";
    return res.send({ message: message });
  }
});
app.put("/updateproduct/:id", function (req, res) {
  let id = req.params.id;
  let name = req.body.name;
  let price = req.body.price;
  let available_qty = req.body.available_qty;
  if (name && price && id) {
    dbConn.query(
      "UPDATE products set name=?, price=?, available_qty=? WHERE id=?",
      [name, price, available_qty, id],
      function (err, results) {
        if (err) {
          throw err;
        }
        let message = "";
        if (results.changedRows == 0) {
          message = "please input";
        } else {
          message = "successfully updatedata";
        }
        return res.send({ data: results, message: message });
      }
    );
  } else {
    message = " please input data";
    return res.send({ message: message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
