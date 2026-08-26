import { Link } from "react-router"
import {
  Search,
  UserRound,
  Heart,
  ShoppingBag,
} from "lucide-react";
import logo from "../assets/images/logo.png"


const Home = () => {
  return (
    <main className="home">

      <header className="navbar">

        
        <Link to="/" className="logo">
          <img src={logo} alt="Ndesigns" className="logo-img" />
        </Link>

       
        <nav className="nav-links">
          <Link to="/new">New In</Link>
          <Link to="/dresses">Dresses</Link>
          <Link to="/abayas">Abayas</Link>
          <Link to="/sets">Sets</Link>
          <Link to="/occasions">Occasions</Link>
          <Link to="/sale">Sale</Link>
        </nav>

        
        <div className="nav-icons">
          <button aria-label="Search">
            <Search size={21} strokeWidth={1.6} />
          </button>

          <Link to="/profile">
            <UserRound size={21} strokeWidth={1.6} />
          </Link>

          <Link to="/wishlist">
            <Heart size={21} strokeWidth={1.6} />
          </Link>

          <Link to="/cart" className="cart-icon">
            <ShoppingBag size={21} strokeWidth={1.6} />
            <span className="cart-count">2</span>
          </Link>
        </div>

      </header>

    </main>
  )
}

export default Home