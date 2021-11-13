const express = require("express");
const PORT = process.env.PORT || 7000;
require("dotenv").config();
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({
  extended: true })
  ); 
const mongoose = require("mongoose");

const empModal = require(__dirname + "/emp.js");
var mongoDB = process.env.MONGODB_URI;

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connection established"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Login.html");
});

app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/success.html");
});

app.get("/failure", (req, res) => {
  res.sendFile(__dirname + "/failure.html");
});
app.post("/", async (req, res) => {
  const name = req.body.fName;
  const emp_id = req.body.emp_id;
  if (
    (await empModal.findOne({ name: name })) &&
    (await empModal.findOne({ emp_id: emp_id }))
  ) {
    res.redirect("/success");
  } else {
    res.redirect("/failure");
  }
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/employee.html");
});

app.post("/register", (req, res) => {
  empModal.create(req.body);

  res.sendFile(__dirname + "/register.html");
});



app.listen(PORT, function () {
  console.log("Server started running on the port no 7000");
});
