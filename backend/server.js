import express from 'express';
import data from './data';
import dotenv from 'dotenv'
import config from './config'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute'

dotenv.config()
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}).catch(error => console.error(error.reason))

const app = express();
app.use('/api/users' , userRoute)
app.get('/api/products', (req, res) => {
	res.send(data.products);
});
app.get('/api/products/:id', (req, res) => {
	const productId = req.params.id;
	const product = data.products.find((x) => x.id === productId);
	product ? res.send(product) : res.status(404).send({ msg: 'Product Not Found.' });
});


app.listen(5000, () => {
	console.log('server started at: http://localhost:5000');
});
