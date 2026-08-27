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

  if (loading) {
    return <p>Loading products...</p>
  }

  return (
    <div className="products-page">
      <h1>Shop All Products</h1>

      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <Link
              to={`/products/${product._id}`}
              className="product-card"
              key={product._id}
            >
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
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewProduct