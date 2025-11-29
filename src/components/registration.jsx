import '../styles/registration.css'
import { useState } from 'react'
import { authAPI } from '../api'

export default function Registration({ onBackToSignin, onRegister }) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        password_confirm: '',
        user_type: 'farmer',
        address: '',
        wilaya: '',
        commune: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await authAPI.register(formData)
            // Store tokens from registration
            localStorage.setItem('access_token', response.data.tokens.access)
            localStorage.setItem('refresh_token', response.data.tokens.refresh)
            if (onRegister) {
                onRegister()
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed')
            console.error('Registration error:', err.response?.data)
        }
    }

    return (
        <section className="registration">
            <div className="registration-overlay">
                <div className="registration-card">
                    <div className="registration-left">
                        <h1 className="registration-title">Sign in as a producer</h1>
                        <form className="registration-form" onSubmit={handleSubmit}>
                            <label className="registration-label">Username</label>
                            <input
                                type="text"
                                name="username"
                                className="registration-input"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />

                            <label className="registration-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="registration-input"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <label className="registration-label">Phone number</label>
                            <input
                                type="tel"
                                name="phone"
                                className="registration-input"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />

                            <label className="registration-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="registration-input"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <label className="registration-label">Confirm Password</label>
                            <input
                                type="password"
                                name="password_confirm"
                                className="registration-input"
                                value={formData.password_confirm}
                                onChange={handleChange}
                                required
                            />

                            <label className="registration-label">Address</label>
                            <input
                                type="text"
                                name="address"
                                className="registration-input"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />

                            <label className="registration-label">Wilaya</label>
                            <input
                                type="text"
                                name="wilaya"
                                className="registration-input"
                                value={formData.wilaya}
                                onChange={handleChange}
                                required
                            />

                            <label className="registration-label">Commune</label>
                            <input
                                type="text"
                                name="commune"
                                className="registration-input"
                                value={formData.commune}
                                onChange={handleChange}
                                required
                            />

                            {error && <p className="error">{error}</p>}
                            <button type="submit" className="registration-button">
                                Submit
                            </button>
                        </form>
                        <button className="registration-secondary" onClick={onBackToSignin}>
                            Already have an account?
                        </button>
                    </div>
                    <div className="registration-right">
                        <div className="registration-right-inner">
                            <h2 className="registration-right-title">Hi There!</h2>
                            <p className="registration-right-subtitle">Welcome to Agrosync</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
