const getCart = () => {
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
}

const removeFromCart = (variantId) => {
  const cart = getCart()
  const updatedCart = cart.filter(item => item.variantId !== variantId)
  localStorage.setItem("cart", JSON.stringify(updatedCart))
  window.location.reload()
}

export { getCart, addToCart, removeFromCart}