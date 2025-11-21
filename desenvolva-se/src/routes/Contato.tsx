// src/routes/Contato.tsx

import React from 'react';
import LogoIcon from '../assets/logo-desenvolva-se.png';
// Ícones de imagem removidos. Usaremos emojis.

const Contato: React.FC = () => {
  // Função de placeholder para o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Obrigado pelo contato! Em breve nossa equipe retornará.");
  };

  return (
    <div className="bg-background">
      <section className="home-hero-section">
        <div className="home-section-content text-center">
          <div className="home-hero-title mb-8">
            <h1 className="section-title !text-secondary !text-5xl md:!text-6xl lg:!text-7xl flex items-center justify-center gap-4">
              <img src={LogoIcon} alt="Ícone Desenvolva-se" className="home-hero-logo" />
              Fale Conosco
            </h1>
          </div>
          <p className="section-description !text-2xl md:!text-3xl font-semibold text-text max-w-4xl mx-auto leading-relaxed">
            Pronto para impulsionar sua equipe? Entre em contato para discutir soluções B2B personalizadas.
          </p>
        </div>
      </section>

      <section className="home-features-section">
        <div className="home-section-content">
          
          <div className="contact-grid-layout">
            
            <div className="contact-info-column">
              <h2 className="text-3xl font-bold text-text mb-8 font-title text-center md:text-left">
                Canais Diretos
              </h2>
              <div className="flex flex-col gap-6">

                <div className="feature-card !flex-row !p-6 !gap-6 !items-center !text-left">
                  <div className="text-4xl">📍</div>
                  <div>
                    <h3 className="!text-xl !mb-1">Localização</h3>
                    <p className="!text-base">São Paulo, SP - Brasil (Atendimento Digital)</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="contact-form-column">
              <div className="contact-form-container">
                <h2 className="text-3xl font-bold text-primary mb-8 font-title text-center">
                  Envie uma Mensagem
                </h2>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  
                  <div className="form-group">
                    <label htmlFor="nome" className="form-label">Nome Completo</label>
                    <input type="text" id="nome" name="nome" required className="form-input" placeholder="Seu nome" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">E-mail Corporativo</label>
                    <input type="email" id="email" name="email" required className="form-input" placeholder="nome@empresa.com" />
                  </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                        <label htmlFor="empresa" className="form-label">Empresa</label>
                        <input type="text" id="empresa" name="empresa" className="form-input" placeholder="Sua empresa" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cargo" className="form-label">Cargo</label>
                        <input type="text" id="cargo" name="cargo" className="form-input" placeholder="Seu cargo" />
                    </div>
                   </div>

                  <div className="form-group">
                    <label htmlFor="mensagem" className="form-label">Como podemos ajudar?</label>
                    <textarea id="mensagem" name="mensagem" rows={5} required className="form-textarea" placeholder="Descreva sua necessidade..."></textarea>
                  </div>

                  <button type="submit" className="form-submit-button">
                    Enviar Solicitação
                  </button>

                </form>
              </div>
            </div>

          </div>
          
        </div>
      </section>

    </div>
  );
};

export default Contato;