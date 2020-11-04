import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { detailsProduct } from '../actions/productAction';
import { useState } from 'react';
export default function ProductScreen(props) {
	const [ qty, setQty ] = useState(1);
	const productDetails = useSelector((state) => state.productDetails);
	const { product, loading, error } = productDetails;
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(detailsProduct(props.match.params.id));
		return () => {
			//
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const handlePayment = () => {
		props.history.push('/cart/' + props.match.params.id + '?qty' + qty);
	};
	return (
		<div>
			{loading ? (
				<div className="user-message">Loading...</div>
			) : error ? (
				<div className="user-message">{error}</div>
			) : (
				<div className="details">
						<ul  className="details-info">
							<li>
								<span className='product-brand '>{product.brand}</span>
								<h4 className='cart-name'>{product.title}</h4>
							</li>
							<li className='description'>{product.description}</li>
						</ul>
					<div className="details-image">
						<img src={product.image} alt={product.title} />
					</div>
					<div className="details-action">
						<ul>
							<li>
								Price:{' '}
								<span>
								
									<b>{product.price*qty>0?product.price*qty:''}</b> TND
								</span>
							</li>
							<li>
								<label htmlFor="qty">QTY: </label>
								<select name="qty" value={qty} onChange={(e) => setQty(e.target.value)}>
									{[ ...Array(product.stock).keys() ].map(function(i) {
										return (
											<option value={i + 1} key={i + 1}>
												{i + 1}
											</option>
										);
									})}
								</select>
							</li>
							<li>
								{product.stock > 0 ? (
									<button className="button" onClick={handlePayment}>
										Add to Cart
									</button>
								) : (
									<div className="no-stock">Sorry! This item is currently out of stock.</div>
								)}
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}
