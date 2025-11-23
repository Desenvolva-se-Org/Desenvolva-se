// src/components/Rodape.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from '../assets/logo-desenvolva-se.png'

const Rodape: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="rodape-base">
      <div className="rodape-content">
        
        {/* Seção da Logo e Copyright */}
        <div className="rodape-info-section"> {/* Renomeado para mais genérico */}
          <Link to="/" className="rodape-logo-link">
            <img src={LogoIcon} alt="Logo Desenvolva-se" className="rodape-logo-icon" />
            <span className="rodape-logo-title">Desenvolva-se</span>
          </Link>
          <p className="rodape-slogan">Seu próximo nível profissional.</p> {/* Slogan mais acima */}
          <p className="rodape-copyright">
            &copy; {currentYear} Desenvolva-se. Todos os direitos reservados.
          </p>
        </div>

        {/* Seção de Links de Navegação (Principal) */}
        <div className="rodape-nav-section"> {/* Classe mais específica para navegação */}
          <h4 className="rodape-section-title">Explore</h4>
          <Link to="/" className="rodape-link">Home</Link>
          <Link to="/cursos" className="rodape-link">Cursos</Link>
          <Link to="/sobre" className="rodape-link">Sobre</Link>
          <Link to="/contato" className="rodape-link">Contato</Link>
          <Link to="/integrantes" className="rodape-link">Integrantes</Link>
        </div>

        {/* Seção de Links Adicionais / Úteis (se necessário, ou pode ser apenas uma seção de links) */}
        {/* Por enquanto, mantemos uma estrutura similar para ocupar o espaço do social */}
        <div className="rodape-nav-section"> {/* Usando a mesma classe para consistência */}
            <h4 className="rodape-section-title">Suporte</h4>
            {/* Aqui você pode adicionar links para FAQ, Termos de Uso, Política de Privacidade, etc. */}
            <Link to="/contato" className="rodape-link">Ajuda</Link>
            <Link to="/sobre" className="rodape-link">Termos de Uso</Link> {/* Exemplo */}
            <Link to="/sobre" className="rodape-link">Política de Privacidade</Link> {/* Exemplo */}
        </div>

      </div>
    </footer>
  );
};

export default Rodape;