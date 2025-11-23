// src/routes/Cursos.tsx

import React, { useState, useEffect } from 'react';

// Definição da interface para os dados que vêm da API
interface Curso {
  id_curso: number;
  nome_curso: string;
  area: string;
  duracao: string;
  link: string; // link externo do curso
}

// Mapa de NOME DO CURSO -> LINK
const mapaLinks: Record<string, string> = {
  "Liderança e Gestão de Pessoas":
    "https://digital.sebraesp.com.br/unidade/seja-um-lider-que-inspira?utm_source=search&utm_medium=cpc&utm_campaign=soluções_digitais&gad_source=1&gad_campaignid=23220850004&gclid=CjwKCAiA24XJBhBXEiwAXElO32jc4P8aBrMsN-2w5HkSSR5TbNMB9q5i7m9UQcwT2PLzlXPgkZ1MqxoC1TYQAvD_BwE",

  "Fundamentos de Programação":
    "https://www.udemy.com/pt/topic/programming-fundamentals/free/?srsltid=AfmBOoqhbWalK5UD58ky-iug49e52IKk9_JU4o0C1J5BNnN5eTRhW59a",

  "Comunicação Assertiva":
    "https://lp.napratica.org.br/comunicacao-assertiva-no-trabalho",

  "Análise de Dados com Excel":
    "https://www.escolavirtual.gov.br/curso/1274",

  "Introdução ao Marketing":
    "https://empretec.sebraesp.com.br/?utm_source=search&utm_medium=cpc&utm_campaign=empretec&gad_source=1&gad_campaignid=23215098898&gclid=CjwKCAiA24XJBhBXEiwAXElO3-skKD44Fm0CwHhr_pQDJRvYFfcDJ321JqEbFDQAAjHuCrxDyHfBrBoCZ44QAvD_BwE",

  "Excel Avançado":
    "https://www.escolavirtual.gov.br/curso/1275",

  "Marketing Digital":
    "https://empretec.sebraesp.com.br/?utm_source=search&utm_medium=cpc&utm_campaign=empretec&gad_source=1&gad_campaignid=23215098898&gclid=CjwKCAiA24XJBhBXEiwAXElO33GSwMJDaOu-4WapNSruzB8Bq3CX8MT3XZpeR6_fugGlMJJh_li3PhoCVBQQAvD_BwE",

  "UX Design":
    "https://uxdi.espm.br/home-padrao-espm-b/?utm_term=ux%20designer&utm_campaign=%5BESPM+-+XDI%5D+-+%5BGA+-+SEARCH%5D+-+CAMPANHA+-AGOSTO+2025&utm_source=adwords&utm_medium=ppc&hsa_acc=6765164295&hsa_cam=23087542452&hsa_grp=184946050485&hsa_ad=777825147733&hsa_src=g&hsa_tgt=kwd-7252963130&hsa_kw=ux%20designer&hsa_mt=b&hsa_net=adwords&hsa_ver=3&gad_source=1&gad_campaignid=23087542452&gclid=CjwKCAiA24XJBhBXEiwAXElO38OdHEV3K-5GDA_PPo2Mt2UuZBdlBUqfC38qFMy61EnmtcM_Dt_CShoC3FAQAvD_BwE",

  "Power BI para Iniciantes":
    "https://www.udemy.com/course/power-bi-completo-do-basico-ao-avancado/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_Alpha_Profa_la.PT_cc.BR_Subs&campaigntype=Search&portfolio=Brazil&language=PT&product=Course&test=&audience=DSA&topic=Microsoft_Power_BI&priority=Alpha&funnel=Conversion&utm_content=&utm_term=_._ag_180452164250_._ad_773550771056_._kw__._de_c_._dm__._pl__._ti_dsa-2439861504371_._li_9196692_._pd__._&matchtype=&gad_source=1&gad_campaignid=23007120602&gclid=CjwKCAiA24XJBhBXEiwAXElO3wc75_VytzND-KepVCE0pUvE34NZsiMgRLhXadhi7ULKiSg7gzojWxoCc0cQAvD_BwE&couponCode=CP251120G2",

  "Gestão de Projetos":
    "https://digital.sebraesp.com.br/unidade/seja-um-lider-que-inspira?utm_source=search&utm_medium=cpc&utm_campaign=soluções_digitais&gad_source=1&gad_campaignid=23220850004&gclid=CjwKCAiA24XJBhBXEiwAXElO3_-M4VrU7R8V7J4CU1uJgIelF9m6s0lKaFZ1B8IBzgKYuSUvY5iwJhoCkJAQAvD_BwE",
};

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

        const data = await response.json();

        // Junta os dados da API com os links, usando o nome do curso
        const cursosComLinks: Curso[] = data.map((curso: any) => ({
          ...curso,
          link:
            mapaLinks[curso.nome_curso] ||
            `https://www.google.com/search?q=${encodeURIComponent(
              curso.nome_curso
            )}`, // fallback bonitinho
        }));

        setCursosRecomendados(cursosComLinks);
      } catch (err) {
        console.error('Erro ao buscar cursos:', err);
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
    <div className="page-content-container">
      <h2 className="section-title-cursos">Trilhas de Conhecimento</h2>

      {/* Loading */}
      {loading && (
        <div className="loading-container">
          <p className="loading-text">Carregando cursos disponíveis...</p>
        </div>
      )}

      {/* Erro */}
      {error && (
        <div className="error-container">
          <div className="error-box" role="alert">
            <strong className="error-title">Erro ao carregar cursos:</strong>
            <span>{error}</span>
            <span className="error-hint">
              Verifique sua conexão ou tente novamente mais tarde.
            </span>
          </div>
        </div>
      )}

      {/* Sucesso */}
      {!loading && !error && (
        <div className="cursos-grid">
          {cursosRecomendados.length > 0 ? (
            cursosRecomendados.map((curso) => (
              <div
                key={curso.id_curso}
                className="curso-card"
                data-area={curso.area}
              >
                <h3 className="curso-card-title">
                  {curso.nome_curso || 'Curso Sem Título'}
                </h3>

                <p className="curso-card-description">
                  Explore os fundamentos e aplicações práticas desta área
                  essencial para o mercado atual.
                </p>

                <div className="curso-card-footer">
                  <div className="curso-info-item">
                    <span className="info-icon">⏱️</span>
                    <span>
                      Duração:{' '}
                      <span className="info-highlight">
                        {curso.duracao || 'N/A'}h
                      </span>
                    </span>
                  </div>
                  <div className="curso-info-item">
                    <span className="info-icon">🏷️</span>
                    <span>
                      Área:{' '}
                      <span className="info-highlight">
                        {curso.area || 'Geral'}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Link externo para o curso */}
                <a
                  href={curso.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="curso-card-button"
                >
                  Ver Detalhes da Trilha
                </a>
              </div>
            ))
          ) : (
            <div className="empty-container col-span-full">
              <p className="empty-text">Nenhuma trilha encontrada no momento.</p>
              <p className="empty-subtext">
                Nossa base de dados está sendo atualizada.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cursos;
