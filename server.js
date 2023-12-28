var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var helmet = require("helmet");

require("dotenv").config();

var app = express();
var router = express.Router();
var port = process.env.PORT || 3333;

// var testRouter = require("./router/testRouter");
var userRouter = require("./router/userRouter");
var userLocationHistoryRouter = require("./router/userLocationHistoryRouter");

app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 50000,
  })
);

//router
// router.use(testRouter);
router.use(userRouter);
router.use(userLocationHistoryRouter);
app.use(router);

// 404
app.use(function (req, res, next) {
  return res.status(404).send({ message: req.url + " Not found." });
});

// 500 - Any server error
app.use(function (err, req, res, next) {
  return res.status(500).send({ error: err });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
