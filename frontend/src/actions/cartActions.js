import Axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING , CART_SAVE_PAYMENT} from '../constants/cartConstants'
import Cookie from 'js-cookie'

 const addToCart = (productId , qty) => async(dispatch , getState) => {
   try {
       const {data} = await Axios.get('/api/products/'+ productId)
       dispatch({
           type: CART_ADD_ITEM, payload: {
               product: productId,
               name: data.title,
               image: data.image,
               price: data.price,
               stock: data.stock,
               qty
           }
       })
       const {cart: {cartItems}} = getState();
       Cookie.set('cartItems', JSON.stringify(cartItems))
   } catch (error) {
       
   }
    
}
const removeFromCart =(id) => async(dispatch , getState) => {
    dispatch({type: CART_REMOVE_ITEM , payload: id})
    const{cart:{cartItems}} = getState()
    Cookie.set('cartItems', JSON.stringify(cartItems))

}

const saveShipping = (data) => (dispatch) =>{
    dispatch({type: CART_SAVE_SHIPPING, payload: data})
}
const savePayment = (data) => (dispatch) =>{
    dispatch({type: CART_SAVE_PAYMENT , payload: data})
}
export {addToCart , removeFromCart , saveShipping , savePayment}




