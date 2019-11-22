const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  Year: { type: Number, required: true },
  Semester: { type: String, required: true },
  School: { type: String, required: true },
  Department: { type: String, required: true },
  Major: { type: String, required: true },
  Students: { type: Number, require: true }
});

module.exports = mongoose.model("Record", userSchema);

// note
//always use capital letter in mongooe model
// in mongodb atlas collection should be name in small letter and they should be plural
