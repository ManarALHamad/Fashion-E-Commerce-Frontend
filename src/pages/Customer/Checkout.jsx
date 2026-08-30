import { useState } from "react"
import { useNavigate } from "react-router"
import { getCart, clearCart } from "../../services/cartService"
import { create } from "../../services/orderService"

const Checkout = () => {

    const navigate = useNavigate()
    const [cart] = useState(getCart())
    const [submitting, setSubmitting] = useState(false)

    const [formData, setFormData] = useState({

        customer_name: "",
        customer_email: "",
        customer_phone: "",
        delivery_address: "",
        payment_method: "cod",
    })

     const handleChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value })
     }

     const handleSubmit = async (event) =>{

        event.preventDefault()
        setSubmitting(true)
     }

     const items = cart.map((item) => ({
        product: item.productId,
        variant: item.variantId,
        quantity: item.quantity,
        unit_price: item.price,
     }))

      try {
      const order = await create({ ...formData, items })

      if (order?.err) {
        setError(order.err)
        return
      }

      clearCart()
      navigate("/order-confirmation", { state: { order } })
    } catch (err) {
      console.log(err)
      setError("Something went wrong placing your order. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }
    if (cart.length === 0) {
    return (
      <div>
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
      </div>
    )
  }



    
     return (

       
          <div>
      <h1>Checkout</h1>

      <form onSubmit={handleSubmit}>

        <label>Full Name:</label>

        <input type="text" id="customer_name" name="customer_name" value={formData.customer_name}  onChange={handleChange} required />

        <label>Email:</label>

        <input type="email" id="customer_email" name="customer_email" value={formData.customer_email} onChange={handleChange} required />

        <label>Phone:</label>

        <input type="tel" id="customer_phone" name="customer_phone" value={formData.customer_phone} onChange={handleChange} required />

        <label>Delivery Address</label>

        <textarea id="delivery_address" name="delivery_address" value={formData.delivery_address} onChange={handleChange} required />

        <label>Payment Method</label>

        <selec id="payment_method" name="payment_method" value={formData.payment_method} onChange={handleChange}>


        </select>

        





     </form>
     </div>




     )




}
export default Checkout