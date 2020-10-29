"use strict";

var _express = _interopRequireDefault(require("express"));

var _config = _interopRequireDefault(require("./config"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _productRoute = _interopRequireDefault(require("./routes/productRoute"));

var _orderRoute = _interopRequireDefault(require("./routes/orderRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mongodbUrl = _config["default"].MONGODB_URL;

_mongoose["default"].connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})["catch"](function (error) {
  return console.error(error.reason);
});

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use('/api/users', _userRoute["default"]);
app.use('/api/products', _productRoute["default"]);
app.use('/api/orders', _orderRoute["default"]);
var CLIENT_ID = _config["default"].PAYPAL_CLIENT_ID;
app.get('/api/config/paypal', function (req, res) {
  res.send(CLIENT_ID);
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log('server started at: http://localhost:5000');
});