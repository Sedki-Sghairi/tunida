import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { detailsProduct } from '../actions/productAction';
import { HashLink } from 'react-router-hash-link';
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
	/*animate details*/

	window.addEventListener('scroll', function(){
		if( document.querySelector(".container-threed") && (document.querySelector(".card"))
		&& (document.querySelector(".titlethreed")) && (document.querySelector(".tunida-product img")
		&& (document.querySelector(".go-home"))) && (document.querySelector(".infothreed h3"))
		&& (document.querySelector(".sizes")) && (500 < document.querySelector('.container-threed').offsetWidth)){
			const card = document.querySelector(".card");
			const container = document.querySelector(".container-threed");
			const titlethreed = document.querySelector(".titlethreed");
			const tunidaProduct = document.querySelector(".tunida-product img");
			const go = document.querySelector(".go-home");
			const description = document.querySelector(".infothreed h3");
			const sizes = document.querySelector(".sizes");
			container.addEventListener("mousemove", (e) => {
			let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
			let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
			card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
			});
			container.addEventListener("mouseenter", (e) => {
			document.querySelector('.header').classList.add('no-height')
			card.style.transition = "none";
			titlethreed.style.transform = "translateZ(150px)";
			tunidaProduct.style.transform = "translateZ(200px) ";
			description.style.transform = "translateZ(125px)";
			sizes.style.transform = "translateZ(100px)";
			go.style.transform = "translateZ(75px)";
			});
			container.addEventListener("mouseleave", (e) => {
			document.querySelector('.header').classList.remove('no-height')
			card.style.transition = "all 0.5s ease";
			card.style.transform = `rotateY(0deg) rotateX(0deg)`;
			titlethreed.style.transform = "translateZ(0px)";
			tunidaProduct.style.transform = "translateZ(0px) rotateZ(0deg)";
			description.style.transform = "translateZ(0px)";
			sizes.style.transform = "translateZ(0px)";
			go.style.transform = "translateZ(0px)";
			});
		}
	})
	const gohomeHandle = () =>{
		document.querySelector('.header').classList.remove('no-height')
	}
	return (
		<div>
			{loading ? (
				<div className="user-message">Loading...</div>
			) : error ? (
				<div className="user-message">{error}</div>
			) : (
				<div className="details">
				<div className="container-large">
					<div className="container-threed">
						<div className="card">
							
							<div className="infothreed">
								<h1 className="titlethreed">{product.title}</h1>
								<div className="tunida-product">
								<img src={product.image} alt="adidas"/>
							</div>
								<h3>{product.description}</h3>
								<div className="sizes">
									<button>S</button>
									<button>M</button>
									<button className="active-btn">L</button>
									<button>XL</button>
								</div>
								<HashLink to={`/#${product._id}`}>
								<div className='go-home' onClick={gohomeHandle}>
									<button className='button-threed' onClick={gohomeHandle}>Go Back </button>
								</div>
								</HashLink>
							</div>
						</div>
					</div>
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
