import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const DATABASE = 'blog';
const USERNAME = process.env.USERNAME;
const MDP = process.env.MDP;
const URI = process.env.STRING_URI;
const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  connectDB: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }
      db = db.db(DATABASE);
      console.log("Successfully connected to MongoDB.");
      return callback(db)
    });
  },
};