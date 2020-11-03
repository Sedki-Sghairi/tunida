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
    <div className="content-margined">

      <div className="order-header">
        <h3>Orders</h3>
      </div>
      <div className="order-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map(order => (<tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt}</td>
              <td>{order.totalPrice}</td>
              <td>{order.user.name}</td>
              <td>{order.isPaid?'paid':'not paid'}</td>
              <td>{order.paidAt}</td>
              <td>{order.isDelivered?'delivered':'not delivered'}</td>
              <td>{order.deliveredAt}</td>
              <td>
                <Link to={"/order/" + order._id} className="link-details" >Details</Link>
                {' '}
                <button type="button" onClick={() => deleteHandler(order)} className="button-delete">Delete</button>
              </td>
            </tr>))}
          </tbody>
        </table>

      </div>
    </div>
}
export default OrdersScreen;