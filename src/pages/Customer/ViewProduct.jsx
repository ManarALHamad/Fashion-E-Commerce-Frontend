import { useParams } from "react-router"
import { useState, useEffect } from "react"
import { index } from "../../services/productService"

const ViewProduct = () => {
const { id } = useParams()
const [product, setProduct] = useState(null)
const [loading, setLoading] = useState(true)
const [selectedVariant, setSelectedVariant] = useState(null)

useEffect(() => {
const fetchProduct = async () => {
try {
    const allProducts = await index()
const found = allProducts.find((p) => p._id === id)
    setProduct(found)
} catch (error) {
console.log(error)
} finally {
 setLoading(false)
}
}
fetchProduct()
}, [id])

if (loading) return <p>Loading ..</p>
if (!product) return <p>Product not found.</p>

return (
    <section>
    <h1>{product.name}</h1>
    <p>{product.description}</p>

<div>
    {product.variants.map((variant) => (
    <button
    key={variant._id}
    onClick={() => setSelectedVariant(variant)}
    disabled={variant.inventory === 0}>
{variant.size} - {variant.price} BHD
</button>
))}
</div>

</section>
)
}

export default ViewProduct