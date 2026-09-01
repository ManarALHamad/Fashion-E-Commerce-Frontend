import { Link } from "react-router"
import { useState } from "react"

import black from "../assets/images/bg2.png"
import pink from "../assets/images/bg.png"
import grey from "../assets/images/bg3.png"

const Home = () => {

  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: pink,
      smallTitle: "TIMELESS ELEGANCE",
      title: "JALABIYAS",
      description:
        "Discover beautifully crafted pieces designed for every occasion.",
    },
    {
      image: grey,
      smallTitle: "NEW COLLECTION",
      title: "ELEGANCE",
      description:
        "Traditional craftsmanship designed with a modern touch.",
    },
    {
      image: black,
      smallTitle: "EXCLUSIVE COLLECTION",
      title: "STATEMENT PIECES",
      description:
        "Explore distinctive designs made to make every moment special.",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    )
  }

  const previousSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    )
  }

  return (
    <main className="home">

      <section className="hero-slider">

     
        <img src={slides[currentSlide].image} alt={slides[currentSlide].title}  className="hero-image" />
     

    
        <div className="hero-content">

          <p className="hero-small-title"> {slides[currentSlide].smallTitle}
          </p>

          <h1 className="hero-title"> {slides[currentSlide].title}
            
          </h1>

          <p className="hero-description"> {slides[currentSlide].description}
            
          </p>

          <Link to="/products" className="shop-now-btn"> SHOP NOW
           
          </Link>

        </div>

       
        <button
          className="hero-arrow hero-arrow-left"
          onClick={previousSlide}
          aria-label="Previous image"
        >
          ‹
        </button>

        
        <button
          className="hero-arrow hero-arrow-right"
          onClick={nextSlide}
          aria-label="Next image"
        >
          ›
        </button>

       
        <div className="hero-dots">

          {slides.map((slide, index) => (
            <button key={index}
              
              className={
                currentSlide === index
                  ? "hero-dot active"
                  : "hero-dot"
              }
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </section>

    </main>
  )
}

export default Home