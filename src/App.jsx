import './App.css'
import { useState, useEffect } from 'react'
import Landing from './pages/Landing/landingPage'
import Farmer from './pages/Farmer/farmer'
import Newproduct from './components/newProduct'
import Customer from './pages/saller/customer'
import Card from './pages/saller/card'
import FarmerInsights from './pages/Farmer/farmerInsights'
import Transportation from './pages/Farmer/transportation'
import Signin from './components/signIn'
import Registration from './components/registration'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [cart, setCart] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem('customerCart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    const token = localStorage.getItem('access_token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const goLanding = () => setCurrentPage('landing')
  const goCustomer = () => setCurrentPage('customer')
  const goSignin = () => setCurrentPage('signin')
  const goRegistration = () => setCurrentPage('registration')
  const goFarmer = () => setCurrentPage('farmer')
  const goNewProduct = () => setCurrentPage('newProduct')
  const goFarmerInsights = () => setCurrentPage('farmerInsights')
  const goTransportation = () => setCurrentPage('transportation')
  const goCard = () => setCurrentPage('card')

  const handleUpdateCart = (updatedCart) => {
    setCart(updatedCart)
    localStorage.setItem('customerCart', JSON.stringify(updatedCart))
  }

  let content = null

  if (currentPage === 'landing') {
    content = <Landing onGoShop={goCustomer} onGoSignin={goSignin} isLoggedIn={isLoggedIn} onGoFarmer={goFarmer} />
  } else if (currentPage === 'customer') {
    content = (
      <Customer
        onNavigateToCard={goCard}
        cart={cart}
        onUpdateCart={handleUpdateCart}
        onBackToLanding={goLanding}
      />
    )
  } else if (currentPage === 'card') {
    content = (
      <Card
        cartItems={cart}
        onBack={goCustomer}
        onUpdateCart={handleUpdateCart}
      />
    )
  } else if (currentPage === 'signin') {
    content = <Signin onLogin={goFarmer} onGoToRegistration={goRegistration} setIsLoggedIn={setIsLoggedIn} />
  } else if (currentPage === 'registration') {
    content = <Registration onBackToSignin={goSignin} onRegister={goFarmer} />
  } else if (currentPage === 'farmer') {
    content = (
      <Farmer
        onAddNewProduct={goNewProduct}
        onMarketInsights={goFarmerInsights}
        onTransportation={goTransportation}
        onBackToLanding={goLanding}
        onLogout={() => {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          setIsLoggedIn(false)
          setCurrentPage('landing')
        }}
      />
    )
  } else if (currentPage === 'newProduct') {
    content = <Newproduct onBack={goFarmer} />
  } else if (currentPage === 'farmerInsights') {
    content = <FarmerInsights onBack={goFarmer} />
  } else if (currentPage === 'transportation') {
    content = <Transportation onBack={goFarmer} />
  }

  return <div className="page-transition">{content}</div>
}

export default App
