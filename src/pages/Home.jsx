import { Link } from "react-router"
import { useEffect, useState } from "react"

import {
  Search,
  UserRound,
  Heart,
  ShoppingBag,
} from "lucide-react"

import logo from "../assets/images/logo.png"
import { index} from "../services/productService"


const Home = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

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

      <header className="navbar">

   
        
        <Link to="/" className="logo">
          <img src={logo} alt="Ndesigns" className="logo-img" />
        </Link>

       
        <nav className="nav-links">
          <Link to="/new">New Collection</Link>
          <Link to="/ramadan">Ramadan Collection</Link>
          <Link to="/eid_fitr">Eid AlFitr Collection</Link>
          <Link to="/winter">Winter Collection</Link>
          <Link to="/eid_adha">Eid AlAdha Collection</Link>
          <Link to="/sale">Sale</Link>
        </nav>

        
        <div className="nav-icons">
          <button aria-label="Search">
            <Search size={21} strokeWidth={1.6} />
          </button>

          <Link to="/profile">
            <UserRound size={21} strokeWidth={1.6} />
          </Link>

          <Link to="/wishlist">
            <Heart size={21} strokeWidth={1.6} />
          </Link>

          <Link to="/cart" className="cart-icon">
            <ShoppingBag size={21} strokeWidth={1.6} />
            <span className="cart-count">2</span>
          </Link>
        </div>

      </header>

      <section className="product-section">


        <h1>All</h1>

      {loading ? (

          <p>Loading products...</p>
          
        ) : (
          <div className="products-grid">

            {products.map((product) => (

              <Link
                to={`/products/${product._id}`}
                key={product._id}
                className="product-card"
              >

                {product.images?.[0] && (
                  <img
                    src={`${import.meta.env.VITE_BACK_END_SERVER_URL}${product.images[0].image}`}
                    alt={product.name}
                    className="product-image"
                  />
                )}

                <div className="product-info">

                  <h2>{product.name}</h2>

                  {product.variants?.[0] && (
                    <p>
                      {product.variants[0].price} BHD
                    </p>
                  )}

                </div>

              </Link>

            ))}

          </div>
        )}




      </section>








    </main>
  )
}

export default Home