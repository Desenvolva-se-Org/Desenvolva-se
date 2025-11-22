// src/routes/Cursos.tsx

import React, { useState, useEffect } from 'react';

// Definição da interface para os dados que vêm da API
interface Curso {
  id_curso: number;
  nome_curso: string;
  area: string;
  duracao: string;
  // descricao?: string; // Descomente se sua API passar a retornar descrição
}

const Cursos: React.FC = () => {
  const [cursosRecomendados, setCursosRecomendados] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        // URL da sua API Java
        const response = await fetch('https://api-java-desenvolva-se.onrender.com/curso'); 

        if (!response.ok) {
          throw new Error(`Erro HTTP! status: ${response.status}`);
        }

        const data: Curso[] = await response.json();
        setCursosRecomendados(data);

      } catch (err) {
        console.error("Erro ao buscar cursos:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocorreu um erro desconhecido ao carregar os cursos.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  return (
    // Usando a nova classe container com margem e padding responsivos
    <div className="page-content-container">
      <h2 className="section-title-cursos">Trilhas de Conhecimento</h2>
      
      {/* --- Loading State --- */}
      {loading && (
        <div className="loading-container">
          <p className="loading-text">Carregando cursos disponíveis...</p>
        </div>
      )}
      
      {/* --- Error State --- */}
      {error && (
        <div className="error-container">
          <div className="error-box" role="alert">
            <strong className="error-title">Erro ao carregar cursos:</strong>
            <span>{error}</span>
            <span className="error-hint">Verifique sua conexão ou tente novamente mais tarde.</span>
          </div>
        </div>
      )}

      {/* --- Success State (Lista de Cursos) --- */}
      {!loading && !error && (
        <div className="cursos-grid">
          {cursosRecomendados.length > 0 ? (
            cursosRecomendados.map(curso => (
              // Adiciona um atributo data-area para estilização condicional (opcional)
              <div key={curso.id_curso} className="curso-card" data-area={curso.area}>
                
                <h3 className="curso-card-title">{curso.nome_curso || 'Curso Sem Título'}</h3>
                
                {/* Descrição (Placeholder, já que a API não retorna) */}
                <p className="curso-card-description">
                  Explore os fundamentos e aplicações práticas desta área essencial para o mercado atual.
                </p>
                
                {/* Rodapé do Card com Ícones */}
                <div className="curso-card-footer">
                  <div className="curso-info-item">
                    <span className="info-icon">⏱️</span>
                    <span>Duração: <span className="info-highlight">{curso.duracao || 'N/A'}h</span></span>
                  </div>
                  <div className="curso-info-item">
                    <span className="info-icon">🏷️</span>
                    <span>Área: <span className="info-highlight">{curso.area || 'Geral'}</span></span>
                  </div>
                </div>

                <button className="curso-card-button">Ver Detalhes da Trilha</button>
              </div>
            ))
          ) : (
            // --- Empty State ---
            <div className="empty-container col-span-full">
              <p className="empty-text">Nenhuma trilha encontrada no momento.</p>
              <p className="empty-subtext">Nossa base de dados está sendo atualizada.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cursos;