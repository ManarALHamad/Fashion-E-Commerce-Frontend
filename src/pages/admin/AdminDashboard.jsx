import { useEffect, useState } from "react"
import { Link } from "react-router"
import { index as indexProducts } from "../../services/productService"
import { indexAll as indexAllOrders } from "../../services/orderService"

const AdminDashboard = () => {
const [products, setProducts] = useState([])
const [orders, setOrders] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState("")

useEffect(() => {
const fetchStats = async () => {
    try {
    const productsData = await indexProducts()
    const ordersData = await indexAllOrders()

    setProducts(productsData)
    setOrders(ordersData)
} catch (err) {
console.log(err)
setError("Failed to load dashboard data.")
} finally {
    setLoading(false)
}
}

fetchStats()
}, [])

if (loading) {
    return <div className="loader-container"><span className="loader"></span></div>}
if (error) {
    return <p>{error}</p>
}

const totalProducts = products.length
const totalOrders = orders.length
const pendingOrders = orders.filter(
(order) => order.order_status !== "delivered").length

    return (
    <div className="admin-dashboard-page">
<h1>Admin Dashboard</h1>

    <div className="admin-dashboard-stats">
    <div className="admin-stat-card">
        <h2>{totalProducts}</h2>
<p>Total Products</p>

</div>

<div className="admin-stat-card">
    <h2>{totalOrders}</h2>
    <p>Total Orders</p>
    </div>


<div className="admin-stat-card">
<h2>{pendingOrders}</h2>
<p>Pending Orders</p>
</div>
</div>

<div className="admin-dashboard-links">
    <Link to="/admin/products" className="admin-dashboard-link">
    Manage Products
</Link>{" / "}

<Link to="/admin/orders" className="admin-dashboard-link">
Manage Orders
    </Link>
</div>
    </div>
    )
}

export default AdminDashboard