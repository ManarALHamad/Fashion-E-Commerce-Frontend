import Nav from "./components/Nav"
import SignUpForm from "./pages/SignUpForm"
import './App.css'
import { Routes, Route, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import SignInForm from "./pages/SignInForm"
import Home from "./pages/Home"
import ProductForm from "./pages/admin/ProductForm"
import * as productService from './services/productService'
import AdminProducts from "./pages/admin/AdminProducts"
import ProductDetails from "./pages/admin/ProductDetails"


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
        <Route path="/admin/products/:productId/edit" element={<ProductForm />}/>
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/:productId" element={<ProductDetails />} />
      </Routes>
      </main>
    </div>
  )
}

export default App