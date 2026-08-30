import { useState } from "react"
import { useNavigate } from "react-router"
import { getCart, clearCart } from "../../services/cartService"
import { create } from "../../services/orderService"

const Checkout = () => {

    const navigate = useNavigate()
    const [cart] = useState(getCart())





}
export default Checkout