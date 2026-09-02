import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router"
import { index as indexProducts } from "../../services/productService"
import { index as indexSubcategories } from "../../services/subcategoryService"
import { Heart } from "lucide-react"
import * as wishlistService from "../../services/wishlistService"

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const Collections = () => {

  const [products, setProducts] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [wishlist, setWishlist] = useState(wishlistService.getWishList())
  const [searchParams] = useSearchParams()
  const collection = searchParams.get("collection")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await indexProducts()
        const subcategoriesData = await indexSubcategories()
        console.log("Products:", productsData)
        setProducts(productsData)
        setSubcategories(subcategoriesData)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleWishlist = (product) => {

    const isAlreadySaved = wishlist.some(
      (item) => item._id === product._id
    )

    if (isAlreadySaved) {
      const updatedWishlist =
        wishlistService.removeFromWishList(product._id)

      setWishlist(updatedWishlist)
    } else {
      const updatedWishlist =
        wishlistService.addToWishList(product)

      setWishlist(updatedWishlist)
    }
  }

  if (loading) {
    return <div className="loader-container"><span className="loader"></span></div>
  }

  const matchingSubcategoryIds = collection
    ? subcategories
        .filter((sub) => sub.name === collection)
        .map((sub) => String(sub._id))
    : []

  const filteredProducts = collection
    ? products.filter((product) =>
        matchingSubcategoryIds.includes(String(product.sub_category))
      )
    : products

  const collectionTitles = {
    new: "New Collection",
    ramadan: "Ramadan Collection",
    eid_fitr: "Eid Al Fitr Collection",
    winter: "Winter Collection",
    eid_adha: "Eid Al Adha Collection",
  }

  return (
    <div className="products-page">

      <h1>
        {collection ? collectionTitles[collection] : "Shop All Products"}
      </h1>

      {filteredProducts.length === 0 ? (
        <p>No products yet.</p>
      ) : (

        <div className="product-grid">

        {filteredProducts.map((product) => {

              const isWishlisted = wishlist.some(
              (item) => item._id === product._id
            )

           return(

             <div
                className="product-card"
                key={product._id}
              > 

                <button className="wishlist-button" onClick={() => handleWishlist(product)}>

              <Heart size={22} fill={isWishlisted ? "currentColor" : "none"}  />
          </button>

          <Link to={`/products/${product._id}`}>

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

              </div>
            )
          })}

        </div>
      )}

    </div>
  )
}

export default Collections