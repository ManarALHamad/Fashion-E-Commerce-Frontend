import { useState } from "react"
import {
  getCart,
  removeFromCart,
} from "../../services/cartService"

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL


const Cart = () => {

  const [cart, setCart] = useState(getCart())


  const handleRemove = (variantId) => {

    const updatedCart = removeFromCart(variantId)

    setCart(updatedCart)
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
            <img
              src={`${BASE_URL}${item.image}`}
              alt={item.productName}
              width="150"
            />
          )}


          <h2>{item.productName}</h2>


          <p>
            Size: {item.size}
          </p>


          <p>
            Price: {item.price} BHD
          </p>


          <p>
            Quantity: {item.quantity}
          </p>


          <p>
            Total:{" "}
            {(Number(item.price) * item.quantity).toFixed(3)} BHD
          </p>


          <button
            onClick={() => handleRemove(item.variantId)}
          >
            Remove
          </button>

        </div>

      ))}


      <hr />


      <h2>
        Cart Total: {totalPrice.toFixed(3)} BHD
      </h2>

    </div>
  )
}


export default Cart