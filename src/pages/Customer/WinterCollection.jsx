import { useState, useEffect } from "react"
import { index as indexProducts } from "../../services/productService"
import { index as indexSubcategories } from "../../services/subcategoryService"
import { Link } from "react-router"
import { Heart } from "lucide-react"
import * as wishlistService from "../../services/wishlistService"



const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const WinterCollection = () => {
const [loading, setLoading] = useState(true)
const [products, setProducts] = useState([])
const [wishlist, setWishlist] = useState(wishlistService.getWishList())


useEffect(() => {
const fetchData = async () => {
const subcategories = await indexSubcategories()
const allProducts = await indexProducts()
    
const winterSubcategory = subcategories.find((subcategories) => subcategories.name === "winter")

if (winterSubcategory) {
const filtered = allProducts.filter(
(product) => String(product.sub_category) === String(winterSubcategory._id)
)
 setProducts(filtered)
}


setLoading(false)
}

fetchData()}, [])

const handleWishlist = (product) => {
const isAlreadySaved = wishlist.some((item) => item._id === product._id)

if (isAlreadySaved) {
    const updatedWishlist = wishlistService.removeFromWishList(product._id)
setWishlist(updatedWishlist)
} else {
const updatedWishlist = wishlistService.addToWishList(product)
setWishlist(updatedWishlist)
 }
}

if (loading) return <div className="loader-container"><span className="loader"></span></div>
if (products.length === 0) return <p>No products in this collection yet.</p>

return (
<div className="products-page">
<h1>Winter Collection</h1>
<div className="product-grid">
 {products.map((product) => {
const isWishlisted = wishlist.some((item) => item._id === product._id)
return (
<div className="product-card" key={product._id}>
<button className="wishlist-button" onClick={() => handleWishlist(product)}>
<Heart size={22} fill={isWishlisted ? "currentColor" : "none"} />
</button>

 <Link to={`/products/${product._id}`} className="product-card" key={product._id}>
 {product.images?.length > 0 ? (
<img className="product-card-image" 
     src={`${BASE_URL}${product.images[0].image}`} />
) : (
<div className="no-product-image">No Image</div>
)}
<h3>{product.name}</h3>
    {product.variants?.length > 0 && <p>From {product.variants[0].price} BHD</p>}
</Link>
</div>
 )
})}
</div>
    </div>
)
}


export default WinterCollection