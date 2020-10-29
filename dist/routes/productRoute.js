"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _productModel = _interopRequireDefault(require("../models/productModel"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

router.get('/:id', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var product;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _productModel["default"].findOne({
              _id: req.params.id
            });

          case 2:
            product = _context.sent;

            if (product) {
              res.send(product);
            } else {
              res.status(404).send({
                message: 'Product Not Found.'
              });
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var category, searchKeyword, sortOrder, products;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            category = req.query.category ? {
              category: req.query.category
            } : {};
            searchKeyword = req.query.searchKeyword ? {
              title: {
                $regex: req.query.searchKeyword,
                $options: 'i'
              }
            } : {};
            sortOrder = req.query.sortOrder ? req.query.sortOrder === 'lowest' ? {
              price: 1
            } : {
              price: -1
            } : {
              _id: -1
            };
            _context2.next = 5;
            return _productModel["default"].find(_objectSpread(_objectSpread({}, category), searchKeyword)).sort(sortOrder);

          case 5:
            products = _context2.sent;
            res.send(products);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/', _util.isAuth, _util.Admin, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var product, newProduct;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            product = new _productModel["default"]({
              title: req.body.title,
              price: req.body.price,
              image: req.body.image,
              brand: req.body.brand,
              stock: req.body.stock,
              description: req.body.description,
              category: req.body.category
            });
            _context3.next = 3;
            return product.save();

          case 3:
            newProduct = _context3.sent;

            if (!newProduct) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.status(201).send({
              msg: 'Product added',
              data: newProduct
            }));

          case 6:
            return _context3.abrupt("return", res.status(500).send({
              msg: 'Error when trying to add product.'
            }));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.put('/:id', _util.isAuth, _util.Admin, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var productId, product, updatedProduct;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            productId = req.params.id;
            _context4.next = 3;
            return _productModel["default"].findById(productId);

          case 3:
            product = _context4.sent;

            if (!product) {
              _context4.next = 18;
              break;
            }

            product._id = req.body.id;
            product.title = req.body.title;
            product.price = req.body.price;
            product.stock = req.body.stock;
            product.description = req.body.description;
            product.category = req.body.category;
            product.image = req.body.image;
            product.brand = req.body.brand;
            _context4.next = 15;
            return product.save();

          case 15:
            updatedProduct = _context4.sent;

            if (!updatedProduct) {
              _context4.next = 18;
              break;
            }

            return _context4.abrupt("return", res.status(200).send({
              msg: 'Product updated successfully',
              data: updatedProduct
            }));

          case 18:
            return _context4.abrupt("return", res.status(500).send({
              msg: 'Error when trying to update the product.'
            }));

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router["delete"]('/:id', _util.isAuth, _util.Admin, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var product;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _productModel["default"].findById(req.params.id);

          case 2:
            product = _context5.sent;

            if (!product) {
              _context5.next = 7;
              break;
            }

            _context5.next = 6;
            return product.remove();

          case 6:
            res.send({
              msg: 'Product deleted successfully.'
            });

          case 7:
            res.send('Error while trying to delete the product.');

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;