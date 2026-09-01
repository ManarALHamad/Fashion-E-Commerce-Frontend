import { Link } from "react-router"
import { useState } from "react"

import black from "../assets/images/bg2.png"
import pink from "../assets/images/bg.png"
import grey from "../assets/images/bg4.png"

const Home = () => {

  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: pink,
      position: "slide-pink",
    },
    {
      image: black,
      position: "slide-black",
    },
    {
      image: grey,
      position: "slide-grey",
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

        <img
          src={slides[currentSlide].image}
          alt="N Designs Collection"
          className="hero-image"
        />

   
        <div className={`hero-content ${slides[currentSlide].position}`} >
         
          <h1 className="hero-title">
            Designed to be remembered
          </h1>

          <Link to="/products" className="shop-now-btn">
            SHOP NOW
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
            <button
              key={index}
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