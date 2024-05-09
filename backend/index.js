// Use the express module and create a new sqlite3 database in memory 
const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(':memory:');;

// Middleware to parse the request body as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS for all origins
const cors = require('cors');
app.use(cors({ origin: '*' }));


// Create a new table
db.serialize(() => {
  db.run("DROP TABLE IF EXISTS Cart");
  db.run("CREATE TABLE Cart (image TEXT, shoe TEXT, price REAL, quantity INTEGER DEFAULT 1)");
});


// Get all shoes
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


// Add a shoe
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


// Delete a shoe
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


// Start the server and listen for incoming HTTP requests on port 3001
const server = app.listen(3001, function () {
  console.log("Server listening on port 3001!")
});