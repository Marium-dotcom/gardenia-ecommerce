import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Reset from './components/Auth/Reset'
import Cart from './components/Cart/Cart.jsx'
import {Contact} from './components/Contact/Contact.jsx'
import Home from './components/Home/Home.jsx'
import Products from './components/Home/Products/Products.jsx'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login.jsx'
import Admin from './components/Admin/Admin.jsx';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'font-awesome/css/font-awesome.min.css'; //import in react app
import AddProduct from './components/Admin/AddProduct'
import ViewOrderStatus from './components/Admin/ViewOrderStatus.jsx'
import './App.css';
import ViewProducts from './components/Admin/ViewProducts';
import Search from './components/Home/Search/Search'
import Checkout from './components/Checkout/Checkout'
import ProductDetail from './components/Home/Products/ProductDetail'
import ShippingForm from './components/Checkout/ShippingForm'
import ConfirmOrder from './components/Checkout/ConfirmOrder'
import PrevOrders from './components/previousOrders/PrevOrders'
import ProductRating from './components/ProductRating/ProductRating'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import OrderData from './components/Admin/OrderData'
import AdminRoutes from './HideRoutes/AdminRoutes'
import PageNotFount from './components/PageNotFount'


function App() {
  return (

    <div className="App">
<BrowserRouter>
<Routes>
    <Route path="/" element={<Home/>} />
    <Route path= "products" element={<Products/>}/>
    <Route path= "/product/details/:idParam" element={<ProductDetail/>}/>
    <Route path="search" element={<Search/>}/>
    <Route path="/cart" element={<Cart/>} />
    <Route path="cart/ShippingForm" element={<ShippingForm/>} />
    <Route path="cart/ShippingForm/Checkout" element={<Checkout/>} />
    <Route path="cart/ShippingForm/Checkout/ConfirmOrder" element={<ConfirmOrder/>} />
    <Route path="/ProductRating/:idParam" element={<ProductRating/>} />
    <Route path="/PrevOrders" element={<PrevOrders/>} />
    <Route path="/contact" element={<Contact/>} />
    <Route path="register" element={<Register/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="reset" element={<Reset/>} />
    <Route path="*" element={<PageNotFount/>} />

 
      
     <Route path="/Admin" element={<AdminRoutes><Admin/></AdminRoutes>} />
    <Route path="/Admin/AddProduct/:idParam" element={<AdminRoutes><AddProduct/></AdminRoutes>} />
    <Route path="/Admin/ViewOrderStatus" element={<AdminRoutes><ViewOrderStatus/></AdminRoutes>} />
    <Route path="/Admin/ViewProducts" element={<AdminRoutes><ViewProducts/></AdminRoutes>}></Route>
    <Route path="/Admin/ViewOrderStatus/OrderData/:idParam" element={<AdminRoutes><OrderData/></AdminRoutes>} />

</Routes>
</BrowserRouter>
    

    </div>
    
  );
}

export default App;
