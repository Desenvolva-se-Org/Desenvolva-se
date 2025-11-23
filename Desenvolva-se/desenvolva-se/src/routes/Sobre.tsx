// src/routes/Sobre.tsx

import React from 'react';
import LogoIcon from '../assets/logo-desenvolva-se.png';

const Sobre: React.FC = () => {
  return (
    <div className="about-wrapper">
      
      {/* ================= SEÇÃO HERO (MISSÃO) ================= */}
      <section className="about-hero-section">
        <div className="about-container text-center">
          
          <div className="about-hero-header mb-6 md:mb-8">
            {/* Título e Logo agrupados */}
            <h1 className="about-title">
              <img
                src={LogoIcon}
                alt="Ícone Desenvolva-se"
                className="about-logo"
              />
              Sobre o Desenvolva-se
            </h1>
          </div>
          
          {/* Missão */}
          <p className="about-mission">
            Nossa missão é impulsionar a requalificação profissional com tecnologia, inteligência e propósito.
          </p>
          
        </div>
      </section>


      {/* ================= SEÇÃO DE CONTEÚDO (VISÃO E VALORES) ================= */}
      <section className="about-content-section">
        <div className="about-container">

          {/* Bloco de Visão + Valores no mesmo container */}
          <div className="about-block text-center">
            <h2 className="about-section-title text-secondary">
              Nossa Visão
            </h2>

            <p className="about-text max-w-3xl mx-auto">
              Acreditamos em um futuro onde a adaptação profissional é contínua e acessível. Queremos ser a ponte que conecta pessoas às oportunidades da economia digital, usando a IA como uma ferramenta de empoderamento, não de substituição.
            </p>

            {/* ESPAÇADOR ENTRE VISÃO E VALORES */}
            <div className="mt-10 md:mt-16"></div>

            <h2 className="about-section-title mb-8 md:mb-10">
              Nossos Valores Fundamentais
            </h2>

            {/* Grid de Valores */}
            <div className="values-grid">
              
              {/* Card 1 */}
              <div className="value-card">
                <div className="value-icon">🚀</div>
                <h3 className="value-title">Inovação com Propósito</h3>
                <p className="value-text">
                  Usamos tecnologia de ponta para resolver problemas reais de carreira.
                </p>
              </div>
              
              {/* Card 2 */}
              <div className="value-card">
                <div className="value-icon">🤝</div>
                <h3 className="value-title">Inclusão e Acesso</h3>
                <p className="value-text">
                  O conhecimento deve ser acessível a todos que buscam crescer.
                </p>
              </div>
              
              {/* Card 3 */}
              <div className="value-card">
                <div className="value-icon">🌱</div>
                <h3 className="value-title">Crescimento Contínuo</h3>
                <p className="value-text">
                  Incentivamos a aprendizagem ao longo da vida (lifelong learning).
                </p>
              </div>

            </div>
          </div>
          
        </div>
      </section>

    </div>
  );
};

export default Sobre;
