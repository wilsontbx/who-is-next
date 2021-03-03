const mongoose = require("mongoose");

const mongoOptions = {
  useNewUrlParser: true, // prevent deprecation warnings
  useUnifiedTopology: true,
  useFindAndModify: false, // findOneAndUpdate() and findOneAndRemove()
  useCreateIndex: true, // creating index with unique
};

// will create a new db if does not exist
const dbName = "whoisnext";
const dbUrl = global.__MONGO_URI__ || "mongodb://localhost:27017/" + dbName;
mongoose.connect(dbUrl, mongoOptions);
const db = mongoose.connection;

// event emitters
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to mongodb");
});
