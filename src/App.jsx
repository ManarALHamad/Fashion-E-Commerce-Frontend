import Nav from "./components/Nav"
import SignUpForm from "./pages/SignUpForm"
import './App.css'
import { Routes, Route, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import SignInForm from "./pages/SignInForm"
import Home from "./pages/Home"
import ProductForm from "./pages/admin/ProductForm"
import ViewProduct from "./pages/Customer/ViewProduct"
import * as productService from './services/productService'
import AdminProducts from "./pages/admin/AdminProducts"
import ProductDetails from "./pages/admin/ProductDetails"
import CustomerProductDetails from "./pages/Customer/CustomerProductDetails"
import ProductEdit from "./pages/admin/ProductEdit"
import Cart from "./pages/Customer/Cart"
import WishList from "./pages/Customer/WishList"
import Checkout from "./pages/Customer/Checkout"
import Contact from "./pages/Contact"
import AboutUs from "./pages/About"
import AdminOrders from "./pages/admin/AdminOrders"
import Profile from "./pages/Customer/Profile"
import AdminDashboard from "./pages/admin/AdminDashboard"
import Collections from "./pages/Customer/Collections"
// import Footer from "./components/Footer"

const getUserFromToken = () => {

  const token = localStorage.getItem('token')

  if (!token) return null

  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {
  
  const navigate = useNavigate()

  const [user, setUser] = useState(getUserFromToken())
  const [products, setProducts] = useState([])
  const [updateCart, setUpdateCart] = useState(false)

  useEffect(() => {
    const fetchAllProducts = async(formData) => {
      const productsData = await productService.index()
      setProducts(productsData)
    }
    if (user) fetchAllProducts()
  }, [user])

  const handleAddProduct = async (formData) => {
    
  }
  
  return (
    <div>
      <Nav user={user} setUser={setUser} updateCart={updateCart} />
      <main className="app-main">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/auth/sign-up' element={<SignUpForm setUser={setUser} />} />
        <Route path='/auth/sign-in' element={<SignInForm setUser={setUser} />} />
        <Route path="/admin/products/new" element={<ProductForm />} />
        <Route path="/admin/products/:productId/edit" element={<ProductEdit />}/>
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/:productId" element={<ProductDetails />} />
        <Route path="/products" element={<ViewProduct />} />
        <Route path="products/:productId" element={<CustomerProductDetails updateCart={updateCart} setUpdateCart={setUpdateCart} /> } />
        <Route path="/cart" element={<Cart />}/>
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin" element={<AdminDashboard/>}/>

        <Route path="/about_us" element={<AboutUs/>}/>
        <Route path="/contact" element={<Contact/>} />
        <Route path="/profile" element={<Profile user={user} />}  />

      </Routes>

      {/* <Footer /> */}
      </main>
    </div>
  ) 
}

export default App