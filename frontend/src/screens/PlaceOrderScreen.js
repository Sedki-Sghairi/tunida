import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';

function PlaceOrderScreen(props) {

  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { success, order } = orderCreate;

  const { cartItems, shipping, payment } = cart;
  if (!shipping.address || !shipping.city || !shipping.country || !shipping.postalCode) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }
  const itemsPrice =  Number(cartItems.reduce((a, c) => a + c.price * c.qty, 0));
  const shippingPrice =  Number(itemsPrice > 100 ? 0 : 10);
  const taxPrice =  Number(( 0.15 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
      taxPrice, totalPrice
    }));
  }
  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return <div>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
            Shipping
          </h3>
          <div>
            {cart.shipping.address}, {cart.shipping.city},
          {cart.shipping.postalCode}, {cart.shipping.country},
          </div>
        </div>
        <div>
          <h3>Payment</h3>
          <div>
            Payment Method: {cart.payment.paymentMethod}
          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h3>
                Shopping Cart
             </h3>
             </li>
            {
              cartItems.length === 0 ?
                <div>
                  Cart is empty
          </div>
                :
                cartItems.map(item =>
                  <li key={item.product}><Link to={"/product/" + item.product}>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                        </Link>
                    <div className='item-details'>
                      <div className="cart-name">
                          
                          {item.name}

                      </div>
                      <div className='qty'>
                          Qty: {item.qty}
                      </div>
                      <div className="price">
                      {item.price} TND
                     </div>
                    </div>
                  </li>
                )
            }
          </ul>
        </div>

      
      </div>
      <div className="placeorder-action">
        <ul>
          <li>
            <button className="button primary full-width" onClick={placeOrderHandler} >Place Order</button>
          </li>
          <li>
            <h3>Order Summary</h3>
          </li>
          <li>
            <div>Items</div>
            <div>{itemsPrice} TND</div>
          </li>
          <li>
            <div>Shipping</div>
            <div>{shippingPrice} TND</div>
          </li>
          <li>
            <div>Tax</div>
            <div>{taxPrice} TND</div>
          </li>
          <li>
            <div>Order Total</div>
            <div>{totalPrice} TND</div>
          </li>
        </ul>



      </div>

    </div>
  </div>

}

export default PlaceOrderScreen;