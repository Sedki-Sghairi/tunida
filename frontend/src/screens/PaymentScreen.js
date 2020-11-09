import React, { useState } from 'react';
import {  useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { Link } from 'react-router-dom'

function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push('placeorder');
  };
  return (
    <div className='ship'>
    <Link to='/shipping' className='back-btn'> Go back</Link>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="pay-container">
        <form onSubmit={submitHandler}>
          <ul className="pay-content">
            <li>
              <h2>Payment</h2>
            </li>
            <li>
              <div className='pay-method'>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label htmlFor="paymentMethod">Paypal</label>
              </div>
            </li>
            <li>
              <button type="submit" className="pay-button">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default PaymentScreen;
