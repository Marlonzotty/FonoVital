import { useState } from 'react'
import { FiMapPin, FiMenu, FiX } from 'react-icons/fi'
import logo from '../assets/logomaarca.jpeg'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#A8E6CF] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo + Nome */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Fonovital" className="h-10 w-auto" />
          <span className="text-xl font-bold text-[#4A90E2]">FonoVital</span>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <Link to="/" className="hover:scale-105 transition-transform duration-200">
            Home
          </Link>
          <Link to="/tipos-de-aparelhos" className="hover:scale-105 transition-transform duration-200">
            Tipos de Aparelhos
          </Link>
          <Link to="#" className="hover:scale-105 transition-transform duration-200">
            Modelos
          </Link>
          <Link to="#" className="hover:scale-105 transition-transform duration-200">
            Marcas
          </Link>
          <Link to="#" className="hover:scale-105 transition-transform duration-200">
            Blog
          </Link>
          <a
            href="#"
            className="flex items-center space-x-1 text-[#4A90E2] hover:scale-105 transition-transform duration-200"
          >
            <FiMapPin />
            <span>Unidades</span>
          </a>
        </nav>

        {/* WhatsApp Desktop */}
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

        {/* Menu Mobile Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#A8E6CF] px-6 py-4 space-y-4 text-gray-700 font-medium shadow-md">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block">
            Home
          </Link>
          <Link to="/tipos-de-aparelhos" onClick={() => setMenuOpen(false)} className="block">
            Tipos de Aparelhos
          </Link>
          <Link to="#" onClick={() => setMenuOpen(false)} className="block">
            Modelos
          </Link>
          <Link to="#" onClick={() => setMenuOpen(false)} className="block">
            Marcas
          </Link>
          <Link to="#" onClick={() => setMenuOpen(false)} className="block">
            Blog
          </Link>
          <a
            href="#"
            className="flex items-center space-x-1 text-[#4A90E2]"
            onClick={() => setMenuOpen(false)}
          >
            <FiMapPin />
            <span>Unidades</span>
          </a>
          <a
            href="https://wa.me/5532999069763"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#4A90E2] text-white px-4 py-2 rounded font-semibold text-center"
          >
            WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}
