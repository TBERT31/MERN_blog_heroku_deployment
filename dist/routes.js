"use strict";

var _MongoClient = require("./MongoClient");
// database connection details
var COLLECTION_POSTS = "posts";
var COLLECTION_REVIEWS = "reviews";
module.exports = {
  getPosts: function getPosts(_, res) {
    (0, _MongoClient.connectDB)(function (db) {
      db.collection(COLLECTION_POSTS).find().toArray(function (err, results) {
        if (err) {
          res.status(400).send("Error fetching documents from ".concat(COLLECTION_POSTS));
        }
        res.status(200).send(results);
      });
    });
  },
  getSinglePost: function getSinglePost(req, res) {
    var id = req.params.id;
    (0, _MongoClient.connectDB)(function (db) {
      db.collection(COLLECTION_POSTS).findOne({
        _id: id
      }, function (err, result) {
        if (err) {
          res.status(400).send("Error fetching document from ".concat(COLLECTION_POSTS));
        }
        res.status(200).send(result);
      });
    });
  },
  getReviews: function getReviews(_, res) {
    (0, _MongoClient.connectDB)(function (db) {
      db.collection(COLLECTION_REVIEWS).find().toArray(function (err, results) {
        if (err) {
          res.status(400).send("Error fetching documents from ".concat(COLLECTION_POSTS));
        }
        res.status(200).send(results);
      });
    });
  },
  insertPost: function insertPost(req, res) {
    (0, _MongoClient.connectDB)(function (db) {
      db.collection(COLLECTION_POSTS).insertOne(req.body).then(function () {
        return db.collection(COLLECTION_POSTS).find().toArray();
      }).then(function (records) {
        return res.status(200).send(records);
      })["catch"](function () {
        return res.status(400).send("Error fetching document from ".concat(COLLECTION_POSTS));
      });
    });
  },
  insertReview: function insertReview(req, res) {
    (0, _MongoClient.connectDB)(function (db) {
      db.collection(COLLECTION_REVIEWS).insertOne(req.body).then(function () {
        return db.collection(COLLECTION_REVIEWS).find().toArray();
      }).then(function (records) {
        return res.status(200).send(records);
      })["catch"](function () {
        return res.status(400).send("Error fetching document from ".concat(COLLECTION_REVIEWS));
      });
    });
  }
};