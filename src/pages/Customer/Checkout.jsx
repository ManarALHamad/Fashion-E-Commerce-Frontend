import { useState } from "react"
import { useNavigate } from "react-router"
import { getCart, clearCart } from "../../services/cartService"
import { create } from "../../services/orderService"

const Checkout = () => {
  const navigate = useNavigate()

  const [cart] = useState(getCart())
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({

    customer_name: "",
    customer_email: "",
    customer_phone: "",
    delivery_address: "",
    payment_method: "cod",

  })

  const totalPrice = cart.reduce((total, item) => {
    return total + Number(item.price) * item.quantity
  }, 0)

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError("")
    setSubmitting(true)

    const items = cart.map((item) => ({

      product: item.productId,
      variant: item.variantId,
      quantity: item.quantity,
      unit_price: item.price,

    }))

    const orderData = {
      ...formData,
      items,
    }

    try {

      const order = await create(orderData)

      clearCart()

      setSuccess("Order submitted successfully!")

    //   navigate("/products")
    } 
    catch (error) {

      console.log(error)
      
      setError("Failed to submit order.")
    } 

    finally {

      setSubmitting(false)

    }

  }

  return (
    <div className="checkout-page">

      <h1>Checkout</h1>

      <form onSubmit={handleSubmit}>

        <label>Name</label>

        <input type="text" name="customer_name" value={formData.customer_name} onChange={handleChange} required />

        <label>Email</label>

        <input type="email" name="customer_email" value={formData.customer_email} onChange={handleChange} required />
       
        <label>Phone</label>

        <input type="text" name="customer_phone" value={formData.customer_phone}  onChange={handleChange} required />
   
        <label>Delivery Address</label>

        <textarea name="delivery_address" value={formData.delivery_address} onChange={handleChange} required />
     
        <label>Payment Method</label>

        <select name="payment_method" value={formData.payment_method} onChange={handleChange} >
      
          <option value="cod">Cash on Delivery</option>
          <option value="online">Online Payment</option>
        </select>

        <h2>
          Total: {totalPrice.toFixed(3)} BHD
        </h2>

        {error && <p>{error}</p>}

        {success && (<p className="order-success">
            Order submitted successfully!💃🏻
        </p>)}

        <button type="submit" disabled={submitting || cart.length === 0}>
          {submitting ? "Placing Order..." : "Place Order"}
        </button>

      </form>

    </div>
  )
}

export default Checkout