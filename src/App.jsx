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
import NewCollection from "./pages/Customer/NewCollection"
import Cart from "./pages/Customer/Cart"
import WishList from "./pages/Customer/WishList"
import RamadanCollection from "./pages/Customer/RamadanCollection"
import EidFitrCollection from "./pages/Customer/EidFitrCollection"
import WinterCollection from "./pages/Customer/WinterCollection"
import EidAdhaCollection from "./pages/Customer/EidAdha"
import Checkout from "./pages/Customer/Checkout"
import OrderConfirmation from "./pages/Customer/OrderConfirmation"


const getUserFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState(getUserFromToken())
  const [products, setProducts] = useState([])

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
      <Nav user={user} setUser={setUser} />
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
        <Route path="products/:productId" element={<CustomerProductDetails/> } />
        <Route path="/new" element={<NewCollection />} />
        <Route path="/cart" element={<Cart />}/>
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/ramadan" element={<RamadanCollection />} />
        <Route path="/eid_fitr" element={<EidFitrCollection/>} />
        <Route path="/winter" element={<WinterCollection/>}/>
        <Route path="/eid_adha" element={ <EidAdhaCollection/> } />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
      </main>
    </div>
  ) 
}

export default App