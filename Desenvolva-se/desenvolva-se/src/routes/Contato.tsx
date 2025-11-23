// src/routes/Contato.tsx

import React from 'react';
import LogoIcon from '../assets/logo-desenvolva-se.png';

const Contato: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Obrigado pelo contato! Em breve nossa equipe retornará.");
  };

  return (
    <div className="contact-wrapper">
      
      {/* ================= SEÇÃO HERO (TÍTULO) ================= */}
      <section className="contact-hero-section">
        <div className="contact-container text-center">
          
          <div className="contact-hero-header mb-6 md:mb-8">
            <h1 className="contact-title">
              <img src={LogoIcon} alt="Ícone Desenvolva-se" className="contact-logo" />
              Fale Conosco
            </h1>
          </div>
          
          <p className="contact-description">
            Pronto para impulsionar sua equipe? Entre em contato para discutir soluções B2B personalizadas.
          </p>
          
        </div>
      </section>


      {/* ================= SEÇÃO DE CONTEÚDO (CANAIS + FORMULÁRIO) ================= */}
      <section className="contact-content-section">
        <div className="contact-container">
          
          <div className="contact-grid-layout">
            
            {/* --- COLUNA DA ESQUERDA: CANAIS DIRETOS --- */}
            <div className="contact-info-column">
              <h2 className="contact-section-title">
                Canais Diretos
              </h2>

              {/* gap APLICADO VIA GLOBAL.CSS */}
              <div className="flex flex-col">
                
                {/* Card E-mail */}
                <a href="mailto:contato@desenvolva-se.com" className="contact-channel-card">
                  <div className="contact-channel-icon">✉️</div>
                  <div className="contact-channel-info">
                    <h3>E-mail Comercial</h3>
                    <p>contato@desenvolva-se.com</p>
                  </div>
                </a>

                {/* Card Localização */}
                <div className="contact-channel-card">
                  <div className="contact-channel-icon">📍</div>
                  <div className="contact-channel-info">
                    <h3>Localização</h3>
                    <p>São Paulo, SP - Brasil (Atendimento Digital)</p>
                  </div>
                </div>

              </div>
            </div>


            {/* --- COLUNA DA DIREITA: FORMULÁRIO --- */}
            <div className="contact-form-column">
              <div className="contact-form-container">
                <h2 className="contact-section-title text-primary text-center md:text-left mb-6">
                  Envie uma Mensagem
                </h2>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  
                  <div className="form-group">
                    <label htmlFor="nome" className="form-label">Nome Completo</label>
                    <input type="text" id="nome" name="nome" required className="form-input" placeholder="Seu nome" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">E-mail Corporativo</label>
                    <input type="email" id="email" name="email" required className="form-input" placeholder="nome@empresa.com" />
                  </div>

                  <div className="form-grid-2">
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

                  <button type="submit" className="form-submit-button mt-2">
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
