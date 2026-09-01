import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router"
import { index } from "../../services/productService"
import { Heart } from "lucide-react"
import * as wishlistService from "../../services/wishlistService"

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const ViewProduct = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [wishlist, setWishlist] = useState(wishlistService.getWishList())
  const [searchParams] = useSearchParams()
  const category = searchParams.get("category")



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await index()
        console.log("Products:", data)
        setProducts(data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

 const handleWishlist = (product) => {

    const isAlreadySaved = wishlist.some(
      (item) => item._id === product._id
    )

if (isAlreadySaved) {
      const updatedWishlist =
        wishlistService.removeFromWishList(product._id)

      setWishlist(updatedWishlist)
    } else {
      const updatedWishlist =
        wishlistService.addToWishList(product)

      setWishlist(updatedWishlist)
    }
  }

  if (loading) {
    return <div className="loader-container"><span className="loader"></span></div>
  }

  const filteredProducts = category ?

     products.filter((product) => product.category === category):products

  








  return (
    <div className="products-page">

      <h1>Shop All Products</h1>

      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (

        <div className="product-grid">

        {products.map((product) => {

              const isWishlisted = wishlist.some(
              (item) => item._id === product._id
            )

           return(

             <div
                className="product-card"
                key={product._id}
              > 

                <button className="wishlist-button" onClick={() => handleWishlist(product)}>

              <Heart size={22} fill={isWishlisted ? "currentColor" : "none"}  />
          </button>

          <Link to={`/products/${product._id}`}>

           
              {product.images?.length > 0 ? (
                <img
                  src={`${BASE_URL}${product.images[0].image}`}
                  alt={product.name}
                  className="product-card-image"
                />
              ) : (
                <div className="no-product-image">No Image</div>
              )}

              <h3>{product.name}</h3>

              {product.variants?.length > 0 && (
                <p>From {product.variants[0].price} BHD</p>
              )}

           </Link>

              </div>
            )
          })}

        </div>
      )}

    </div>
  )
}

export default ViewProduct