// src/routes/Sobre.tsx

import React from 'react';
import LogoIcon from '../assets/logo-desenvolva-se.png'; // Importe o logo se quiser usar no título

const Sobre: React.FC = () => {
  return (
    <div className="bg-background">
      <section className="home-hero-section">
        <div className="home-section-content text-center">
          
          <div className="home-hero-title mb-8">
            <h1 className="section-title !text-5xl md:!text-6xl lg:!text-7xl flex items-center justify-center gap-4">
              <img src={LogoIcon} alt="Ícone Desenvolva-se" className="home-hero-logo" /> 
              
              Sobre o Desenvolva-se
            </h1>
          </div>
          
          {/* Missão em destaque com fonte grande e cor primária */}
          <p className="section-description !text-2xl md:!text-3xl font-semibold text-primary max-w-4xl mx-auto leading-relaxed">
            Nossa missão é impulsionar a requalificação profissional com tecnologia, inteligência e propósito.
          </p>
          
        </div>
      </section>


      {/* ================= SEÇÃO DE CONTEÚDO (RETÂNGULO 2 - VISÃO E VALORES) ================= */}
      {/* Reutilizando a classe 'home-features-section' para o segundo estilo de fundo */}
      <section className="home-features-section">
        <div className="home-section-content">
          
          {/* Bloco de Visão */}
          <div className="mb-16 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6 font-title">
              Nossa Visão
            </h2>
            <p className="text-xl md:text-2xl text-text/90 leading-relaxed">
              Acreditamos em um futuro onde a adaptação profissional é contínua e acessível. Queremos ser a ponte que conecta pessoas às oportunidades da economia digital, usando a IA como uma ferramenta de empoderamento, não de substituição.
            </p>
          </div>

          {/* Bloco de Valores (Exemplo com Cards menores) */}
          <div className="text-center max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-text mb-10 font-title">
              Nossos Valores Fundamentais
            </h2>
            
            {/* Grid de Valores (Reutilizando a estrutura de grid, mas com cards mais simples) */}
            <div className="features-grid">
              
              {/* Card de Valor 1 */}
              <div className="feature-card !p-8 !gap-4"> {/* Usando ! para sobrescrever paddings se necessário */}
                <div className="text-5xl mb-2">🚀</div> {/* Ícone/Emoji */}
                <h3>Inovação com Propósito</h3>
                <p>Usamos tecnologia de ponta para resolver problemas reais de carreira.</p>
              </div>
              
              {/* Card de Valor 2 */}
              <div className="feature-card !p-8 !gap-4">
                <div className="text-5xl mb-2">🤝</div>
                <h3>Inclusão e Acesso</h3>
                <p>O conhecimento deve ser acessível a todos que buscam crescer.</p>
              </div>
              
              {/* Card de Valor 3 */}
              <div className="feature-card !p-8 !gap-4">
                <div className="text-5xl mb-2">🌱</div>
                <h3>Crescimento Contínuo</h3>
                <p>Incentivamos a aprendizagem ao longo da vida (lifelong learning).</p>
              </div>

            </div>
          </div>
          
        </div>
      </section>

    </div>
  );
};

export default Sobre;