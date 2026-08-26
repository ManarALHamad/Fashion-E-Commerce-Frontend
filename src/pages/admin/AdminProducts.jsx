
//view products to the admin dashboard
import { useEffect, useState } from "react"
import { Link } from "react-router"

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/products`)

        if (!res.ok) {
          throw new Error("Failed to fetch products")
        }

        const data = await res.json()

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
    <div className="admin-products-page">
      <div className="admin-products-header">
        <h1>Products</h1>

        <Link to="/admin/products/new">
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <div className="admin-products-grid">

          {products.map((product) => (
            <div
              className="admin-product-card"
              key={product._id}
            >

      

              {product.images?.length > 0 ? (
                <img
                  src={`${BASE_URL}${product.images[0].image}`}
                  alt={product.name}
                  className="admin-product-image"
                  style={{ width: "120px", height: "150px", objectFit: "cover" }}
                />
              ) : (
                <div className="no-product-image">
                  No Image
                </div>
              )}

             

              <h3>{product.name}</h3>

              <p>
                {product.description}
              </p>

              <p>
                Status:{" "}
                {product.in_stock ? "In Stock" : "Out of Stock"}
              </p>

  
  

              <div>
                <strong>Sizes:</strong>

                {product.variants?.length > 0 ? (
                  product.variants.map((variant) => (
                    <div key={variant._id}>
                      {variant.size} — {variant.price} BHD
                      {" "}({variant.inventory} available)
                    </div>
                  ))
                ) : (
                  <p>No sizes</p>
                )}
              </div>

            

              <div className="product-actions">

                <Link to={`/admin/products/${product._id}`} > View</Link>
                  
        
                <Link to={`/admin/products/${product._id}/edit`}> Edit </Link>
                  
                
      
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  )
}

export default AdminProducts