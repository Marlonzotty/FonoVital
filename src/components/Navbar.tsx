import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import logo from '../assets/logomarca.png'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleUnidadesClick = () => {
    alert('🚧 Em breve loja física!')
    setMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#008B91] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo Clicável */}
        <Link
          to="/"
          className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
        >
          <img src={logo} alt="Fonovital" className="h-10 w-auto" />
          <span className="text-xl font-bold text-white">FonoVital</span>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center space-x-8 text-white font-medium">
          <Link
            to="/"
            className="hover:scale-105 transition-transform duration-200"
          >
            Home
          </Link>
          <Link
            to="/tipos-de-aparelhos"
            className="hover:scale-105 transition-transform duration-200"
          >
            Tipos de Aparelhos
          </Link>
          <Link
            to="/teste-auditivo"
            className="hover:scale-105 transition-transform duration-200"
          >
            Teste Auditivo
          </Link>
          <button
            onClick={handleUnidadesClick}
            className="hover:scale-105 transition-transform duration-200"
          >
            Unidades
          </button>
        </nav>

        {/* WhatsApp Desktop */}
        <div className="hidden md:block">
          <a
            href="https://wa.me/5532999069763"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#008B91] px-4 py-2 rounded font-semibold hover:scale-105 hover:shadow transition-transform duration-200"
          >
            WhatsApp
          </a>
        </div>

        {/* Menu Mobile Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FiX size={26} color="white" />
            ) : (
              <FiMenu size={26} color="white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#008B91] px-6 py-4 space-y-4 text-white font-medium shadow-md">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Home
          </Link>
          <Link
            to="/tipos-de-aparelhos"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Tipos de Aparelhos
          </Link>
          <Link
            to="/teste-auditivo"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Teste Auditivo
          </Link>
          <button onClick={handleUnidadesClick} className="block">
            Unidades
          </button>
          <a
            href="https://wa.me/5532999069763"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white text-[#008B91] px-4 py-2 rounded font-semibold text-center"
          >
            WhatsApp
          </a>
        </div>
        
      )}
    </header>
  )
}
