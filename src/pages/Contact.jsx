import { Heart, ChevronRight } from "lucide-react"

const Contact = () => {
  return (
    <main className="contact-page">

      <section className="contact-section">

        <h1 className="contact-title">Contact</h1>

        <div className="contact-divider">
          <span></span>
          <p>✦</p>
          <span></span>
        </div>



        <div className="contact-buttons">

          <form
            action="https://www.instagram.com/n.designs.bh/"
            target="_blank"
          >
            <button type="submit" className="contact-btn">

              <img
                src="/src/assets/images/instagram.png"
                alt="Instagram"
                className="contact-icon"
              />

              <div className="contact-info">
                <p className="contact-platform">Instagram</p>
                <p className="contact-detail">n.designs.bh</p>
              </div>

              <ChevronRight className="contact-arrow" size={18} />

            </button>
          </form>


          <form
            action="https://wa.me/97332266677"
            target="_blank"
          >
            <button type="submit" className="contact-btn">

              <img
                src="/src/assets/images/whatsapp.png"
                alt="WhatsApp"
                className="contact-icon"
              />

              <div className="contact-info">
                <p className="contact-platform">WhatsApp</p>
                <p className="contact-detail">32266677</p>
              </div>

              <ChevronRight className="contact-arrow" size={18} />

            </button>
          </form>

        </div>


        <div className="contact-thanks">
          <Heart size={22} strokeWidth={1.5} />

          <p>
            Thank you for supporting ndesigns.
          </p>
        </div>

      </section>

    </main>
  )
}

export default Contact