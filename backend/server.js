import express from 'express';
import config from './config'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute'
import bodyParser from 'body-parser'
import productRoute from './routes/productRoute'
import orderRoute from './routes/orderRoute'
import "core-js/stable";
import "regenerator-runtime/runtime";
import "@babel/polyfill";

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
   


// app.listen( 5000, () => {
// 	console.log('server started at: http://localhost:5000');
// });
app.listen(process.env.PORT || 5000, () => {  
	console.log(`app is running on port ${process.env.PORT}`);
  }) 