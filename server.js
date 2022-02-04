// BASE SETUP
// =============================================================================

// call the packages we need
var express = require("express"); // call express
var app = express(); // define our app using express
var bodyParser = require("body-parser");
var fs = require("fs");
var cors = require("cors");
const { json } = require("body-parser");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

const row = fs.readFileSync("./passangers.json");
let passangers = JSON.parse(row);

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get("/", function (req, res) {
  res.json(passangers);
});

router.post("/", function (req, res) {
  const passanger = req.body;
  console.log(passanger);
  console.log(passangers.passangers);
  let updatedPassangers = passangers.passangers.filter(
    (p) => p.id !== passanger.id
  );
  updatedPassangers = [...updatedPassangers, passanger];
  passangers = { passangers: updatedPassangers };
  res.json(passanger);
});
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens on port " + port);
