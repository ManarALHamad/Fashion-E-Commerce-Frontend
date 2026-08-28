

const getWishList = () =>{

  const savedWishList = localStorage.getItem("wishlist")
  return savedWishList ? JSON.parse(savedWishList) : []
}

const addToWishList = (item) => {
  const wishlist = getWishList()

 const existingItem = wishlist.find(
  (wishlistItem) => wishlistItem._id === item._id
)

   if (!existingItem) {
    wishlist.push(item)
  }

localStorage.setItem("wishlist", JSON.stringify(wishlist))  
  return wishlist
 
}


const removeFromWishList = (productId) => {
  const wishlist = getWishList()

  const updatedWishlist = wishlist.filter(
    (item) => item._id !== productId
  )

  localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))

  return updatedWishlist
}



export {
    getWishList,
    addToWishList,
    removeFromWishList,

}