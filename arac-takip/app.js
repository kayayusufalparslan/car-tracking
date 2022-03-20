const express = require("express");
const session = require("express-session");
const userLogin = require("./controllers/loginController");
const mongoose = require("mongoose");



// Express App
const app = express();

// connect to mongodb
const dbURI =
  databaseConnectionLink; // Your database connection link will be in here!
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => startServer())
  .catch((err) => console.log(err));


const startServer = () => {
  app.listen(3000);
  console.log("Database connected and App started!");
}

// Register View Engine
app.set("view engine", "ejs");

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
// Middleware & Static Files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// http://localhost:3000/
app.get("/", userLogin.loginPage); // Controller from loginController

// http://localhost:3000/auth
app.post("/auth", userLogin.userLogin); // Controller from loginController

// http://localhost:3000/home
app.get("/home", userLogin.homePage); // Controller from loginController

// http://localhost:3000/select
app.get("/select", userLogin.mapController); // Controller from loginController

// http://localhost:3000/car
app.post("/car", userLogin.carController);  // Controller from loginController

// http://localhost:3000/logout
app.get("/logout", userLogin.logoutController); // Controller from loginController
