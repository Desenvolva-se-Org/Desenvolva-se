// src/routes/Cursos.tsx

import React, { useState, useEffect } from "react";

// --- INTERFACE FINAL COM 'link_curso' OPCIONAL ---
// O ponto de interrogação (?) garante que o código não quebre
// se a API porventura não retornar o link para algum curso.
interface Curso {
  id_curso: number;
  nome_curso: string;
  area: string;
  duracao: string;
  link_curso?: string; // <-- Opcional e corrigido para 'link_curso'
}

const Cursos: React.FC = () => {
  const [cursosRecomendados, setCursosRecomendados] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        console.log("Iniciando busca na API...");
        const response = await fetch(
          "https://api-java-desenvolva-se.onrender.com/curso"
        );
        if (!response.ok) {
          throw new Error(`Erro HTTP! status: ${response.status}`);
        }

        const data: Curso[] = await response.json();
        console.log("Dados recebidos da API:", data);

        setCursosRecomendados(data);
      } catch (err) {
        console.error("Erro na requisição:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocorreu um erro desconhecido ao carregar os cursos.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  return (
    <div className="container mx-auto py-8 min-h-[50vh]">
      <div className="container mx-auto py-12 px-4 bg-background min-h-screen">
        <div className="text-center mb-12">
          <h1 className="section-title">Nossos Cursos</h1>
          <p className="section-description">
            Descubra as trilhas de conhecimento mais relevantes para o seu
            desenvolvimento profissional.
          </p>
        </div>

        <div className="page-content-container">
          <h2 className="text-3xl font-bold text-secondary text-center mb-8">
            Trilhas Disponíveis
          </h2>

          {loading && (
            <div className="text-center py-8">
              <p className="text-text text-lg animate-pulse">
                Carregando cursos do servidor...
              </p>
            </div>
          )}

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center my-4"
              role="alert"
            >
              <strong className="font-bold">Erro: </strong>
              <span className="block sm:inline">{error}</span>
              <p className="text-sm mt-2 font-mono bg-red-50 p-1 inline-block">
                Verifique o console (F12) para mais detalhes.
              </p>
            </div>
          )}

          {!loading && !error && (
            <div className="cursos-grid">
              {cursosRecomendados.length > 0 ? (
                cursosRecomendados.map((curso) => (
                  // --- O código JSX está usando 'link_curso' corretamente ---
                  <div key={curso.id_curso} className="curso-card">
                    <h3 className="curso-card-title">
                      {curso.nome_curso || "Sem Título"}
                    </h3>
                    <p className="curso-card-description">
                      Duração estimada: {curso.duracao || "N/A"}
                    </p>

                    <p className="curso-card-area">
                      **Área:**{" "}
                      <span className="font-semibold">
                        {curso.area || "Não informada"}
                      </span>
                    </p>

                    <a
                      href={curso.link_curso || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="curso-card-button mt-auto text-center"
                    >
                      Ver Detalhes
                    </a>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-xl text-text/70 mb-2">
                    Nenhum curso encontrado.
                  </p>
                  <p className="text-text/60">
                    Nossa base de dados parece estar vazia no momento.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div> // <--- Certifique-se de que há fechamentos suficientes para todas as aberturas
  );
};

export default Cursos;
