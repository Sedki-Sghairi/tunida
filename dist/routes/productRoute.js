"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireWildcard(require("express"));

var _productModel = _interopRequireDefault(require("../models/productModel"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const router = _express.default.Router();

router.get('/:id', async (req, res) => {
  const product = await _productModel.default.findOne({
    _id: req.params.id
  });

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({
      message: 'Product Not Found.'
    });
  }
});
router.get('/', async (req, res) => {
  const category = req.query.category ? {
    category: req.query.category
  } : {};
  const searchKeyword = req.query.searchKeyword ? {
    title: {
      $regex: req.query.searchKeyword,
      $options: 'i'
    }
  } : {};
  const sortOrder = req.query.sortOrder ? req.query.sortOrder === 'lowest' ? {
    price: 1
  } : {
    price: -1
  } : {
    _id: -1
  };
  const products = await _productModel.default.find({ ...category,
    ...searchKeyword
  }).sort(sortOrder);
  res.send(products);
});
router.post('/', _util.isAuth, _util.Admin, async (req, res) => {
  const product = new _productModel.default({
    title: req.body.title,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    stock: req.body.stock,
    description: req.body.description,
    category: req.body.category
  });
  const newProduct = await product.save();

  if (newProduct) {
    return res.status(201).send({
      msg: 'Product added',
      data: newProduct
    });
  }

  return res.status(500).send({
    msg: 'Error when trying to add product.'
  });
});
router.put('/:id', _util.isAuth, _util.Admin, async (req, res) => {
  const productId = req.params.id;
  const product = await _productModel.default.findById(productId);

  if (product) {
    product._id = req.body.id;
    product.title = req.body.title;
    product.price = req.body.price;
    product.stock = req.body.stock;
    product.description = req.body.description;
    product.category = req.body.category;
    product.image = req.body.image;
    product.brand = req.body.brand;
    const updatedProduct = await product.save();

    if (updatedProduct) {
      return res.status(200).send({
        msg: 'Product updated successfully',
        data: updatedProduct
      });
    }
  }

  return res.status(500).send({
    msg: 'Error when trying to update the product.'
  });
});
router.delete('/:id', _util.isAuth, _util.Admin, async (req, res) => {
  const product = await _productModel.default.findById(req.params.id);

  if (product) {
    await product.remove();
    res.send({
      msg: 'Product deleted successfully.'
    });
  }

  res.send('Error while trying to delete the product.');
});
var _default = router;
exports.default = _default;