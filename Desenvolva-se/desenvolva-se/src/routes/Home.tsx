// src/routes/Home.tsx

import React from 'react';
import LogoIcon from '../assets/logo-desenvolva-se.png';

const Home: React.FC = () => {
  return (
    <div className="home-wrapper">
      
      {/* ================= SEÇÃO HERO (LIMPA E IMPACTANTE) ================= */}
      <section className="home-hero-section">
        <div className="home-container">
          
          <div className="hero-content">
            <div className="hero-title-group">
              <img src={LogoIcon} alt="Ícone Desenvolva-se" className="hero-logo" />
              <h1 className="hero-title">
                Desenvolva-se
              </h1>
            </div>
            
            <h2 className="hero-subtitle-primary">
              Seu Futuro Profissional Começa Aqui.
            </h2>
            <p className="hero-subtitle-secondary">
              Descubra trilhas de conhecimento e impulsione sua carreira com o poder da inteligência artificial e tecnologia.
            </p>

            {/* Botão de Chamada para Ação (Opcional - Fica ótimo!) */}
            <button className="hero-cta-button">Começar Jornada</button>
            
          </div>
        </div>
      </section>


      {/* ================= SEÇÃO FEATURES (ELEGANTE E MODERNA) ================= */}
      <section className="home-features-section">
        <div className="home-container">
          
          <div className="features-header">
            <h2 className="features-title">
              Como Funciona?
            </h2>
            <p className="features-description">
              Nossa plataforma utiliza IA avançada para analisar tendências de mercado e suas habilidades, criando um caminho personalizado para o seu sucesso.
            </p>
          </div>
          
          <div className="features-grid">
            {/* Card 1 */}
            <div className="feature-card card-analysis">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">🧠</span>
              </div>
              <h3 className="feature-card-title">Análise Inteligente</h3>
              <p className="feature-card-text">Sua trilha de aprendizado personalizada com base em dados e IA.</p>
            </div>
            
            {/* Card 2 */}
            <div className="feature-card card-courses">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">🚀</span>
              </div>
              <h3 className="feature-card-title">Cursos de Ponta</h3>
              <p className="feature-card-text">Conteúdo atualizado nas áreas mais promissoras e demandadas.</p>
            </div>
            
            {/* Card 3 */}
            <div className="feature-card card-certification">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">🏅</span>
              </div>
              <h3 className="feature-card-title">Certificação</h3>
              <p className="feature-card-text">Conquiste seu próximo nível profissional e seja reconhecido no mercado.</p>
            </div>
          </div>
          
        </div>
      </section>

    </div>
  );
};

export default Home;