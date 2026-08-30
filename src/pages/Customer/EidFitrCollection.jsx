import { useState, useEffect } from "react"
import { index as indexProducts } from "../../services/productService"
import { index as indexSubcategories } from "../../services/subcategoryService"
import { Link } from "react-router"

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const EidFitrCollection = () => {
const [loading, setLoading] = useState(true)
const [products, setProducts] = useState([])

useEffect(() => {
const fetchData = async () => {
const subcategories = await indexSubcategories()
const allProducts = await indexProducts()
    
const eidFitrSubcategory = subcategories.find((subcategories) => subcategories.name === "eid_fitr")

if (eidFitrSubcategory) {
const filtered = allProducts.filter(
(product) => String(product.sub_category) === String(eidFitrSubcategory._id)
)
 setProducts(filtered)
}


setLoading(false)
}

fetchData()}, [])

if (loading) return <div className="loader-container"><span className="loader"></span></div>
if (products.length === 0) return <p>No products in this collection yet.</p>

return (
<div className="products-page">
<h1> Eid AlFitr Collection</h1>
<div className="product-grid">
 {products.map((product) => (
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
))}
</div>
    </div>
)
}

export default EidFitrCollection