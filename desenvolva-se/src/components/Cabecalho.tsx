// src/components/Cabecalho.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../assets/logo-desenvolva-se.png';
// O CSS das classes utilizadas aqui deve estar no arquivo src/styles/globals.css

// Interface para tipar os dados do cliente no Front-end (usando minúsculas)
interface Cliente {
  id: number;
  nome: string;
  idade: string; // Usando string para facilitar o input no formulário
  profissao_atual: string;
  nivel_formacao: string;
}

const Cabecalho: React.FC = () => {
  // Estados para controle do tema e do modal
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados para o CRUD de Clientes
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [formData, setFormData] = useState<Omit<Cliente, 'id'>>({
    nome: '',
    idade: '',
    profissao_atual: '',
    nivel_formacao: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // URL da sua API Flask (local)
  const API_URL = 'http://127.0.0.1:5000';

  // --- Funções Auxiliares ---

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    // Se estiver abrindo o modal, carrega os dados e reseta o formulário
    if (!isModalOpen) {
      fetchClientes();
      resetForm();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ nome: '', idade: '', profissao_atual: '', nivel_formacao: '' });
    setEditingId(null);
    setError(null);
  };

  // --- Funções de API (CRUD) ---

  // READ (Listar) - CORRIGIDO COM BASE NO CONSOLE LOG
  const fetchClientes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/clientes`);
      if (!response.ok) throw new Error('Erro ao buscar clientes. Verifique se a API está rodando.');
      const data = await response.json();
      
      // 🚨 CORREÇÃO FINAL DO MAPEAMENTO 🚨
      // Usando as chaves MAIÚSCULAS exatas que apareceram no seu console.
      const clientesMapeados = data.map((c: any) => ({
        id: c.ID,                         // Corrigido: usa 'ID' conforme o console
        nome: c.NOME,                     // Corrigido: usa 'NOME'
        idade: c.IDADE ? c.IDADE.toString() : '', // Corrigido: usa 'IDADE' e protege contra nulo
        profissao_atual: c.PROFISSAO_ATUAL, // Corrigido: usa 'PROFISSAO_ATUAL'
        nivel_formacao: c.NIVEL_FORMACAO  // Corrigido: usa 'NIVEL_FORMACAO'
      }));
      setClientes(clientesMapeados);
      
    } catch (err) {
      console.error("Erro no fetch:", err);
      setError(err instanceof Error ? err.message : 'Falha ao conectar com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  // CREATE (Criar) ou UPDATE (Atualizar)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Converte idade para número antes de enviar para a API
      const clienteData = { ...formData, idade: parseInt(formData.idade) };
      let url = `${API_URL}/clientes`;
      let method = 'POST';

      if (editingId) {
        url = `${API_URL}/clientes/${editingId}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao salvar cliente');
      }
      
      // Sucesso
      fetchClientes(); // Recarrega a lista para mostrar os dados atualizados
      resetForm(); // Limpa o formulário
    } catch (err) {
      console.error("Erro ao salvar:", err);
      setError(err instanceof Error ? err.message : 'Erro ao salvar');
    } finally {
      setIsLoading(false);
    }
  };

  // Prepara o formulário para edição
  const handleEdit = (cliente: Cliente) => {
    // Aqui usamos as chaves minúsculas porque já estamos lidando com o objeto da interface
    setFormData({
      nome: cliente.nome,
      idade: cliente.idade,
      profissao_atual: cliente.profissao_atual,
      nivel_formacao: cliente.nivel_formacao,
    });
    setEditingId(cliente.id);
    setError(null); // Limpa erros anteriores ao iniciar edição
  };

  // DELETE (Excluir)
  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/clientes/${id}`, { method: 'DELETE' });
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erro ao excluir cliente');
      }
      fetchClientes(); // Recarrega a lista
      if (editingId === id) resetForm(); // Se estava editando o excluído, reseta o form
    } catch (err) {
      console.error("Erro ao excluir:", err);
      setError(err instanceof Error ? err.message : 'Erro ao excluir');
    } finally {
      setIsLoading(false);
    }
  };

  // Efeito para fechar o modal se clicar fora do conteúdo dele (no overlay)
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const modalOverlay = document.getElementById('crud-modal');
      if (modalOverlay && e.target === modalOverlay) {
        setIsModalOpen(false);
      }
    };
    
    if (isModalOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
    
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isModalOpen]);


  return (
    <>
      {/* --- CABEÇALHO PRINCIPAL --- */}
      <header className="cabecalho-base">
        <nav className="navegacao-content">
          {/* Bloco da Logo e Título */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Link to="/" className="logo-link">
              <img 
                src={LogoImage} 
                alt="Logo Desenvolva-se" 
                className="logo-cabecalho"
              />
              <span className="logo-title">Desenvolva-se</span>
            </Link>
          </div>

          {/* Links de Navegação */}
          <div className="hidden md:flex nav-links-container">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/cursos" className="nav-link">Cursos</Link>
            <Link to="/sobre" className="nav-link">Sobre</Link>
            <Link to="/contato" className="nav-link">Contato</Link>
            <Link to="/integrantes" className="nav-link">Integrantes</Link>
          </div>

          {/* Botões de Ação (Tema e Menu) */}
          <div className="action-buttons-container">
            <button
              onClick={toggleDarkMode}
              className="toggle-theme-button"
              aria-label="Alternar tema"
            >
              {isDarkMode ? (
                // Ícone Sol
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12H2m15.325-4.275l-.707.707M6.343 17.657l-.707.707M16.95 6.343l.707-.707M7.05 16.95l-.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                // Ícone Lua
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Botão Menu que abre o modal */}
            <button onClick={toggleModal} className="botao-login">
              Menu
            </button>
          </div>
        </nav>
      </header>

      {/* --- MODAL DE CRUD --- */}
      {isModalOpen && (
        <div id="crud-modal" className="modal-overlay">
          <div className="modal-content bg-cardBg text-text p-6 rounded-lg shadow-xl overflow-y-auto max-h-[90vh]">
            
            <div className="modal-header">
              <h2 className="modal-title">Gerenciamento de Clientes</h2>
              <button onClick={toggleModal} className="modal-close-btn" aria-label="Fechar modal">&times;</button>
            </div>

            {error && <div className="modal-error">{error}</div>}

            <form onSubmit={handleSubmit} className="modal-form mb-8 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-6 text-center">{editingId ? 'Editar Cliente' : 'Novo Cliente'}</h3>
              
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 ml-1">Nome:</label>
                    <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} required className="modal-input" placeholder="Ex: João Silva" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 ml-1">Idade:</label>
                    <input type="number" name="idade" value={formData.idade} onChange={handleInputChange} required className="modal-input" placeholder="Ex: 30" min="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 ml-1">Profissão Atual:</label>
                    <input type="text" name="profissao_atual" value={formData.profissao_atual} onChange={handleInputChange} required className="modal-input" placeholder="Ex: Desenvolvedor" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 ml-1">Nível de Formação:</label>
                  <select name="nivel_formacao" value={formData.nivel_formacao} onChange={handleInputChange} required className="modal-select">
                    <option value="">Selecione...</option>
                    <option value="Ensino Fundamental">Ensino Fundamental</option>
                    <option value="Ensino Médio">Ensino Médio</option>
                    <option value="Ensino Superior Incompleto">Ensino Superior Incompleto</option>
                    <option value="Ensino Superior Completo">Ensino Superior Completo</option>
                    <option value="Pós-graduação">Pós-graduação</option>
                  </select>
                </div>
              </div>
              
              <div className="modal-form-actions">
                {editingId && <button type="button" onClick={resetForm} className="btn-cancel">Cancelar</button>}
                <button type="submit" disabled={isLoading} className="btn-save">
                  {isLoading ? 'Salvando...' : (editingId ? 'Atualizar' : 'Salvar')}
                </button>
              </div>
            </form>

            <div className="modal-table-container">
              <div className="modal-table-header">
                <h3 className="text-lg font-semibold">Base de Clientes</h3>
                <button onClick={fetchClientes} className="btn-refresh" disabled={isLoading}>
                  <span className="mr-1 text-xl">🔄</span> Atualizar
                </button>
              </div>
              
              {isLoading && !clientes.length ? (
                <div className="text-center py-8 animate-pulse">
                  <p className="text-lg font-semibold text-primary">Carregando dados...</p>
                </div>
              ) : (
                <table className="modal-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Idade</th>
                      <th>Profissão</th>
                      <th>Formação</th>
                      <th className="text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientes.length > 0 ? (
                      // Usamos as chaves minúsculas da interface Cliente
                      clientes.map(cliente => (
                        <tr key={cliente.id}>
                          <td className="font-bold text-primary">#{cliente.id}</td>
                          <td className="font-medium">{cliente.nome}</td>
                          <td>{cliente.idade} anos</td>
                          <td>{cliente.profissao_atual}</td>
                          <td>{cliente.nivel_formacao}</td>
                          <td>
                            <div className="table-actions">
                              <button onClick={() => handleEdit(cliente)} className="btn-table-edit">Editar</button>
                              <button onClick={() => handleDelete(cliente.id)} className="btn-table-delete">Excluir</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={6} className="p-8 text-center text-text/70 italic">Nenhum cliente encontrado na base de dados.</td></tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cabecalho;