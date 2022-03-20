const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  carID: {
    type: Number,
    required: true,
  },
});

const Taxi = mongoose.model("Taxi", vehicleSchema);

module.exports = Taxi;
