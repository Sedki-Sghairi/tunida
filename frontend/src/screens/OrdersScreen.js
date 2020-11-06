import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';

function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, orders } = orderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const { success: successDelete } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return (error) => {
      console.error(error)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  }
  const myOrders = orders || []
  return loading ? <div>Loading...</div> :
   <>
      <div className="order-header">
        <h3>Orders</h3>
      </div>
        <table class="table order-table">
          <thead>
            <tr>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>STATUS</th>
              <th>DELIVERED AT</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map(order => (<tr key={order._id}>
              <td data-label="DATE">{order.createdAt}</td>
              <td data-label="TOTAL">{order.totalPrice}</td>
              <td data-label="USER">{order.user.name}</td>
              <td data-label="PAID">{order.isPaid?'paid':'not paid'}</td>
              <td data-label="PAID AT">{order.paidAt}</td>
              <td data-label="STATUS">{order.isDelivered?'delivered':'not delivered'}</td>
              <td data-label="DELIVERED AT">{order.deliveredAt?order.deliveredAt:'N/A'}</td>
              <td data-label="ACTION">
                <Link to={"/order/" + order._id} className="link-details" >Details</Link>
                {' '}
                <button type="button" onClick={() => deleteHandler(order)} className="button-delete">Delete</button>
              </td>
            </tr>))}
          </tbody>
        </table>
     </>
  
}
export default OrdersScreen;