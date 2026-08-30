
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router"

import * as productService from '../../services/productService'


const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const ProductDetails = () => {

  const { productId } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {

    const fetchProduct = async () => {
      try {

        const res = await fetch(
          `${BASE_URL}/products/${productId}`
        )

        if (!res.ok) {
          throw new Error("Failed to fetch product")
        }

        const data = await res.json()

        console.log("Product details:", data)

        setProduct(data)

      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()

  }, [productId])

  const handleDeleteProduct = async(productId) =>{
    await productService.deleteProduct(productId)
    navigate('/admin/products')
  }

  if (loading) {
    return <div className="loader-container"><span className="loader"></span></div>
  }

  if (!product) {
    return <p>Product not found.</p>
  }


  return (
    <div className="product-details-page">

      <Link to="/admin/products">
        ← Back to Products
      </Link>

      <h1>{product.name}</h1>


      <div className="product-gallery">

  {product.images?.length > 0 ? (
    <>
      
      <div className="product-thumbnails">

        {product.images.map((image, index) => (
          <img
            key={image._id}
            src={`${BASE_URL}${image.image}`}
            alt={`${product.name} ${index + 1}`}
            className={
              selectedImage === index
                ? "product-thumbnail active-thumbnail"
                : "product-thumbnail"
            }
            onClick={() => setSelectedImage(index)}
          />
        ))}

      </div>


      
      <div className="product-main-image-container">

        <img
          src={`${BASE_URL}${product.images[selectedImage].image}`}
          alt={product.name}
          className="product-main-image"
        />

      </div>
    </>
  ) : (
    <div className="no-product-image">
      No images available
    </div>
  )}

</div>

     

      <div className="product-details-info">

        <h3>Description</h3>

        <p>{product.description}</p>


        <h3>Status</h3>

        <p>
          {product.in_stock
            ? "In Stock"
            : "Out of Stock"}
        </p>


        

        <h3>Available Sizes</h3>

        {product.variants?.length > 0 ? (

          product.variants.map((variant) => (

            <div key={variant._id} className="product-variant">
              
              <p>
                Size: {variant.size}
              </p>

              <p>
                Price: {variant.price} BHD
              </p>

              <p>
                Inventory: {variant.inventory}
              </p>

            </div>

          ))

        ) : (

          <p>No sizes available.</p>

        )}

      </div>


      <Link to={`/admin/products/${product._id}/edit`}>Edit Product </Link>
      <button onClick={() => handleDeleteProduct(productId)}>Delete</button>
      

    </div>
  )
}

export default ProductDetails