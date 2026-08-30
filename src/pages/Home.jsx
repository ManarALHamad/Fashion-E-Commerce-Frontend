import { Link } from "react-router"
import { useEffect, useState } from "react"

import logo from "../assets/images/logo.png"
import ViewProduct from "./Customer/ViewProduct"
import { getCart } from "../services/cartService"


const Home = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const [cart, setCart] = useState(getCart())

    const cartCount = cart.reduce((total, item) => {
      return total + item.quantity
    }, 0)

    useEffect (() => {

        const fetchProducts = async () =>{

            try {
                const data = await index()
                setProducts(data)
                
            } catch (error) {
                console.log(error)
            }
        }

        fetchProducts()


    }, [])






  return (
    <main className="home">

      <ViewProduct />

    </main>
  )
}

export default Home