import { useParams } from "react-router"
import { useState, useEffect } from "react"
import { show } from "../../services/productService"

const ViewProduct = () => {
const { id } = useParams()
const [product, setProduct] = useState(null)
const [loading, setLoading] = useState(true)

useEffect(() => {
const fetchProduct = async () => {
const data = await show(id)
    setProduct(data)
    setLoading(false)
}
    fetchProduct()
}, [id])

return (
    <section>
     <p>Product ID: {id}</p>
    </section>
    )
}

export default ViewProduct