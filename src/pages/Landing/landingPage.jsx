import '../../styles/landing.css'
import Home from '../../components/home'
import Aboutus from '../../components/aboutUs'
import Features from '../../components/features'
import Contact from '../../components/contacts'

export default function Landing({ onGoShop, onGoSignin }) {
  return (
    <>
      <Home id="home" onGoShop={onGoShop} onGoSignin={onGoSignin} />
      <Aboutus id="about-us" />
      <Features id="features" />
      <Contact id="contact" />
    </>
  )
} 