import '../styles/signIn.css'
import { useState } from 'react'
import { authAPI } from '../api'

export default function Signin({ onLogin, onGoToRegistration, setIsLoggedIn }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await authAPI.login(username, password)
      localStorage.setItem('access_token', response.data.tokens.access)
      localStorage.setItem('refresh_token', response.data.tokens.refresh)
      setIsLoggedIn(true)
      if (onLogin) {
        onLogin()
      }
    } catch (err) {
      setError('Invalid credentials')
      console.error('Login error:', err)
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label className="signin-label">Password</label>
              <input
                type="password"
                className="signin-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p className="error">{error}</p>}
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