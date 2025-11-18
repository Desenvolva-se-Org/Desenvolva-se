import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../assets/logo-desenvolva-se.png';

const Cabecalho: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-background text-text shadow-md sticky top-0 z-50 transition-colors duration-300">
      <nav className="container mx-auto p-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          {/* Usando <img> para a logo, que é mais simples por agora */}
          <Link to="/" className="flex items-center">
            <img src={LogoImage} alt="Logo Desenvolva-se" className="h-8 w-auto mr-2" />
            <span className="text-2xl font-title font-bold text-text">
              Desenvolva-se
            </span>
          </Link>
          <span className="text-xs text-text/80 ml-2 mt-1 hidden sm:block">Seu próximo nível profissional.</span> 
        </div>

        {/* Links de Navegação */}
        <div className="hidden md:flex items-center space-x-6 font-sans">
          <Link to="/" className="text-text hover:text-primary transition-colors duration-200">Home</Link>
          <Link to="/cursos" className="text-text hover:text-primary transition-colors duration-200">Cursos</Link>
          <Link to="/sobre" className="text-text hover:text-primary transition-colors duration-200">Sobre</Link>
          <Link to="/contato" className="text-text hover:text-primary transition-colors duration-200">Contato</Link>
          <Link to="/integrantes" className="text-text hover:text-primary transition-colors duration-200">Integrantes</Link>
        </div>

        {/* Botões de Ação e Toggle de Tema */}
        <div className="flex items-center space-x-4">
          {/* Toggle de Tema */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-cardBg hover:bg-secondary/20 transition-colors duration-200"
            aria-label="Alternar tema"
          >
            {isDarkMode ? (
              <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12H2m15.325-4.275l-.707.707M6.343 17.657l-.707.707M16.95 6.343l.707-.707M7.05 16.95l-.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Botão de Login */}
          <button className="bg-primary text-white font-semibold py-2 px-6 rounded-full hover:bg-secondary transition-colors duration-200">
            Login
          </button>
        </div>

        {/* Menu Hamburguer para Mobile (implementar depois) */}
        <div className="md:hidden">
          {/* Ícone de menu */}
        </div>
      </nav>
    </header>
  );
};

export default Cabecalho;