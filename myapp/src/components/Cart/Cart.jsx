import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {CalculateTotal,ADD_TO_CART,Delete,DeleteTotal, selectCart, selectTotalPrice, selectTotalProduct, Dec_CART, totalProducts } from '../../Redux/features/cartSlice.js';
import {Link, useNavigate} from 'react-router-dom'
import { getisLoggedin ,previousLink} from '../../Redux/features/authslice.js';
import Navbar from '../Navbar/Navbar.jsx';

export default function Cart() {


//delete last product

  let url = window.location.href
  let dispatch = useDispatch()
  let isLogged = useSelector(getisLoggedin)
   let nav = useNavigate()
const cartItems = useSelector(selectCart);
const totalPrice = useSelector(selectTotalPrice);
const totalProduct = useSelector(selectTotalProduct);


function inCart(product){
  dispatch(ADD_TO_CART(product))
}

function deCart(product){
  dispatch(Dec_CART(product))


}
//delete total product
function Del(product){
  dispatch(Delete(product))
}

///delete whole cart
function deleteTotalCart(){
  dispatch(DeleteTotal())
}

useEffect(() => {
  dispatch(CalculateTotal())
  dispatch(totalProducts())
  dispatch(previousLink(""))
}, [cartItems,dispatch])


function redirectTo(){

if (isLogged === false) {
  nav("/Login")

  dispatch(previousLink(url))
} else {
  nav("ShippingForm")

}}


return (

 <>
 <Navbar/>
 {}
{cartItems.length > 0 ?  <>

  <div className={`container  table-responsive-lg`}>
<table className= " w-50 m-auto border table table-success table-striped table-hover">
  <thead>
<tr>
<th>s/n</th>
<th>Price</th>
<th>Product</th>
<th>Quantity</th>
<th>Total price</th>
<th>Remove</th>
</tr></thead>
{

cartItems.map((product,index) => { return(
  <><tbody>
    <tr>
      <td>{index+1}</td>
      <td>{product.price}</td>
      <td>{product.name?product.name : "null"} <br/> <img src={product.imgURL} alt={product.name} width="150" height="150"/></td>
      <td>{product.productQuantity? product.productQuantity: "null"} <button onClick={()=>deCart(product)} className="btn btn-danger rounded">-</button> <button onClick={()=>inCart(product)} className="btn btn-success rounded">+</button> </td>
      <td>{(product.productQuantity * product.price)?(product.productQuantity * product.price):"null" }</td>
      <td><i onClick={()=>Del(product)} className="fa fa-trash text-danger"/></td>
      </tr> </tbody>
    </>
  )})
}
<button className="btn btn-danger" onClick={()=>deleteTotalCart()}>Empty your Cart</button>
</table> </div>


<div className="checkout bg-primary w-50 m-auto text-white rounded"> 
  <p><Link className="text-white text-decoration-none" to="/"> <i className="fa fa-arrow-left"/> continue shopping</Link></p>
  <h3>Total {totalPrice}</h3>
  <p>{totalProduct} Product(s)</p>
 <button onClick={redirectTo}  className="btn btn-success" > <Link to="ShippingForm"  className="text-white text-decoration-none">   Checkout </Link></button>
</div>

</>: <><h2>Your Cart is empty</h2></>} </>
  )
}
