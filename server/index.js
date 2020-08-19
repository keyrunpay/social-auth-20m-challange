require("dotenv").config();
//Setup database connection
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", () => {
  console.error("MongoDB Connection ERROR");
});

mongoose.connection.once("open", function () {
  console.log("MongoDB connected");
});

require("./modal/User");

const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log("Server Listening on: " + process.env.PORT);
});
