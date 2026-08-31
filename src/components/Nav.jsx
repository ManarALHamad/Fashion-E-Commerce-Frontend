import { Link } from "react-router"
import { useState } from 'react';
import {
  UserRound,
  Heart,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

import { getCart } from "../services/cartService"



const Nav = (props) => {
    const [cart, setCart] = useState(getCart())
    const [collectionsOpen, setCollectionsOpen] = useState(false)


    const cartCount = cart.reduce((total, item) => {
      return total + item.quantity
    }, 0)

    const handleSignOut = () => {
        localStorage.removeItem('token')
        props.setUser(null)
    }

    return (
    <>
        <header className="header"> <span>ndesigns stitched with elegance</span></header>
        <nav className="navBar">
            <Link className="nav-brand" to="/"><img src="/src/assets/images/logo.png" alt="Ndesigns" className="logo-img" /></Link>
            <div className="nav-dropdown">
                <button className="nav-dropdown-title" onClick={() => setCollectionsOpen(!collectionsOpen)}>{collectionsOpen ? (<>Collections <ChevronUp size={14} strokeWidth={2}/></>):(<>Collections <ChevronDown size={14} strokeWidth={2}/></>)}</button>
                {collectionsOpen ? (
          <ul className="nav-dropdown-menu">
            <li>
              <Link to="/new">New Collection</Link>
            </li>

            <li>
              <Link to="/ramadan">Ramadan Collection</Link>
            </li>

            <li>
              <Link to="/eid_fitr">Eid Al Fitr Collection</Link>
            </li>

            <li>
              <Link to="/winter">Winter Collection</Link>
            </li>

            <li>
              <Link to="/eid_adha">Eid Al Adha Collection</Link>
            </li>
          </ul>
        ): false}

      </div>

            { props.user ? (
                <ul className="nav-list">
    
                <div className="nav-icons">
                    <li>
                        <Link to="/about_us">About Us</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/profile"> <UserRound size={21} strokeWidth={1.6}/></Link>
                    </li>
                    <li>
                        <Link to="/wishlist"><Heart size={21} strokeWidth={1.6}/></Link>
                    </li>
                    <li>
                        <Link to="/cart" className="cart-icon"><ShoppingBag size={21} strokeWidth={1.6} /><span className="cart-count">{cartCount}</span></Link>                    
                    </li>
                </div>
                    <li>
                        <Link to="/" onClick={handleSignOut} className="sign-out"> Sign Out</Link>
                    </li> 
                
                </ul>
            ) : (
            <ul className="nav-list">
                <div className="nav-icons">
                    <li>
                        <Link to="/about_us">About Us</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/wishlist"><Heart size={21} strokeWidth={1.6}/></Link>
                    </li>
                    <li>
                        <Link to="/cart" className="cart-icon"><ShoppingBag size={21} strokeWidth={1.6} /><span className="cart-count">{cartCount}</span></Link>                    
                    </li>
                </div>
                <li>
                    <Link to='/auth/sign-up' className="sign-out">Sign Up</Link>
                </li>
                <li>
                    <Link to='/auth/sign-in' className="sign-out">Sign In</Link>
                </li>
            </ul>
            ) }

        </nav>
    </>
    )
}

export default Nav