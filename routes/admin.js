const express = require("express");
const router = express.Router();

const Record = require("../model/record");

router.get("/", (req, res) => {
  res.status(200).render("admin");
});

router.get("/semester", async (req, res) => {
  var data = req.query;
  const str = Number(data.str);
  const end = Number(data.end);
  var query = [
    {
      $match: {
        Year: {
          $gte: str,
          $lte: end
        }
      }
    },
    {
      $group: {
        _id: {
          Year: "$Year",
          Semester: "$Semester"
        },
        total: {
          $sum: "$Students"
        }
      }
    },
    {
      $sort: {
        _id: -1
      }
    }
  ];

  var cursor = await Record.aggregate(query);
  console.log(cursor);

  res.status(200).send({ message: cursor });
});

router.get("/school", async (req, res) => {
  var data = req.query;
  const str = Number(data.str);
  const end = Number(data.end);
  var query = [
    {
      $match: {
        Year: {
          $gte: str,
          $lte: end
        }
      }
    },
    {
      $group: {
        _id: {
          Year: "$Year",
          School: "$School"
        },
        total: {
          $sum: "$Students"
        }
      }
    },
    {
      $sort: {
        _id: -1
      }
    }
  ];

  var cursor = await Record.aggregate(query);
  console.log(cursor);

  res.status(200).send({ message: cursor });
});

router.get("/major", async (req, res) => {
  var data = req.query;
  const str = Number(data.str);
  const end = Number(data.end);
  const school = data.school;
  console.log(str + " " + end + " " + school);

  var query = [
    {
      $match: {
        Year: {
          $gte: str,
          $lte: end
        },
        School: school
      }
    },
    {
      $group: {
        _id: {
          Year: "$Year",
          Major: "$Major"
        },
        total: {
          $sum: "$Students"
        }
      }
    },
    {
      $sort: {
        _id: -1
      }
    }
  ];

  var cursor = await Record.aggregate(query);
  console.log(cursor);

  res.status(200).send({ message: cursor });
});

module.exports = router;
