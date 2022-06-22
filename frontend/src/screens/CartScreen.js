import React,{useEffect,} from 'react'
import {useDispatch,useSelector} from "react-redux"
import Message from "../components/Message"
import {Link,useNavigate,useParams,useLocation} from "react-router-dom"
import {Row,Col,ListGroup,Image,Form,Button,Card} from "react-bootstrap"
import {addToCart} from "../actions/cartAction"

const CartScreen = () => {
  const productId=useParams().id
  const navigate = useNavigate()
  const search = useLocation().search

  const qty = search ? Number(search.split("=")[1]):1
  const dispatch = useDispatch()
  const cart = useSelector(state=>state.cart )
  const {cartItems} = cart
  console.log(cartItems)
  
  useEffect(()=>{
    if(productId){
      dispatch(addToCart(productId,qty))
    }
  },[dispatch,productId,qty])

  return (
    <>
    <div>CartScreen</div>
    </>
  )
}

export default CartScreen