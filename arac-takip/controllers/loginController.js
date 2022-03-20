// DB Connection from userLogin Model
const connection = require("../models/userLogin");
const Taxi = require("../models/vehicleData");


var loginAttempts = 0;
// Post Auth Controller
const userLogin = (request, response) => {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    connection.query(
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          request.session.loggedin = true;
          request.session.username = username;

          connection.query(
            "UPDATE accounts SET time = ? where username = ?",
            [new Date(), username],
            function (error, results, fields) {
              // If there is an issue with the query, output the error
              if (error) throw error;
            }
          );
          // Redirect to home page
          response.redirect("/home");
        } else {
          connection.query(
            "UPDATE accounts SET loginAttempts = ? where username = ?",
            [loginAttempts, username],
            function (error, results, fields) {
              // If there is an issue with the query, output the error
              if (error) throw error;
              loginAttempts++;
            }
          );
          if (loginAttempts < 2) {
            response.redirect("/");
          } else {
            response.send("You failed 3 times, please contact with admin!");
          }

          console.log(loginAttempts);
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
};

// Login Page Controller
const loginPage = (request, response) => {
  response.render("./user/userLogin", { title: "User Login" });
};

// Home Page Controller
const homePage = (request, response) => {
  // If the user is loggedin
  if (request.session.loggedin) {
    response.render("./map", { title: "Map" });
  } else {
    // Not logged in
    console.log("Please login to view this page!");
  }
};

const carController = (request, response) => {
  let startDate = request.body.startDate;
  let endDate = request.body.endDate;
  let selectedCarID = request.body.carID;

  Taxi.find(
    {
      carID: selectedCarID,
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        response.render("./index", { title: "Home Page", request, result });
      }
    }
  );
};

const mapController = (request, response) => {
  response.render("map", { title: "Map" });
};

const logoutController = (request, response) => {
  connection.query(
    "UPDATE accounts SET logout_time = ? where username = ?",
    [new Date(), request.session.username],
    function (error, results, fields) {
      // If there is an issue with the query, output the error
      if (error) throw error;
    }
  );
  request.session.loggedin = true;
  response.render("./user/userLogin", { title: "User Login" });
};


module.exports = {
  userLogin,
  loginPage,
  homePage,
  carController,
  mapController,
  logoutController
};
