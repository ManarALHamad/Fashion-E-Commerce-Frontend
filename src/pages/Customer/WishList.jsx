import { useState } from "react"
import { Link } from "react-router"
import { Heart } from "lucide-react"

import * as wishlistService from "../../services/wishlistService"


const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const WishList = () => {


  const [wishlist, setWishlist] = useState(wishlistService.getWishList())
    
  

  const handleRemove = (productId) => {
    const updatedWishlist =
      wishlistService.removeFromWishList(productId)

    setWishlist(updatedWishlist)
  }

  return (
    <div className="wishlist-page">

      <h1>My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="product-grid">

          {wishlist.map((product) => (
            <div
              className="product-card"
              key={product._id}
            >

              <button className="wishlist-button"onClick={() => handleRemove(product._id)}>
               
                <Heart size={22} fill="currentColor" />
                
              </button>

              <Link to={`/products/${product._id}`}>

                {product.images?.[0] && (
                  <img
                    src={`${BASE_URL}${product.images[0].image}`}
                    alt={product.name}
                    className="product-card-image"
                  />
                )}

                <h3>{product.name}</h3>

                {product.variants?.length > 0 && (
                  <p>
                    From {product.variants[0].price} BHD
                  </p>
                )}

              </Link>

            </div>
          ))}

        </div>
      )}

    </div>
  )
}

export default WishList