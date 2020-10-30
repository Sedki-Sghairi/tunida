"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _userModels = _interopRequireDefault(require("../models/userModels"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/signin', async (req, res) => {
  const signinUser = await _userModels.default.findOne({
    email: req.body.email,
    password: req.body.password
  });

  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: (0, _util.getToken)(signinUser)
    });
  } else {
    res.status(401).send({
      msg: 'User email or password not found.'
    });
  }
});
router.get('/createadmin', async (req, res) => {
  try {
    const user = new _userModels.default({
      name: 'ida',
      password: '123',
      isAdmin: true,
      email: 'a@g.c'
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({
      msg: error.message
    });
  }
});
router.post('/register', async (req, res) => {
  try {
    const userRegister = new _userModels.default({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    });
    const newUserRegister = await userRegister.save();
    res.send({
      _id: newUserRegister.id,
      name: newUserRegister.name,
      email: newUserRegister.email,
      isAdmin: newUserRegister.isAdmin,
      token: (0, _util.getToken)(newUserRegister)
    });
  } catch (error) {
    res.send({
      msg: error.message
    });
  }
});
router.put('/:id', _util.isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await _userModels.default.findById(userId);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: (0, _util.getToken)(updatedUser)
    });
  } else {
    res.status(404).send({
      message: 'User Not Found'
    });
  }
});
var _default = router;
exports.default = _default;