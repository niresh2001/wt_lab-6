const mongoose = require("mongoose");

const schema = mongoose.Schema({
  Employee_id: String,
  Employee_name: String,
  Email_ID: String,
  Mobile_No: Number,
  Gender: String,
  Branch: String,
  Organization_name:String,
  Experiance_in_years: String,

});

const empModal = mongoose.model("employee", schema);

module.exports = empModal;
