// src/routes/Cursos.tsx

import React, { useState, useEffect } from 'react';

// --- IMPORTANTE ---
// Esta interface deve bater EXATAMENTE com o nome dos campos no JSON que sua API Java retorna.
interface Curso {
  id_curso: number; 
  nome_curso: string;
  area: string;
  duracao: string; 
   
}

const Cursos: React.FC = () => {
  const [cursosRecomendados, setCursosRecomendados] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        console.log("Iniciando busca na API..."); // Log para debug
        const response = await fetch('https://api-java-desenvolva-se.onrender.com/curso'); 

        if (!response.ok) {
          throw new Error(`Erro HTTP! status: ${response.status}`);
        }

        const data: Curso[] = await response.json();
        console.log("Dados recebidos da API:", data); // Log para ver o que chegou

        // Define o estado com os dados REAIS da API
        setCursosRecomendados(data);

      } catch (err) {
        console.error("Erro na requisição:", err); // Log do erro
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
    <div className="container mx-auto py-12 px-4 bg-background min-h-screen">
      <div className="text-center mb-12">
        <h1 className="section-title">Nossos Cursos</h1>
        <p className="section-description">
          Descubra as trilhas de conhecimento mais relevantes para o seu desenvolvimento profissional.
        </p>
      </div>

      <div className="page-content-container">
        <h2 className="text-3xl font-bold text-secondary text-center mb-8">Trilhas Disponíveis</h2>
        
        {loading && (
          <div className="text-center py-8">
            <p className="text-text text-lg animate-pulse">Carregando cursos do servidor...</p>
          </div>
        )}
        
        {error && (
             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center my-4" role="alert">
             <strong className="font-bold">Erro: </strong>
             <span className="block sm:inline">{error}</span>
             <p className="text-sm mt-2 font-mono bg-red-50 p-1 inline-block">Verifique o console (F12) para mais detalhes.</p>
           </div>
        )}

        {!loading && !error && (
          <div className="cursos-grid">
            {cursosRecomendados.length > 0 ? (
              cursosRecomendados.map(curso => (
                // --- CORREÇÃO AQUI: Usando os nomes corretos da interface ---
                <div key={curso.id_curso} className="curso-card">
                  
                  {/* Usando 'nome_curso' em vez de 'titulo' */}
                  <h3 className="curso-card-title">{curso.nome_curso || 'Sem Título'}</h3>
                  
                  {/* A interface atual não tem 'descricao', então mostramos a 'duracao'.
                      Se sua API retornar descrição, atualize a interface e mude aqui de volta.
                  */}
                  <p className="curso-card-description">
                    Duração estimada: {curso.duracao || 'N/A'}
                  </p>
                  
                  <p className="curso-card-area">
                    **Área:** <span className="font-semibold">{curso.area || 'Não informada'}</span>
                  </p>
                  <button className="curso-card-button mt-auto">Ver Detalhes</button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-xl text-text/70 mb-2">Nenhum curso encontrado.</p>
                <p className="text-text/60">Nossa base de dados parece estar vazia no momento.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cursos;