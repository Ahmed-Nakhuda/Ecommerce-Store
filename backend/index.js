/*
npm run dev
*/

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(':memory:');;

// create an express instance to define our server
const app = express();

// middleware to parse JSON data
app.use(express.json());


// allows you to use form data in insomnia
app.use(express.urlencoded({ extended: false }));

const cors = require('cors');
app.use(cors({ origin: '*' }));

// startup a collection of data to manage
db.serialize(function () {


  db.run("DROP TABLE IF EXISTS Cart");
  db.run("CREATE TABLE Cart (image TEXT, shoe TEXT, price REAL, quantity INTEGER DEFAULT 1)");
});


// get all products
app.get("/api", (req, res) => {
  db.all("SELECT rowid as id, image, shoe, price, quantity FROM Cart", (err, results) => {
    if (err) {
      console.log(err);
      res.json({ "error": "Could not get cart" });
    } else {
      console.log(JSON.stringify(results));
      res.json(results);
    }
  });
});


// add a product
app.post("/api", (req, res) => {
  const { image, shoe, price, quantity } = req.body;
  
  // Check if the shoe already exists in the cart
  db.get("SELECT rowid, * FROM Cart WHERE shoe = ?", [shoe], (err, row) => {
    if (err) {
      console.log(err);
      res.json({ "error": "Could not add to cart" });
      return;
    }

    if (row) {
      // If the shoe exists, update its quantity
      const updatedQuantity = row.quantity + quantity;
      db.run("UPDATE Cart SET quantity = ? WHERE rowid = ?", [updatedQuantity, row.rowid], (err) => {
        if (err) {
          console.log(err);
          res.json({ "error": "Could not update cart" });
        } else {
          res.json({ "message": "Quantity updated in cart" });
        }
      });
    } else {
      // If the shoe doesn't exist, insert a new record
      db.run("INSERT INTO Cart (image, shoe, price, quantity) VALUES (?, ?, ?, ?)", [image, shoe, price, quantity], (err) => {
        if (err) {
          console.log(err);
          res.json({ "error": "Could not add to cart" });
        } else {
          res.json({ "message": "Added to cart" });
        }
      });
    }
  });
});


// delete a product
app.delete("/api/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM Cart WHERE rowid = ?", id, (err) => {
    if (err) {
      console.log(err);
      res.json({ "error": "Could not delete from cart" });
    } else {
      res.json({ "message": "Deleted from cart" });
    }
  });
});


// run the server
const server = app.listen(3001, function () {
  console.log("Server listening on port 3001!")
});