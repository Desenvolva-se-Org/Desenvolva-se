import React from 'react';
import { Link } from 'react-router-dom';
// Garanta que você tem os caminhos corretos para as fotos de cada membro
import claytonImg from '../assets/img/clayton.jpeg';
import solaImg from '../assets/img/sola.jpeg';
import pedroImg from '../assets/img/pedro.jpeg';
import githubLogo from '../assets/img/github-logo.png';
import linkedinLogo from '../assets/img/linkedin-logo.png';

interface IMembro {
  nome: string;
  sobrenome: string;
  rm: string;
  turma: string;
  foto: string;
  githubUrl: string;
  linkedinUrl: string;
}

const membros: IMembro[] = [
  {
    nome: 'Clayton',
    sobrenome: 'Alves dos Santos',
    rm: '562285',
    turma: '1TDSPF - Fevereiro', // **ATUALIZAR TURMA REAL**
    foto: claytonImg,
    githubUrl: 'https://github.com/Claytonasantos',
    linkedinUrl: 'https://www.linkedin.com/in/clayton-alves-dos-santos-224281353/',
  },
  {
    nome: 'Guilherme',
    sobrenome: 'Sola Garcia',
    rm: '563674', 
    turma: '1TDSPF - Fevereiro', // **ATUALIZAR TURMA REAL**
    foto: solaImg,
    githubUrl: 'https://github.com/guilhermesolagarcia',
    linkedinUrl: 'https://www.linkedin.com/in/guilherme-sola-garcia-8b8208351/',
  },
  {
    nome: 'Pedro',
    sobrenome: 'Santos Pequini',
    rm: '561842', 
    turma: '1TDSPF - Fevereiro', // **ATUALIZAR TURMA REAL**
    foto: pedroImg,
    githubUrl: 'https://github.com/PedroSPequini',
    linkedinUrl: 'https://www.linkedin.com/in/pedro-pequini-a47600346/',
  },
];

const MembroCard: React.FC<{ membro: IMembro }> = ({ membro }) => (
  <div className="membro-card">
    
    <img
      src={membro.foto}
      alt={membro.nome}
      className="membro-foto"
    />
    
    <div className="text-center">
      <h3 className="membro-nome">{membro.nome}</h3>
      <p className="membro-sobrenome">{membro.sobrenome}</p>
      
      <p className="membro-info-rm-turma">RM: {membro.rm}</p>
      <p className="membro-info-rm-turma">Turma: {membro.turma}</p>
    </div>

    <div className="membro-links-container">
      <a href={membro.githubUrl} className="membro-social-link" target="_blank" rel="noreferrer">
        <img src={githubLogo} alt="GitHub Logo" className="membro-social-icon" />
        <span>GitHub</span>
      </a>

      <a href={membro.linkedinUrl} className="membro-social-link" target="_blank" rel="noreferrer">
        <img src={linkedinLogo} alt="LinkedIn Logo" className="membro-social-icon" />
        <span>LinkedIn</span>
      </a>
    </div>
  </div>
);

const Integrantes: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4 bg-background min-h-screen">
      
      <div className="text-center mb-12">
        <h1 className="section-title">Conheça Nossa Equipe</h1>
        <p className="section-description">
          O projeto 'Desenvolva-se' foi criado por este time de analistas. A seguir, você encontra os perfis do LinkedIn e GitHub de cada integrante.
        </p>
      </div>

      <div className="integrantes-grid">
        {membros.map((membro, index) => (
          <MembroCard key={index} membro={membro} />
        ))}
      </div>
    </div>
  );
};

export default Integrantes;