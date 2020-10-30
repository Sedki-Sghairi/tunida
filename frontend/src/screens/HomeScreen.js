import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productAction';

export default function HomeScreen(props) {
	const [ searchKeyword, setSearchKeyword ] = useState('')
	const [ sortOrder, setSortOrder ] = useState('')
	const category = props.match.params.panda? props.match.params.panda:''
	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;
	const dispatch = useDispatch();
   
	useEffect(() => {
	  dispatch(listProducts(category))
		return (err) => {
			console.error(err);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [category]);
	function removeSidebar() {
		document.getElementById('sidebar').classList.remove('open');
		document.querySelector('.sidebar-header').classList.remove('header-show')
	}
	const submitHandler = (e) =>{
		e.preventDefault()
		dispatch(listProducts(category, searchKeyword, sortOrder))
	}
	const sortHandler = () =>{
		
		dispatch(listProducts(category, searchKeyword, sortOrder))
		console.log(sortOrder)
	}
	return (
	 <>     
	       <div className="filter-container">
		   <ul className="filter">
				  <li>
					<form onSubmit={submitHandler} className='search-box'>
						<input name='searchKeyword'
						 onChange={(e) => setSearchKeyword(e.target.value)}
						 placeholder='search by name'
						 className='search-txt'
						 onSelect={submitHandler}
						 />
						<button type='submit' className='search-btn'><i className="fas fa-search"></i></button>
					</form>
				  </li>
				  <li>
					<div className="select">
					<select  name="sortOrder" onChange={(e) => setSortOrder(e.target.value)} onClick={sortHandler} >
						<option value="">Latest products</option>
						<option value="lowest">Lowest price</option>
						<option value="highest">Highest price</option>
					</select>
					<span className="arrow"><i className="fas fa-arrow-circle-down"></i></span>
					</div>
				  </li>
			   </ul>
		   
            <div>
			   <div className="promo-container">
			   <div className="container">
					<span className='text1'>fashion</span>
					<span className='text2'>women</span>
			   </div>
			   </div>
			   <ul className="single-box">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
    		</div>
			</div>
			{category?<h3 className='cat' id='cat'><span>Tunida</span>{' '}{category}</h3>
			:<h3  className='catt' id='catt'><span>Tunida</span></h3>}
			{loading ? (
				<div>Loading...</div>
			) : error ? (
				<div>{error}</div>
			) : (
			<ul className="products">
				{products.map((item) => (
					<li key={item._id} onClick={() => removeSidebar()}>
						<Link to={`/product/${item._id}`}>
							<div className="product">
								<img src={item.image} alt={item.title} className="product-image" />
								<div className="product-name"> {item.title} </div>
								<div className="product-brand">{item.brand}</div>
								<div className="product-price">{item.price} TND</div>
								<div className="product-rating">
									{item.rating}({item.reviews})
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		)}
	</>
    )
}
