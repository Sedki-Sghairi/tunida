import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import {Link} from 'react-router-dom'
function CartScreen(props) {
    const productId = props.match.params.id
    const x = props.location.search.split('').slice(4)
    let foo ='';
    for(let i=0 ; i<x.length ; i++){
        if(x[i] !== undefined){
            foo = foo + x[i];
        }
    }
    const qty = props.location.search?Number(foo):1
    const dispatch = useDispatch()
   useEffect(() => {
       if(productId){
        dispatch(addToCart(productId , qty))
       }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])
   const cart = useSelector(state => state.cart)
   const {cartItems} = cart
   const removeHandler = (id) =>{
      dispatch(removeFromCart(id))
   }
   const chechoutHandler = () => {
       props.history.push('/signin?redirect=shipping')
   }
    return (
        <div className='cart'>
        <h3>Your Cart</h3>
         <div className="cart-action">
               <h3>
               Total ({cartItems.reduce((a , c) => a + c.qty,0)}) items
               :{' '}<span className='product-price'>
               {cartItems.reduce((a,c) => a + c.price*c.qty , 0)}{' '}TND</span>
               </h3>
               <button className="button-primary" disabled={cartItems.length === 0} onClick={ chechoutHandler }>
                  Proceed to Checkout
               </button>
           </div>
           <div className="cart-list">
             <ul className="cart-list-container">
                 
                 {cartItems.length === 0?
                 <div className='empty'>Your Cart is empty!</div>
                 :
                 cartItems.map(item => 
                 <li key={item.product}>
                     <div className='cart-list-img' > 
                     <Link to={'/product/'+ item.product}>
                       <img src={item.image} alt='Product'/>
                     </Link>
                     </div>
                     <div className="cart-list-name">
                         <div>
                             {item.name}
                         </div>
                         <div>
                          QTY:{' '}
                             <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                {
                                    [...Array(item.stock).keys()].map(x => 
                                    <option key={x+1} value={x+1}>{x+1}</option>
                                    )
                                }
                               
                             </select>
                             
                             <i className="fas fa-trash" onClick={() => removeHandler(item.product)}><span className='tip'>remove</span></i>
                            
                         </div>
                         </div>
                         <div className='cart-list-price'>
                             Price:<br/><span>{' ' + item.price*item.qty>0?item.price*item.qty:''}</span>TND
                         </div>
                 </li>
                 )
                 }
             </ul>
           </div>
          
        </div>
    )
}
export default CartScreen