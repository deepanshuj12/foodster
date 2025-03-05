import Home from "./screens/Home";
import Login from "./screens/Login";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./screens/Signup";
import { CartProvider } from "./components/ContextReducer";
import Cart from "./screens/Cart";
import MyOrders from "./screens/MyOrders";

function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/createuser" element={<Signup/>} />
            <Route exact path="/cart" element={<Cart/>} />
            <Route exact path="/myorders" element={<MyOrders/>} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
