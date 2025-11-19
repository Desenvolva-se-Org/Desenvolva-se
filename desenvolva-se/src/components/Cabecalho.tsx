import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../assets/logo-desenvolva-se.png'; // Garanta que este caminho está correto

const Cabecalho: React.FC = () => {
  // Estado para controlar o tema
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Alterna a classe 'dark' no elemento <html>, que o CSS usa para mudar as variáveis de cor
    document.documentElement.classList.toggle('dark'); 
  };

  return (
    // Usa a classe CSS pura 'cabecalho-base'
    <header className="cabecalho-base"> 
      <nav className="navegacao-content"> {/* Usa a classe CSS pura para flexbox principal */}
        
        {/* Bloco da Logo e Título (usa style inline para flexbox) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link to="/" className="logo-link">
            <img 
              src={LogoImage} 
              alt="Logo Desenvolva-se" 
              className="logo-cabecalho" // Classe pura para tamanho e espaçamento
            />
          <span className="logo-title">
            Desenvolva-se
          </span>
          </Link>
          {/* Slogan usa classes Tailwind que funcionam (fontes) mas o layout está no CSS puro */}
          <span className="text-xs text-text/80 ml-2 mt-1 hidden sm:block">Seu próximo nível profissional.</span> 
        </div>

        {/* Links de Navegação */}
        {/* Usa a classe nav-links-container para espaçamento (gap) e hidden/md:flex para responsividade */}
        <div className="hidden md:flex nav-links-container"> 
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/cursos" className="nav-link">CURSOS</Link>
          <Link to="/sobre" className="nav-link">SOBRE</Link>
          <Link to="/contato" className="nav-link">CONTATO</Link>
          <Link to="/integrantes" className="nav-link">INTEGRANTES</Link>
        </div>

        {/* Botões de Ação e Toggle de Tema (usa style inline para flexbox) */}
        <div className="action-buttons-container">
          
          {/* Toggle de Tema */}
          <button
            onClick={toggleDarkMode}
            className="toggle-theme-button"
            aria-label="Alternar tema"
          >
            {/* Ícones de Sol e Lua */}
            {isDarkMode ? (
              <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12H2m15.325-4.275l-.707.707M6.343 17.657l-.707.707M16.95 6.343l.707-.707M7.05 16.95l-.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Botão de Login - Usa a classe CSS pura 'botao-login' */}
          <button className="botao-login">
            LOGIN
          </button>
        </div>

        {/* Menu Hamburguer (Mobile) */}
        <div className="md:hidden">
          {/* ... */}
        </div>
      </nav>
    </header>
  );
};

export default Cabecalho;