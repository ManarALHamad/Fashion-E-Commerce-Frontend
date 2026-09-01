import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router"
import { show } from "../../services/productService"
import { addToCart } from "../../services/cartService"

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const CustomerProductDetails = (props) => {
  const { productId } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await show(productId)
        setProduct(data)

        if (data?.variants?.length > 0) {
          setSelectedVariant(data.variants[0])
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleAddToCart = () => {
    if (!selectedVariant || selectedVariant.inventory === 0) return

    addToCart({
      productId: product._id,
      productName: product.name,
      variantId: selectedVariant._id,
      size: selectedVariant.size,
      price: selectedVariant.price,
      quantity: 1,
      image: product.images?.[0]?.image
    })

   props.setUpdateCart(!props.updateCart)
  }

  if (loading) return <div className="loader-container"><span className="loader"></span></div>
  if (!product) return <p>Product not found.</p>

  return (
    <div className="product-details-page">
      <Link to="/products">← Back to Products</Link>

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
          <div className="no-product-image">No images available</div>
        )}
      </div>

      <div className="product-details-info">
        <h3>Description</h3>
        <p>{product.description}</p>

        <h3>Select Size</h3>

        {product.variants?.length > 0 ? (
          product.variants.map((variant) => (
            <button 
              key={variant._id}
              disabled={variant.inventory === 0}
              className={
                selectedVariant?._id === variant._id ? "active-size" : ""
              }
              onClick={() => setSelectedVariant(variant)}
            >
              {variant.size} - {variant.price} BHD
            </button>
          ))
        ) : (
          <p>No sizes available.</p>
        )}

        {selectedVariant && (
          <div className="product-variant">
            <p>Price: {selectedVariant.price} BHD</p>
            <p>
              {selectedVariant.inventory > 0
                ? `In Stock (${selectedVariant.inventory} left)`
                : "Out of Stock"}
            </p>
            <button
              disabled={selectedVariant.inventory === 0}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomerProductDetails