import { useEffect, useState } from 'react'
import { FiMapPin, FiMenu } from 'react-icons/fi'
import logo from '../assets/logomaarca.jpeg'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-transparent' : 'bg-[#A8E6CF]'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo + Nome */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Fonovital" className="h-10 w-auto" />
          <span className="text-xl font-bold text-[#4A90E2]">FonoVital</span>
        </div>

        {/* Menu */}
        <nav className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <Link to="/" className="hover:scale-105 transition-transform duration-200">
            Home
          </Link>
          <Link to="/tipos-de-aparelhos" className="hover:scale-105 transition-transform duration-200">
            Tipos de Aparelhos
          </Link>
          <a href="#" className="hover:scale-105 transition-transform duration-200">Modelos</a>
          <a href="#" className="hover:scale-105 transition-transform duration-200">Marcas</a>
          <a href="#" className="hover:scale-105 transition-transform duration-200">Blog</a>
          <a
            href="#"
            className="flex items-center space-x-1 text-[#4A90E2] hover:scale-105 transition-transform duration-200"
          >
            <FiMapPin />
            <span>Unidades</span>
          </a>
        </nav>

        {/* WhatsApp */}
        <div className="hidden md:block">
          <a
            href="https://wa.me/5532999069763"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#4A90E2] text-white px-4 py-2 rounded font-semibold hover:scale-105 hover:shadow transition-transform duration-200"
          >
            WhatsApp
          </a>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <FiMenu size={24} />
        </div>
      </div>
    </header>
  )
}
