import { useEffect, useState } from "react"
import { indexAll, deleteOrder } from "../../services/orderService"

const AdminOrders = () => {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await indexAll()

        console.log("ADMIN ORDERS:", data)

        if (Array.isArray(data)) {
          setOrders(data)
        } else {
          console.log("Orders response is not an array:", data)
          setError("Could not load orders.")
        }
      } catch (error) {
        console.log("ADMIN ORDER ERROR:", error)
        setError("Could not load orders.")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const handleDelete = async (orderId) => {
  try {
    await deleteOrder(orderId)

    setOrders((currentOrders) =>
      currentOrders.filter((order) => order._id !== orderId)
    )
  } catch (error) {
    console.log("DELETE ORDER ERROR:", error)
  }
}


  if (loading) {
    return <p>Loading orders...</p>
  }

  if (error) {
    return <p>{error}</p>
  }


  return (
    <div className="admin-orders">
      <h1>Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th> 
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Payment</th>
              <th>Total</th>
              <th>Date</th>
              <th>Action</th>

            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>#{order._id}</td>

                <td>{order.customer_name}</td>

                <td>{order.customer_email}</td>

                <td>{order.customer_phone}</td>

                <td>{order.delivery_address}</td>

                <td>{order.payment_method}</td>

                <td>
                  {Number(order.total_price || 0).toFixed(3)} BHD
                </td>

                <td>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td>
  <button onClick={() => handleDelete(order._id)}>
    Delete
  </button>
</td>
</tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminOrders