const express = require("express");
const app = express();
const path = require("path");
var bodyParser = require("body-parser");

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
