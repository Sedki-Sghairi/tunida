import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';


function OrderScreen(props) {
  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successPay) {
      props.history.push("/profile");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successPay]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  return loading ? <div>Loading ...</div> : error ? <div>{error}</div> :

    <div className='ship'>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>
              Shipping
          </h3>
            <div>
              {order.shipping.address}, {order.shipping.city},
          {order.shipping.postalCode}, {order.shipping.country},
          </div>
            <div>
              {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>
              Payment Method: {order.payment.paymentMethod}
            </div>
        
              {order.isPaid ? <div className="green-message">{'Paid at' + order.paidAt} </div> : <div className='red-message'>Not Paid.</div>}
            
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>
                  Shopping Cart
          </h3>
                <div>
                  Price
          </div>
              </li>
              {
                order.orderItems.length === 0 ?
                  <div>
                    Cart is empty
          </div>
                  :
                  order.orderItems.map(item =>
                    <li key={item._id}>
                          <Link to={"/product/" + item.product}>
                      <div className="cart-image">
                        <img src={item.image} alt="product" />
                      </div>
                          </Link>
                      <div className='item-details'>
                        <div className="cart-name">
                            {item.name}

                        </div>
                        <div>
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
            <li className="pay">
              {loadingPay && <div>Finishing Payment...</div>}
              {!order.isPaid &&
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment} />
              }
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>{order.itemsPrice} TND</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>{order.shippingPrice} TND</div>
            </li>
            <li>
              <div>Tax</div>
              <div>{order.taxPrice} TND</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>{order.totalPrice} TND</div>
            </li>
          </ul>



        </div>

      </div>
    </div>

}

export default OrderScreen;