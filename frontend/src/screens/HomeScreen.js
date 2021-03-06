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
	useEffect(() => {
		dispatch(listProducts(category, searchKeyword, sortOrder))
		return (err) => {
			console.error(err);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortOrder])
	
		window.addEventListener('scroll', function(){
			if(document.querySelector('.container-ads')){
				if(0 < window.pageYOffset ){
					document.querySelector('.container-ads').classList.add('white')
					document.querySelector('.before-ads').classList.add('clear')
				}else{
					document.querySelector('.container-ads').classList.remove('white')
					document.querySelector('.before-ads').classList.remove('clear')
					
				}
			}else return
		})
	return (
	 <div className="home">
	       <div className="filter-container">
		   <ul className="filter">
				  <li>
					<form onSubmit={submitHandler} className='search-box'>
						<input name='searchKeyword'
						 onChange={(e) => setSearchKeyword(e.target.value)}
						 placeholder='search'
						 className='search-txt'
						 />
						<button type='submit' className='search-btn'><i className="fas fa-search"></i></button>
					</form>
				  </li>
				  <li>
					<div className="select">
					<select  name="sortOrder" onChange={(e) => setSortOrder(e.target.value)}>
						<option value="">Latest products</option>
						<option value="lowest">Lowest price</option>
						<option value="highest">Highest price</option>
					</select>
					<span className="arrow"><span>sort by</span><i className="fas fa-arrow-circle-down"></i></span>
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
			:<div className='ads-section'>
			    <div className="before-ads"></div>
				<h3  className='catt' id='catt'><span>Tunida</span></h3>
				<div className='container-ads'>
					80% Off 
						<div id='flip'>
						<div><div>buy</div></div>
						<div><div>sell</div></div>
						<div><div>fashion</div></div>
				        </div>
				your first Order!
				<p>tunida is now in tunisia</p>
				</div>
			</div>}
			{loading ? (
				<div>Loading...</div>
			) : error ? (
				<div>{error}</div>
			) : (
			<ul className="products" id='sevanam'>
				{products.map((item) => (
					<li key={item._id} onClick={() => removeSidebar()}>
						<Link to={`/product/${item._id}`}>
							<div className="product" id={item._id}>
								<img src={item.image} alt={item.title} className="product-image" />
								<div className="product-name"> {item.title} </div>
								<div className="product-brand">{item.brand}</div>
								<div className="product-price">{item.price} TND</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		)}
		</div>   
	
    )
}
