document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos do DOM ---
    const btnMenuCrud = document.getElementById('btn-menu-crud');
    const crudSection = document.getElementById('crud-section');
    const btnFecharCrud = document.getElementById('btn-fechar-crud');
    const clienteForm = document.getElementById('cliente-form');
    const formTitle = document.getElementById('form-title');
    const clienteIdInput = document.getElementById('cliente-id');
    const btnCancelar = document.getElementById('btn-cancelar');
    const clientesTableBody = document.querySelector('#clientes-table tbody');
    const btnAtualizarLista = document.getElementById('btn-atualizar-lista');
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    // URL da sua API Flask (Verifique se a porta está correta)
    const API_URL = 'http://127.0.0.1:5000';

    // --- Funções de Controle da Interface ---

    // Mostra a seção do CRUD e esconde as outras
    function showCrud() {
        crudSection.style.display = 'block';
        // Opcional: Esconder outras seções para focar no CRUD
        document.querySelectorAll('main > section:not(#crud-section)').forEach(section => {
            section.style.display = 'none';
        });
        carregarClientes(); // Carrega a lista ao abrir
    }

    // Fecha a seção do CRUD e mostra a página inicial
    function hideCrud() {
        crudSection.style.display = 'none';
        // Mostra novamente as outras seções
        document.querySelectorAll('main > section:not(#crud-section)').forEach(section => {
            section.style.display = 'block';
        });
        resetForm();
    }
    
    // Alterna o menu em dispositivos móveis
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
    }

    // Reseta o formulário para o estado de "Novo Cliente"
    function resetForm() {
        clienteForm.reset();
        clienteIdInput.value = '';
        formTitle.textContent = 'Novo Cliente';
        btnCancelar.style.display = 'none';
    }

    // Prepara o formulário para editar um cliente existente
    function editCliente(cliente) {
        clienteIdInput.value = cliente.ID;
        document.getElementById('nome').value = cliente.NOME;
        document.getElementById('idade').value = cliente.IDADE;
        document.getElementById('profissao').value = cliente.PROFISSAO_ATUAL;
        document.getElementById('formacao').value = cliente.NIVEL_FORMACAO;
        
        formTitle.textContent = 'Editar Cliente';
        btnCancelar.style.display = 'inline-block';
        // Rola a página até o formulário
        clienteForm.scrollIntoView({ behavior: 'smooth' });
    }

    // --- Funções de Comunicação com a API (AJAX) ---

    // LISTAR (Read) - Busca todos os clientes da API
    async function carregarClientes() {
        try {
            const response = await fetch(`${API_URL}/clientes`);
            if (!response.ok) throw new Error('Erro ao buscar clientes.');
            const clientes = await response.json();
            renderizarTabela(clientes);
        } catch (error) {
            console.error('Erro:', error);
            alert('Não foi possível carregar a lista de clientes.');
        }
    }

    // ADICIONAR (Create) ou ATUALIZAR (Update) cliente
    async function salvarCliente(event) {
        event.preventDefault(); // Impede o recarregamento da página

        const id = clienteIdInput.value;
        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const profissao_atual = document.getElementById('profissao').value;
        const nivel_formacao = document.getElementById('formacao').value;

        const clienteData = { nome, idade, profissao_atual, nivel_formacao };
        
        try {
            let response;
            if (id) {
                // Se tem ID, é uma atualização (PUT)
                response = await fetch(`${API_URL}/clientes/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(clienteData)
                });
            } else {
                // Se não tem ID, é uma criação (POST)
                response = await fetch(`${API_URL}/clientes`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(clienteData)
                });
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao salvar cliente.');
            }

            alert(id ? 'Cliente atualizado com sucesso!' : 'Cliente adicionado com sucesso!');
            resetForm();
            carregarClientes(); // Recarrega a lista para mostrar as mudanças
        } catch (error) {
            console.error('Erro:', error);
            alert(`Erro: ${error.message}`);
        }
    }

    // EXCLUIR (Delete) cliente
    async function excluirCliente(id) {
        if (!confirm('Tem certeza que deseja excluir este cliente?')) return;

        try {
            const response = await fetch(`${API_URL}/clientes/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao excluir cliente.');
            }

            alert('Cliente excluído com sucesso!');
            carregarClientes(); // Recarrega a lista
        } catch (error) {
            console.error('Erro:', error);
            alert(`Erro: ${error.message}`);
        }
    }

    // --- Função para Renderizar a Tabela ---
    function renderizarTabela(clientes) {
        clientesTableBody.innerHTML = ''; // Limpa a tabela atual

        if (clientes.length === 0) {
            clientesTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Nenhum cliente encontrado.</td></tr>';
            return;
        }

        clientes.forEach(cliente => {
            const row = document.createElement('tr');
            // Atenção: As chaves do objeto cliente devem corresponder às colunas do seu banco de dados (em maiúsculo se for Oracle)
            row.innerHTML = `
                <td>${cliente.ID}</td>
                <td>${cliente.NOME}</td>
                <td>${cliente.IDADE}</td>
                <td>${cliente.PROFISSAO_ATUAL}</td>
                <td>${cliente.NIVEL_FORMACAO}</td>
                <td>
                    <button class="action-btn btn-edit" data-id="${cliente.ID}">Editar</button>
                    <button class="action-btn btn-delete" data-id="${cliente.ID}">Excluir</button>
                </td>
            `;
            clientesTableBody.appendChild(row);
        });

        // Adiciona eventos aos botões de Editar e Excluir dinamicamente
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                // Encontra o cliente correto na lista pelo ID
                const clienteParaEditar = clientes.find(c => c.ID == id);
                if (clienteParaEditar) {
                    editCliente(clienteParaEditar);
                }
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                excluirCliente(id);
            });
        });
    }

    // --- Event Listeners ---
    btnMenuCrud.addEventListener('click', showCrud);
    btnFecharCrud.addEventListener('click', hideCrud);
    clienteForm.addEventListener('submit', salvarCliente);
    btnCancelar.addEventListener('click', resetForm);
    btnAtualizarLista.addEventListener('click', carregarClientes);
    menuIcon.addEventListener('click', toggleMobileMenu);
    
    // Fechar o menu mobile ao clicar em um link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
             if (navLinks.classList.contains('active')) {
                 toggleMobileMenu();
             }
        });
    });
});