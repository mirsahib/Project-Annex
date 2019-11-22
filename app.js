const express = require("express");
const app = express();
const path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//database setting
var db_url =
  "mongodb+srv://mirsahib24:admin123@test-ry7bt.mongodb.net/Annex?retryWrites=true&w=majority";

mongoose.set("useUnifiedTopology", true);
mongoose.connect(db_url, { useNewUrlParser: true });

mongoose.connection.on("error", function(err) {
  console.log(err);
  console.log("Could not connect to mongodb");
});

//view engine
app.set("view engine", "ejs");

//static folder
app.use(express.static(path.join(__dirname, "public")));

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./routes/index"));
app.use("/operator", require("./routes/operator"));
app.use("/admin", require("./routes/admin"));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started at port 3000");
});
