// src/routes/Home.tsx

import React from 'react';
import LogoIcon from '../assets/logo-desenvolva-se.png';

const Home: React.FC = () => {
  return (
    // Removemos o container principal para que as seções ocupem a largura total
    <div className="bg-background">
      
      {/* ================= SEÇÃO HERO (RETÂNGULO 1) ================= */}
      <section className="home-hero-section">
        <div className="home-section-content text-center">
          
          <div className="home-hero-title">
            {/* Título principal com fonte maior */}
            <h1 className="section-title !text-5xl md:!text-6xl lg:!text-7xl">
              <img src={LogoIcon} alt="Ícone Desenvolva-se" className="home-hero-logo" />
              Desenvolva-se
            </h1>
          </div>
          
          {/* Subtítulos com fontes maiores */}
          <p className="section-description !mb-4 !text-2xl md:!text-3xl font-semibold text-primary">
            Seu Futuro Profissional Começa Aqui.
          </p>
          <p className="text-xl md:text-2xl text-text/80 max-w-3xl mx-auto leading-relaxed">
            Descubra trilhas de conhecimento e impulsione sua carreira com o poder da inteligência artificial.
          </p>
          
        </div>
      </section>


      {/* ================= SEÇÃO FEATURES (RETÂNGULO 2) ================= */}
      <section className="home-features-section">
        <div className="home-section-content">
          
          {/* Título da seção com fonte maior */}
          <h2 className="text-4xl md:text-5xl font-bold text-secondary text-center mb-8 font-title">
            Como Funciona?
          </h2>
          
          {/* Descrição com fonte maior */}
          <p className="section-description-text !text-xl md:!text-2xl max-w-4xl !mb-16">
            Nossa plataforma utiliza IA para analisar as tendências do mercado e suas habilidades, sugerindo os melhores cursos para você se requalificar e se destacar.
          </p>
          
          <div className="features-grid">
            {/* Feature Cards (o estilo já está no CSS, fontes serão aumentadas lá) */}
            <div className="feature-card">
              <h3>Análise Inteligente</h3>
              <p>Sua trilha de aprendizado personalizada com base em IA.</p>
            </div>
            <div className="feature-card">
              <h3>Cursos de Ponta</h3>
              <p>Conteúdo atualizado nas áreas mais promissoras do mercado.</p>
            </div>
            <div className="feature-card">
              <h3>Certificação</h3>
              <p>Conquiste seu próximo nível profissional e seja reconhecido.</p>
            </div>
          </div>
          
        </div>
      </section>

    </div>
  );
};

export default Home;