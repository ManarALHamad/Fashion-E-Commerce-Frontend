import { useParams } from "react-router"
import { useState } from "react"

const ViewProduct = () => {
const { id } = useParams()
const [product, setProduct] = useState(null)
const [loading, setLoading] = useState(true)

return (
    <section>
     <p>Product ID: {id}</p>
    </section>
    )
}

export default ViewProduct