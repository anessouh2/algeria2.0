import '../styles/signIn.css'

export default function Signin({ onLogin, onGoToRegistration }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onLogin) {
      onLogin()
    }
  }

  return (
    <section className="sign-in">
      <div className="signin-overlay">
        <div className="signin-card">
          <div className="signin-left">
            <h1 className="signin-title">Log in</h1>
            <form className="signin-form" onSubmit={handleSubmit}>
              <label className="signin-label">Username</label>
              <input
                type="text"
                className="signin-input"
              />
              <label className="signin-label">Password</label>
              <input
                type="password"
                className="signin-input"
              />
              <button type="submit" className="signin-button">
                Log in
              </button>
            </form>
            <button className="signin-secondary" onClick={onGoToRegistration}>
              I don&apos;t have an account?
            </button>
          </div>
          <div className="signin-right">
            <div className="signin-right-inner">
              <h2 className="signin-right-title">Hi There!</h2>
              <p className="signin-right-subtitle">Welcome to Agrosync</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}