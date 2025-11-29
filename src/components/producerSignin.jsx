import '../styles/producerSignin.css'

export default function ProducerSignin() {
  return (
    <section className="producers-one">
      <div className="signin-overlay">
        <div className="signin-card">
          <div className="signin-left">
            <h1 className="signin-title">Log in</h1>
            <form className="signin-form">
              <label className="signin-label">Username</label>
              <input
                type="text"
                className="signin-input"
                placeholder="Enter your username"
              />
              <label className="signin-label">Password</label>
              <input
                type="password"
                className="signin-input"
                placeholder="Enter your password"
              />
              <button type="submit" className="signin-button">
                Log in
              </button>
            </form>
            <button className="signin-secondary">
              I don&apos;t have an account?
            </button>
          </div>
          <div className="signin-right">
            <div className="signin-right-content">
              <h2 className="signin-right-title">Hi There!</h2>
              <p className="signin-right-subtitle">Welcome to Agrosync</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 