const zmq = require("zeromq");
const mongoose = require("mongoose");

const sock = new zmq.Pull();
const Taxi = require("./vehicleData");


// connect to mongodb
const dbURI =
  databaseConnectionLink; // Your database connection link will be in here!
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>run())
  .catch((err) => console.log(err));



async function run() {

    await sock.connect("tcp://127.0.0.1:7000");
    console.log("Connected to server.")

    for await (const msg of sock) {
     var car = new Taxi({
         date: JSON.parse(msg).date,
         latitude: JSON.parse(msg).latitude,
         longitude: JSON.parse(msg).longitude,
         carID: JSON.parse(msg).carID,
       });
    car.save();
    }
    console.log("end!");
}
