import { useState, useEffect } from "react"
import { indexMine } from "../../services/orderService"

const Profile = ({ user }) => {

    const [orders, setOrders] = useState([])

    useEffect(() => {

    const fetchOrders = async () => {

      try {

        const data = await indexMine()

        setOrders(data)

      } catch (error) {

        console.log(error)
      }
    }

    fetchOrders()
  }, [])







return (
    <div className="profile-page">

      <h1>My Profile</h1>

      <div className="profile-details">
        <h2>Account Details</h2>

        <p>
          <strong>Username:</strong> {user.username}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>
        
      </div>

      <div className="profile-orders">
        <h2>My Orders</h2>

        {orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="profile-order">

              <h3>Order #{order._id}</h3>

              <p>
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <p>
                Total: {order.total_price} BHD
              </p>

              <p>
                Payment Method: {order.payment_method}
              </p>

              <p>
                Payment Status: {order.payment_status}
              </p>

              <p>
                Delivery Address: {order.delivery_address}
              </p>

            </div>
          ))
        )}
      </div>

    </div>
  )


}

export default Profile 