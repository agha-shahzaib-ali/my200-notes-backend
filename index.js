const express = require("express"); //Importing Express
require("dotenv").config();
console.log(process.env.DATABASE_USER); // Its working all fine!!!!
// CORS (Cross Origin)
const cors = require("cors");
// Create an Express Application
const app = express();
// Express Router
const router = express.Router();
app.use(express.json());
const { notesRouter } = require("./api/v1/index");
//Mongoose
require("./db");

const port = process.env.PORT || 5000; // define a port
const server = "http://localhost";

//CORS
app.use(cors());
//End points

// root
app.get("/", (req, res) => {
  //Inside
  res.send("Hello World!");
});

// /notes
// http://localhost:5000/notes route is hit, then the notesRouter is responsible for handling all the routing from here on.
app.use("/notes", notesRouter); //============> if http://localhost:5000/notes route is hit, then the { notesRouter } is responsible for handling all the routing from here on.

// users

// notes

// books

//Server Running
app.listen(port, () => {
  console.log(`Notes Backend running at port ${server}:${port}`);
});
