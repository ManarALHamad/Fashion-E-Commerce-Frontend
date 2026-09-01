import { useState, useEffect } from "react"
import { indexMine } from "../../services/orderService"
import {
  UserRound,
  Mail,
  Package,
  CalendarDays,
  CreditCard,
  MapPin
} from "lucide-react"


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


return(
 <main className="profile-page">

      {/* PAGE HEADER */}
      <div className="profile-header">
        <h1>My Profile</h1>
      </div>


      <div className="profile-container">

        {/* ACCOUNT DETAILS */}
        <section className="profile-details">

          <div className="profile-avatar">
            <UserRound size={32} strokeWidth={1.5} />
          </div>

          <div className="profile-account-content">

            <span className="profile-small-title">ACCOUNT DETAILS</span>

            <h2>{user.username}</h2>

            <div className="profile-info">

              <div className="profile-info-row">
                <UserRound size={18} />
                <div>
                  <span>Username</span>
                  <p>{user.username}</p>
                </div>
              </div>

              <div className="profile-info-row">
                <Mail size={18} />
                <div>
                  <span>Email Address</span>
                  <p>{user.email}</p>
                </div>
              </div>

            </div>

          </div>

        </section>


        {/* ORDERS */}
        <section className="profile-orders">

          <div className="profile-orders-heading">
            <div>
              <span className="profile-small-title">ORDER HISTORY</span>
              <h2>My Orders</h2>
            </div>

            <span className="profile-order-count">
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </span>
          </div>


          {orders.length === 0 ? (

            <div className="profile-empty-orders">

              <div className="empty-order-icon">
                <Package size={30} strokeWidth={1.5} />
              </div>

              <h3>No orders yet</h3>

              <p>
                Your orders will appear here once you've made
                your first purchase.
              </p>

            </div>

          ) : (

            <div className="profile-orders-list">

              {orders.map((order) => (

                <article key={order._id} className="profile-order">

                  {/* ORDER TOP */}
                  <div className="profile-order-header">

                    <div>
                      <span className="profile-order-label">
                        ORDER
                      </span>

                      <h3>#{order._id}</h3>
                    </div>

                    <span
                      className={`order-status ${
                        order.payment_status === "paid"
                          ? "status-paid"
                          : "status-pending"
                      }`}
                    >
                      {order.payment_status}
                    </span>

                  </div>


                  {/* ORDER INFORMATION */}
                  <div className="profile-order-grid">

                    <div className="order-info-item">
                      <CalendarDays size={18} />

                      <div>
                        <span>Order Date</span>
                        <p>
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>


                    <div className="order-info-item">
                      <CreditCard size={18} />

                      <div>
                        <span>Payment</span>
                        <p>
                          {order.payment_method === "cod"
                            ? "Cash on Delivery"
                            : "Online Payment"}
                        </p>
                      </div>
                    </div>


                    <div className="order-info-item order-address">
                      <MapPin size={18} />

                      <div>
                        <span>Delivery Address</span>
                        <p>{order.delivery_address}</p>
                      </div>
                    </div>

                  </div>


                  {/* ORDER TOTAL */}
                  <div className="profile-order-footer">

                    <span>Order Total</span>

                    <strong>
                      {Number(order.total_price).toFixed(3)} BHD
                    </strong>

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

      </div>

    </main>
  )





}

export default Profile 