import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { show } from '../../services/productService'
import { addToCart } from "../../services/cartService"

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const CustomerProductDetails = () => {
const { productId } = useParams()
const [product, setProduct] = useState(null)
const [loading, setLoading] = useState(true)
const [selectedImage, setSelectedImage] = useState(0)
const [selectedVariant, setSelectedVariant] = useState(null)
const [quantity, setQuantity] = useState(1)

useEffect(() =>{
    const fetchProduct = async () => {
        try {
        const data = await show(productId)
        setProduct(data)

    if (data?.variants?.length > 0) setSelectedVariant(data.variants[0])

        setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
fetchProduct()
}, [productId])

const handleAddToCart = () => {
    if (!selectedVariant || selectedVariant.inventory === 0)
return 
     addToCart({
    productId: product._id,
    productName: product.name,
    variantId: selectedVariant._id,
    size: selectedVariant.size,
    price: selectedVariant.price,
    quantity: 1,
  })

  console.log(`Added ${product.name} (${selectedVariant.size}) to cart!`)
}


if (loading) return <p>Loading..</p>
if (!product) return <p>Product not found</p>

return (
<div>
    <h1>{product.name}</h1>

<div className="product-images">
{product.images?.length > 0 ? (
product.images.map((image) => (
<img key={image._id}
    src={`${BASE_URL}${image.image}`}/>
))
) : (
<p>No images available</p>
)}
</div>

<p>{product.description}</p>

<h3>Select Size</h3>
<div>
{product.variants?.map((variant) => (
<button key={variant._id}
disabled={variant.inventory === 0}
className={selectedVariant?._id === variant._id ? "active-size" : ""}
onClick={() => setSelectedVariant(variant)}>{variant.size}
</button>
))}
</div>

{selectedVariant && (
<div>
    <p>Price: {selectedVariant.price} BHD</p>
<p>{selectedVariant.inventory > 0 
? `In Stock (${selectedVariant.inventory} left)`: "Out of Stock"}</p>
<button disabled={selectedVariant.inventory === 0} onClick={handleAddToCart}>Add to Cart
</button>
    </div>
)}
</div>
)

}

export default CustomerProductDetails