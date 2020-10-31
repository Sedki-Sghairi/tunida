import express from 'express';
import config from './config'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute'
import bodyParser from 'body-parser'
import productRoute from './routes/productRoute'
import orderRoute from './routes/orderRoute'
import "core-js";
import "regenerator-runtime/runtime.js";
import "@babel/polyfill";
const path = require('path')
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
	
}).catch(error => console.error(error.reason))

const app = express();
app.use(bodyParser.json())
app.use('/api/users' , userRoute)
app.use('/api/products' , productRoute)
app.use('/api/orders', orderRoute);

const CLIENT_ID = config.PAYPAL_CLIENT_ID

app.get('/api/config/paypal', (req, res) =>{
	res.send(CLIENT_ID)
})
   
app.use(express.static(path.join(__dirname,'../frontend/build')))
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '../frontend/build/index.html'))
  })

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})