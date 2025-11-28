import "../styles/home.css";

export default function Home() {
  return (
    <section className="home" id="home">
      <header className="head">
        <div className="logo">
          <button className="logo-btn">Agrisync</button>
        </div>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About Us</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <div className="signup">
          <button className="signup-btn">Sign up</button>
        </div>
      </header>
      <div className="heroo">
        <div className="content">
          <h1 className="title">
            Fairer food,
            <br />
            From Ground to Table.
          </h1>
          <p className="description">
            Empowering farmers with a direct marketplace and giving buyers the
            story behind their food. Every purchase supports a local farm and
            comes with a verifiable journey
          </p>
        </div>
      </div>
    </section>
  );
}
