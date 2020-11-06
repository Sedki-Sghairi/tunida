import React from 'react';
import { Squash as Hamburger } from 'hamburger-react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import { HashLink } from 'react-router-hash-link';

function App() {
	const userSignin = useSelector(state => state.userSignin)
	const {userInfo} = userSignin
	const expand = ()=>{
		document.getElementById('drop').classList.toggle('click')
	}
	const hideLinks = () => {

		document.getElementById('drop').classList.remove('click')
	}
	const hideSideBar = () => {
		document.getElementById('sidebar').classList.remove('open')
		document.querySelector('.sidebar-header').classList.remove('header-show')
	}
    window.addEventListener('scroll', function(){
		if(document.querySelector('.top-link')){
			if(window.pageYOffset > 500){
				document.querySelector('.top-link').classList.add('show-link')
			}else{
				document.querySelector('.top-link').classList.remove('show-link')
			}
		}else return
		
	})
	return (
		<BrowserRouter>
			<div className="grid-container">
				<header className="header">
					<div className="brand">
						<button>
							<Hamburger
								onToggle={() => {
									document.getElementById('sidebar').classList.toggle('open')
		                            document.querySelector('.sidebar-header').classList.toggle('header-show')
								}}
							/>
						</button>
						<HashLink to="/#sevanam">Tunida</HashLink>
					</div>
					<div className="header-links">

						{ userInfo
						? 
						<Link to='/profile'>{userInfo.name}</Link>
						:
						<Link to='/signin'>Sign in</Link>
						}
                        {
							userInfo && userInfo.isAdmin && (
								<div className='dropdown'>
								<button className='admin-btn' onClick={expand}><i className="fas fa-user-cog"></i></button>
								<ul className='dropdown-content' id='drop'>
									<li className='admin-links'>
										<Link onClick={hideLinks} to = '/products'>Products</Link>
										<Link onClick={hideLinks} to = '/orders'>Orders</Link><br/>
									</li>
								</ul>
								</div>
							)
						}
						<Link to='/cart'>Cart</Link>
					</div>
				</header>
				<div className="sidebar" id="sidebar">
				     <div className='sidebar-header'>categories</div>
					<ul className="sidebar-content">
						<li>
							<Link onClick={hideSideBar} to="/category/dresses"><i className="fas fa-female"></i>dresses</Link>
						</li>
						<li>
							<Link onClick={hideSideBar} to="/category/shirts"><i className="fas fa-tshirt"></i>shirts</Link>
						</li>
						<li>
							<Link onClick={hideSideBar} to="/category/jeans"><i className="fas fa-shopping-cart"></i>jeans</Link>
						</li>
						<li>
							<Link onClick={hideSideBar} to="/category/shorts"><i className="fas fa-sun"></i>shorts & skirts</Link>
						</li>
						<li>
							<Link onClick={hideSideBar} to="/category/jackets"><i className="fas fa-cloud-sun-rain"></i>jackets & coats</Link>
						</li>
						<li>
							<Link onClick={hideSideBar} to="/category/shoes"><i className="fas fa-shoe-prints"></i>footwear</Link>
						</li>
						<li>
							<Link onClick={hideSideBar} to="/category/sport"><i className="fas fa-swimmer"></i>sports</Link>
						</li>
						<li>
							<Link onClick={hideSideBar} to="/category/lingery"><i className="fas fa-bed"></i>lingery & sleepwear</Link>
						</li>
						<li>
							<Link onClick={hideSideBar} to="/category/baby"><i className="fas fa-baby"></i>baby</Link>
						</li>
					</ul>
				</div>
				<main className="main">
					<div className='routes-container'>
						<Route path="/orders" component={OrdersScreen} />
						<Route path="/profile" component={ProfileScreen} />
						<Route path="/register" component={RegisterScreen} />
						<Route path="/shipping" component={ShippingScreen} />
						<Route path="/payment" component={PaymentScreen} />
						<Route path="/placeOrder" component={PlaceOrderScreen} />
						<Route path="/order/:id" component={OrderScreen} />
						<Route path="/signin" component={SigninScreen} />
						<Route path="/" exact={true} component={HomeScreen} />
						<Route path="/category/:panda"  component={HomeScreen} />
						<Route path="/product/:id" component={ProductScreen} />
						<Route path="/products" component={ProductsScreen} />
						<Route path='/cart/:id?' component={CartScreen}/>
					</div>
				</main>
				<a className="top-link" href="#top">
				  <i className="fas fa-arrow-up"></i>
				</a>
				<footer className="footer">all rights reserved</footer>

			</div>
		</BrowserRouter>
	);
}

export default App;
