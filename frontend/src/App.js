import React, { useState } from "react"
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import {Container} from "react-bootstrap"
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import Chatbox from "./components/ChatBox";

const App = () => {
  const [showBot,setShowBot] = useState(false)
  const [messages, setMessages] = useState([]);
  console.log(showBot)
  const handleBotClick = () => {
    setShowBot(prev => !prev);
    console.log("bot clicked");
  }
  return (
    <Router>
      <Header />
      <div onClick={handleBotClick}
       style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        zIndex: 10,
      }}>
        <img src="https://w7.pngwing.com/pngs/1001/63/png-transparent-internet-bot-computer-icons-chatbot-sticker-electronics-face-careobot-thumbnail.png" alt="chatbot" height="50" width="50"/>
      </div>
      {showBot && 
      <div style={{
        position: "fixed",
        bottom: "70px",
        right: "30px",
        zIndex: 10
      }}>
        <Chatbox messages={messages} setMessages={setMessages}/>
      </div>   
    }
      <main className="py-3">
        <Container> 
          <Routes>
            <Route path="/" element={<HomeScreen/>} exact />
            <Route path="/search/:keyword" element={<HomeScreen/>} exact/>
            <Route path="/page/:pageNumber" element={<HomeScreen/>} exact/>
            <Route path="search/:keyword/page/:pageNumber" element={<HomeScreen/>} exact/>
            <Route path="/order/:id" element={<OrderScreen/>}/>
            <Route path="/placeorder" element={<PlaceOrderScreen/>} />
            <Route path="/shipping" element={<ShippingScreen/>} />
            <Route path="/payment" element={<PaymentScreen/>} />
            <Route path="/login" element={<LoginScreen/>} />
            <Route path="/register" element={<RegisterScreen/>} />
            <Route path="/profile" element={<ProfileScreen/>} />
            <Route path="/product/:id" element={<ProductScreen/>} />
            <Route path="/cart/:id" element={<CartScreen/>} />
            <Route path="/admin/userlist" element={<UserListScreen/>} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen/>} />
            <Route path="/admin/productlist" element={<ProductListScreen/>} exact />
            <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen/>} exact/>
            <Route path="/admin/product/:id/edit" element={<ProductEditScreen/>} />
            <Route path="/admin/orderlist" element={<OrderListScreen/>} />
            <Route path="/cart" element={<CartScreen/>} />
            
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
