import { useState } from "react"
import { Link } from "react-router"
import { getCart, removeFromCart, addToCart } from "../../services/cartService"
import { Trash2, Plus, Minus } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const Cart = () => {

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

      naviage ("auth/sign-in", { state: { from: "/checkout" } })
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
    <div>

      <h1>Cart</h1>


      {cart.map((item) => (

        <div key={item.variantId}>

          {item.image && (
          <Link to={`/products/${item.productId}`}>
            <img
              src={`${BASE_URL}${item.image}`}
              alt={item.productName}
              width="150"/> 
          </Link>
          )}
       
          <Link to={`/products/${item.productId}`}>
            <h2>{item.productName}</h2>
          </Link>

          <p>
            Size: {item.size}
          </p>


          <p>
            Price: {(Number(item.price) *item.quantity).toFixed(3)} BHD
          </p>


          <p>
            Quantity: 
            {item.quantity === 1 ? (
              <button onClick={() => handleRemove(item.variantId)}>
                <Trash2 />
              </button>
              ) : (
              <button onClick={() => handleRemove(item.variantId)}>
                <Minus />
              </button>
            )}

            <span>{item.quantity}</span>
            <button onClick={() => handleAdd(item)}>
              <Plus />
            </button>
          </p>

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