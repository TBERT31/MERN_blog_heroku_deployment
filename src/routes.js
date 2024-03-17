import { connectDB } from "./MongoClient";

// database connection details
const COLLECTION_POSTS = "posts";
const COLLECTION_REVIEWS = "reviews";

module.exports = {
    getPosts : (_, res) => {
        connectDB((db) => {
          db.collection(COLLECTION_POSTS)
            .find()
            .toArray(function (err, results) {
              if (err) {
                res
                  .status(400)
                  .send(`Error fetching documents from ${COLLECTION_POSTS}`);
              }
              res.status(200).send(results);
            });
        });
    }, 
    getSinglePost: (req, res) => {
        const id = req.params.id;
        connectDB((db) => {
          db.collection(COLLECTION_POSTS).findOne(
            { _id: id },
            function (err, result) {
              if (err) {
                res
                  .status(400)
                  .send(`Error fetching document from ${COLLECTION_POSTS}`);
              }
              res.status(200).send(result);
            }
          );
        });
    },
    getReviews : (_, res) => {
        connectDB((db) => {
          db.collection(COLLECTION_REVIEWS)
            .find()
            .toArray(function (err, results) {
              if (err) {
                res
                  .status(400)
                  .send(`Error fetching documents from ${COLLECTION_POSTS}`);
              }
              res.status(200).send(results);
            });
        });
    }, 
    insertPost: (req, res) => {
      connectDB((db) => {
          db.collection(COLLECTION_POSTS)
          .insertOne(req.body)
          .then(() => db.collection(COLLECTION_POSTS).find().toArray())
          .then(records => res.status(200).send(records))
          .catch(() => 
            res
            .status(400)
            .send(`Error fetching document from ${COLLECTION_POSTS}`))
        });
      }, 
    insertReview: (req, res) => {
      connectDB((db) => {
        db.collection(COLLECTION_REVIEWS)
        .insertOne(req.body)
        .then(() => db.collection(COLLECTION_REVIEWS).find().toArray())
        .then(records => res.status(200).send(records))
        .catch(() => 
          res
          .status(400)
          .send(`Error fetching document from ${COLLECTION_REVIEWS}`))
      });
    }
}

