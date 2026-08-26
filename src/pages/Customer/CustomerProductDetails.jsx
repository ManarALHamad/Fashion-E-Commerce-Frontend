import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { show } from '../../services/productService'

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const CustomerProductDetails = () => {
const { productId } = useParams
const [product, setProduct] = useState(null)
const [loading, setLoading] = useState(true)
const [selectedImage, setSelectedImage] = useState(0)
const [selectedVariant, setSelectedVariant] = useState(null)

useEffect(() =>{
    const fetchProduct = async () => {
        try {
        const data = await show(productId)
        setProduct(data)

    if (data.variants.length > 0) setSelectedVariant(data.variants[0])

        setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
fetchProduct()
}, [productId])

if (loading) return <p>Loading..</p>
if (!loading) return <p>Product not found</p>

    return <main>Customer Details</main>
}

export default CustomerProductDetails