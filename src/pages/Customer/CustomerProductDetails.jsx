import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { show } from '../../services/productService'

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const CustomerProductDetails = () => {
const { productId } = useParams
const [product, setProduct] = useState(null)
const [loading, setLoading] = useState(true)

    return <main>Customer Details</main>
}

export default CustomerProductDetails