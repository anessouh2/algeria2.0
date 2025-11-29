import '../styles/registration.css'

export default function Registration({ onBackToSignin, onRegister }) {
    const handleSubmit = (e) => {
        e.preventDefault()
        if (onRegister) {
            onRegister()
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
                                className="registration-input"
                                placeholder=""
                            />

                            <label className="registration-label">Phone number</label>
                            <input
                                type="tel"
                                className="registration-input"
                                placeholder=""
                            />

                            <label className="registration-label">Password</label>
                            <input
                                type="password"
                                className="registration-input"
                                placeholder=""
                            />

                            <label className="registration-label">Address</label>
                            <input
                                type="text"
                                className="registration-input"
                                placeholder=""
                            />

                            <label className="registration-label">Age</label>
                            <input
                                type="number"
                                className="registration-input"
                                placeholder=""
                            />

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
