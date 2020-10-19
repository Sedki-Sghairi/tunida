import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {type: String, required: true},
  category: {type: String, required: true},
  image: {type: String, required: true},
  brand: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String, required: true},
  stock: {type: Number, required: true, default: 0}
});

const ProductModel = mongoose.model('Product', productSchema);



export default ProductModel;