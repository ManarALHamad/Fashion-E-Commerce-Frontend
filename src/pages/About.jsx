const AboutUs = () => {
  return (
    <main className="about-page">
      <section className="about-section">

        <div className="about-left">

          <h1 className="about-title">
            About Us
          </h1>

          <div className="gold-divider">
            <span></span>
            <p>✦</p>
            <span></span>
          </div>

          <p className="about-description">
            The visual identity for ndesign is built on a singular,
            powerful monogram. I utilized the letter 'n' as the
            foundational icon, seamlessly integrating the silhouette of
            a sewing needle into its form. This fusion communicates that
            fashion is not just about aesthetics, but about construction,
            detail, and the physical act of creation. The negative space
            and sharp angles of the 'n' echo the sharpness of a needle
            and the clean lines of high-end garment design.
          </p>
        </div>

        <div className="about-right">
          <img src="/src/assets/images/lilac1.jpeg" alt="Ndesigns fashion" className="about-image" />
        </div>

      </section>
    </main>
  )
}

export default AboutUs