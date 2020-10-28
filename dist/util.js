"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Admin = exports.isAuth = exports.getToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getToken = function getToken(user) {
  return _jsonwebtoken["default"].sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  }, _config["default"].JWT_SECRET, {
    expiresIn: '2 days'
  });
};

exports.getToken = getToken;

var isAuth = function isAuth(req, res, next) {
  var token = req.headers.authorization;

  if (token) {
    var onlyToken = token.slice(6, token.length);

    _jsonwebtoken["default"].verify(onlyToken, _config["default"].JWT_SECRET, function (err, decode) {
      if (err) {
        return res.status(401).send({
          msg: 'Invalid Token.'
        });
      }

      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({
      msg: 'Token not issued.'
    });
  }
};

exports.isAuth = isAuth;

var Admin = function Admin(req, res, next) {
  if (req.user.isAdmin) {
    console.log('mrigwl');
    next();
    return;
  } else {
    return res.status(401).send({
      msg: req
    });
  }
};

exports.Admin = Admin;