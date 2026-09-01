const getCart = () => {
    console.log('getting cart')
  const savedCart = localStorage.getItem("cart")
  return savedCart ? JSON.parse(savedCart) : []
}

const addToCart = (item) => {
  const cart = getCart()

  const existingItem = cart.find(
    (cartItem) => cartItem.variantId === item.variantId
  )
  if (existingItem) {
    existingItem.quantity += 1
    
  } else {
    cart.push(item)
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  return cart
}

const removeFromCart = (variantId) => {
  const cart = getCart()
  const existingItem = cart.find(
    (cartItem) => cartItem.variantId === variantId
  )
  if (!existingItem){
    return cart
  }

  let updatedCart

  if (existingItem.quantity > 1) {
    updatedCart = cart.map((cartItem) => {

      if (cartItem.variantId === variantId) {
        return {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        }
      }

      return cartItem
    })

  } else {

    updatedCart = cart.filter(
      (cartItem) => cartItem.variantId !== variantId
    )
  }

  localStorage.setItem("cart", JSON.stringify(updatedCart))
  return updatedCart
}

const clearCart = () => {
   
  localStorage.removeItem("cart")
  return[]

}



export { 
  getCart, 
  addToCart, 
  removeFromCart,
  clearCart,
}