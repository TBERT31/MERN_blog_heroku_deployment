"use strict";

var _mongodb = require("mongodb");
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var DATABASE = 'blog';
var USERNAME = process.env.USERNAME;
var MDP = process.env.MDP;
var URI = process.env.STRING_URI;
var client = new _mongodb.MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
module.exports = {
  connectDB: function connectDB(callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }
      db = db.db(DATABASE);
      console.log("Successfully connected to MongoDB.");
      return callback(db);
    });
  }
};