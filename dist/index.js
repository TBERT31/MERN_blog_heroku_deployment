"use strict";

var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _cors = _interopRequireDefault(require("cors"));
var _routes = require("./routes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
var PORT = process.env.PORT || 4000;
app.use((0, _cors["default"])());
app.use(_express["default"].json());

// basic route
// app.get("/", (_, res) => {
//   res.send("Hello Express ! this is a example of RESTful API ");
// });

// routes and handlers
app.get("/posts", _routes.getPosts);
app.get("/reviews", _routes.getReviews);
app.get("/posts/:id", _routes.getSinglePost);
app.post("/posts/insert", _routes.insertPost);
app.post("/reviews/insert", _routes.insertReview);

// server client statically
var public_path = _path["default"].join(__dirname, "../build");
app.use(_express["default"]["static"](public_path));
app.get("*", function (_, res) {
  res.sendFile(_path["default"].join(public_path, "index.html"));
});

//connect to server
app.listen(PORT, function () {
  console.log("Hello Express, server is up and running on port ".concat(PORT));
});