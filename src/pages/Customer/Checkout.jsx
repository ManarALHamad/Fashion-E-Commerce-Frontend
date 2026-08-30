// import { useState } from "react"
// import { getCart, clearCart } from "../../services/cartService"
// import { create } from "../../services/orderService"

// const Checkout = () => {

//     const navigate = useNavigate()
//     const [cart] = useState(getCart())
//     const [submitting, setSubmitting] = useState(false)
//     const [error, setError] = useState("")
//     const [success, setSuccess] = useState("")

//     const [formData, setFormData] = useState({

//         customer_name: "",
//         customer_email: "",
//         customer_phone: "",
//         delivery_address: "",
//         payment_method: "cod",
//     })

//     const totalPrice = cart.reduce((total, item) => {
//         return total + Number(item.price) * item.quantity
//     }, 0)

//      const handleChange = (event) => {
//       setFormData({ ...formData, [event.target.name]: event.target.value })
//      }

//      const handleSubmit = async (event) =>{

//         event.preventDefault()
//         setError("")
//         setSubmitting(true)
     

//      const items = cart.map((item) => ({
//         product: item.productId,
//         variant: item.variantId,
//         quantity: item.quantity,
//         unit_price: item.price,
//      }))

//       try {

//       const order = await create({ ...formData, items })

//       if (order?.err) {
//         setError(order.err)
//         return
//       }

//       clearCart()

//       setSuccess("Order submitted successfully!")
//     } 
    
    
//     catch (err) {

//       console.log(err)


//     } 
//   }

//     if (cart.length === 0) {
//     return (
//       <div>
//         <h1>Checkout</h1>
//         <p>Your cart is empty.</p>
//       </div>
//     )
//   }



    
//      return (

       
//           <div>
//       <h1>Checkout</h1>

//       <form onSubmit={handleSubmit}>

//         <label>Full Name:</label>

//         <input type="text" id="customer_name" name="customer_name" value={formData.customer_name}  onChange={handleChange} required />

//         <label>Email:</label>

//         <input type="email" id="customer_email" name="customer_email" value={formData.customer_email} onChange={handleChange} required />

//         <label>Phone:</label>

//         <input type="tel" id="customer_phone" name="customer_phone" value={formData.customer_phone} onChange={handleChange} required />

//         <label>Delivery Address</label>

//         <textarea id="delivery_address" name="delivery_address" value={formData.delivery_address} onChange={handleChange} required />

//         <label>Payment Method</label>

//         <select id="payment_method" name="payment_method" value={formData.payment_method} onChange={handleChange}>

//         <option value="cod">Cash on Delivery</option>
//         <option value="online">Online Payment</option>


//         </select>

//         <h2>Order Total: {totalPrice.toFixed(3)} BHD</h2>

//         {error && <p className="error-message">{error}</p>}
//         {success && <p className="success-message">{success}</p>}

//         <button type="submit" disabled={submitting}>
//   {submitting ? "Submitting..." : "Submit Order"}
// </button>

    
//      </form>
//      </div>

//      )




// }
// export default Checkout