const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).render("index");
});

router.post("/", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var type = req.body.type;
  console.log("email " + email + " password " + password + " type: " + type);
  res.send(type).status(200);
});

module.exports = router;
