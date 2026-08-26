const getCart = () => {
  const savedCart = localStorage.getItem("cart")
  return savedCart ? JSON.parse(savedCart) : []
}

const addToCart = (item) => {
  const cart = getCart()
  cart.push(item)
  localStorage.setItem("cart", JSON.stringify(cart))
}

export { getCart, addToCart }