// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require("cors");
// Cors use middleware
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

//receive a post route
app.post("/add", async function (request, response) {
  const body = await request.body;
  projectData = body;
  //console.log(projectData);
  response.send(projectData);
});

//get route "all"
app.get("/all", async function (request, response) {
  //console.log(projectData);
  response.send(projectData);
});

// Setup Server
port = 3000;
app.listen(port, myFunction());

function myFunction() {
  console.log(`Server is running on http://localhost:${port}`);
}
