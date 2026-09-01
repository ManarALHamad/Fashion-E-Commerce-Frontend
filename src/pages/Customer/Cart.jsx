import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { getCart, removeFromCart, addToCart } from "../../services/cartService"
import { Trash2, Plus, Minus } from 'lucide-react';
// import Checkout from "./Checkout"




const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const Cart = () => {

  const navigate = useNavigate()

  const [cart, setCart] = useState(getCart())

  const handleRemove = (variantId) => {
    const updatedCart = removeFromCart(variantId)
    setCart(updatedCart)
  }
  const handleAdd = (item) => {
    const updatedCart = addToCart(item)
    setCart(updatedCart)
  }

  const handleCheckout = () => {

    const token = localStorage.getItem("token")

    if(!token) {

      navigate("/auth/sign-in", { state: { from: "/checkout" } })
      return
    }

    navigate("/checkout")
  }



  const totalPrice = cart.reduce((total, item) => {
    return total + Number(item.price) * item.quantity
  }, 0)


  if (cart.length === 0) {
    return (
      <div>
        <h1>Cart</h1>

        <p>Your cart is empty.</p>
      </div>
    )
  }


  return (
    <div className="card cart">
      <div className="title">Your Cart</div>

      {/* Item List */}
      <div className="products">
        {cart.map((item) => (
          <div className="product" key={item.variantId}>
            {/* Image */}
            {item.image && (
              <Link to={`/products/${item.productId}`}>
                <img src={`${BASE_URL}${item.image}`} alt={item.productName} />
              </Link>
            )}

            {/* Title & Size */}
            <div>
              <span>{item.productName}</span>
              <p>Size: {item.size}</p>
            </div>

            {/* Counter */}
            <div className="quantity">
              <button onClick={() => handleRemove(item.variantId)}>
                {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
              </button>
              <label>{item.quantity}</label>
              <button onClick={() => handleAdd(item)}>
                <Plus size={14} />
              </button>
            </div>

            {/* Price */}
            <div className="price small">
              {(Number(item.price) * item.quantity).toFixed(3)} <sup>BHD</sup>
            </div>
          </div>
        ))}
      </div>

      {/* Footer & Checkout */}
      <div className="checkout--footer">
        <div className="price">
          {totalPrice.toFixed(3)} <sup>BHD</sup>
        </div>

      ))}

      <hr />

      <h2>
        Cart Total: {totalPrice.toFixed(3)} BHD
      </h2>

      <button onClick={handleCheckout}>

      Proceed to Checkout

      </button>

    </div>
  )
}

export default Cart