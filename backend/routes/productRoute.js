import express, { response } from 'express'
import ProductModel from '../models/productModel';

import { isAuth , Admin } from '../util';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const product = await ProductModel.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found.' });
  }
});


router.get('/', async(req , res) => {
  const category = req.query.category?{ category:(req.query.category)}:{}
  const searchKeyword = req.query.searchKeyword
  ?
  { 
    title:{
      $regex: req.query.searchKeyword,
      $options: 'i'
    }
  }
  :{}
  const sortOrder = req.query.sortOrder
  ?
(  req.query.sortOrder==='lowest'
  ? { price:1 }
  :{ price:-1 })
  :{ _id:-1 }
  const products = await ProductModel.find({ ...category,...searchKeyword }).sort(
    sortOrder
    )
  res.send(products)
})
 router.post('/', isAuth, Admin, async(req , res) => {
  const product = new ProductModel({
      title: req.body.title,
      price: req.body.price,
      image: req.body.image,
      brand: req.body.brand,
      stock: req.body.stock,
      description: req.body.description,
      category: req.body.category
  })
  const newProduct = await product.save()
  if(newProduct){
      return res.status(201).send({msg: 'Product added', data: newProduct})
  }
  return res.status(500).send({msg: 'Error when trying to add product.'})
 })
 router.put('/:id', isAuth, Admin ,async(req , res) => {
   const productId = req.params.id 
   const product = await ProductModel.findById(productId)
  if(product){
      product._id = req.body.id
      product.title= req.body.title
      product.price= req.body.price
      product.stock= req.body.stock
      product.description= req.body.description
      product.category= req.body.category
      product.image= req.body.image
      product.brand= req.body.brand
     
      const updatedProduct = await product.save()
      if(updatedProduct){
          return res.status(200).send({msg: 'Product updated successfully', data: updatedProduct})
      }
    }
      return res.status(500).send({msg: 'Error when trying to update the product.'})
 })

 router.delete('/:id',isAuth ,Admin , async(req, res) => {
   
   const product = await ProductModel.findById(req.params.id )
   if(product){
     await product.remove()
     res.send({msg: 'Product deleted successfully.'})
   }
   res.send( 'Error while trying to delete the product.')
 })

export default router