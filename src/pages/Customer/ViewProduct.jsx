import { useParams, useNavigate} from "react-router"
import { useState, useEffect } from "react"
import { show } from "../../services/productService"

const ViewProduct = () => {
const { productId } = useParams()
const [product, setProduct] = useState(null)
const [loading, setLoading] = useState(true)
const [selectedVariant, setSelectedVariant] = useState(null)
const navigate = useNavigate()


useEffect(() => {
    const fetchProduct = async () => {
    try {
        const data = await show(productId)
        setProduct(data)
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    } 
    }
    fetchProduct()
}, [productId])

if (loading) return <p>Loading ..</p>
if (!product) return <p>Product not found.</p>


return (
 <section>
{product.images?.[0] && (
    <img className="view-product-image"
    src={`${import.meta.env.VITE_BACK_END_SERVER_URL}${product.images[0].image}`}
    />
)}

    <h1>{product.name}</h1>
    <p>{product.description}</p>

    <div>
{product.variants?.map((variant) => (
<button
key={variant._id}
onClick={() => setSelectedVariant(variant)}
disabled={variant.inventory === 0}
>
{variant.size} - {variant.price} BHD
</button>
))}
</div>

<button disabled={!selectedVariant}
onClick={() => {

console.log(`Added size ${selectedVariant.size} to cart!`)
}}
>Add to Cart</button>
        </section>
    )
}

export default ViewProduct