const express = require("express");
const router = express.Router();

const Record = require("../model/record");

router.get("/", (req, res) => {
  res.status(200).render("operator");
});
router.get("/data", async (req, res) => {
  var record = "";
  try {
    record = await Record.find({});
  } catch (error) {
    console.log(error);
  }
  res.send(record);
});
router.get("/add", (req, res) => {
  res.status(200).render("operator");
});
router.post("/add", (req, res) => {
  var year = req.body.year;
  var semester = req.body.semester;
  var school = req.body.school;
  var department = req.body.department;
  var student = req.body.student;
  console.log(
    "year " +
      year +
      " semester " +
      semester +
      " school " +
      school +
      " department " +
      department +
      " student " +
      student
  );
  res.send("pass").status(200);
});

module.exports = router;
