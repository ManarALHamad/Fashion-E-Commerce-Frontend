import { useState, useEffect } from "react"
import { index as indexProducts } from "../../services/productService"
import { index as indexSubcategories } from "../../services/subcategoryService"

const NewCollection = () => {
const [loading, setLoading] = useState(true)

useEffect(() => {
const fetchData = async () => {
const subcategories = await indexSubcategories()
const products = await indexProducts()
    console.log("First subcategory:", subcategories[0])
    console.log("First product:", products[0])
setLoading(false)
}

fetchData()}, [])

if (loading) return <p>Loading...</p>

    return <p>console.log</p>
}

export default NewCollection