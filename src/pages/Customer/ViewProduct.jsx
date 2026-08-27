import { useEffect, useState } from "react"
import { Link } from "react-router"
import { index } from "../../services/productService"

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const ViewProduct = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await index()
        setProducts(data)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }

    fetchProducts()
  }, [])

  if (loading) return <p>Loading products...</p>
  if (products.length === 0) return <p>No products available.</p>

  return (
    <div className="product-gallery-page">
      <h1>Shop All Products</h1>

      <div className="product-grid">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="product-card"
          >
            {product.images?.length > 0 ? (
              <img
                src={`${BASE_URL}${product.images[0].image}`}
                alt={product.name}
                className="product-card-image"
              />
            ) : (
              <div className="no-product-image">No image</div>
            )}

            <h3>{product.name}</h3>

            {product.variants?.length > 0 && (
              <p>From {product.variants[0].price} BHD</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ViewProduct