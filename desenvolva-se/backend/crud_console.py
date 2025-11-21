import oracledb
from datetime import date
import json
import requests
import os

# ====================================================
# 1. CONFIGURAÇÃO DE CONEXÃO (ORACLE DB FIAP)
# ====================================================
# **Mantenha estas credenciais ou use as suas reais da FIAP.**

def getConnection():
    """Cria e retorna uma conexão com o banco de dados Oracle."""
    try:
        conn = oracledb.connect(
            user = "rm563674",
            password = "010207",
            host = "oracle.fiap.com.br",
            port = "1521",
            service_name = "orcl" # Pode ser 'xe' em alguns casos
        )
        return conn
    except Exception as e:
        print(f'\n❌ ERRO ao obter a conexão com Oracle: {e}')
        return None

# ====================================================
# 2. FUNÇÃO DE EXPORTAÇÃO JSON (Requisito de 30 pontos)
# ====================================================

def exportar_para_json(dados_lista_dicionario, nome_arquivo='exportacao_dados'):    
    dados_formatados = []
    for linha in dados_lista_dicionario:
        novo_dicionario = {}
        for chave, valor in linha.items():
            # Formata objetos Date para string
            if isinstance(valor, date):
                novo_dicionario[chave] = valor.strftime('%Y-%m-%d')
            else:
                novo_dicionario[chave] = valor
        dados_formatados.append(novo_dicionario)

    nome_completo = f'{nome_arquivo}_{date.today().strftime("%Y%m%d")}.json'
    try:
        with open(nome_completo, 'w', encoding='utf-8') as f:
            json.dump(dados_formatados, f, ensure_ascii=False, indent=4)
        print(f'\n✔️ SUCESSO! Dados exportados para o arquivo: {nome_completo}')
    except Exception as e:
        print(f'\n❌ Erro! Falha ao exportar para JSON: {e}')

# ====================================================
# 3. CRUD: USUARIOS (Implementação C/R/U/D)
# ====================================================
# Adaptação para a tabela 'USUARIOS' do banco_gs2.sql: id_usu, nome, idade, profissao_atual, nivel_formacao

def buscar_usuarios_para_exportar():
    """Busca todos os usuários para exportação JSON (READ)."""
    conn = getConnection()
    if not conn: return []
    try:
        cursor = conn.cursor()
        # MUDANÇA: Usando 'USUARIOS' e 'id_usu'
        sql = "SELECT id_usu, nome, idade, profissao_atual, nivel_formacao FROM USUARIOS ORDER BY id_usu"
        cursor.execute(sql)
        
        col_names = [i[0].lower() for i in cursor.description]
        rows = cursor.fetchall()
        
        # Converte para lista de dicionários
        dados_dict = [dict(zip(col_names, row)) for row in rows]
            
        return dados_dict
    except Exception as e:
        print(f'\n❌ Erro ao buscar usuários para exportação: {e}')
        return []
    finally:
        if conn: conn.close()

def listar_usuarios():
    """Lê e exibe todos os usuários (READ)."""
    print('\n*** Lendo e exibindo todos os USUARIOS ***')
    usuarios = buscar_usuarios_para_exportar()
    
    if not usuarios:
        print("Nenhum usuário encontrado.")
        return

    print("\n --- Lista de Usuários ---")
    for row in usuarios:
        # MUDANÇA: Usando a chave 'id_usu'
        print(f"ID: {row['id_usu']:<3} | Nome: {row['nome']:<25} | Idade: {row['idade']:<4} | Profissão: {row['profissao_atual']:<15} | Nível: {row['nivel_formacao']}")
        print('-' * 90)

def adicionar_usuario(nome, idade, profissao_atual, nivel_formacao):
    """Adiciona um novo usuário (CREATE)."""
    conn = getConnection()
    if not conn: return
    try:
        cursor = conn.cursor()
        
        # MUDANÇA: Usando 'USUARIOS' e retornando 'id_usu'
        sql = """
            INSERT INTO USUARIOS (nome, idade, profissao_atual, nivel_formacao)
            VALUES (:1, :2, :3, :4) RETURNING id_usu INTO :id_usu
        """
        id_usu_var = cursor.var(oracledb.NUMBER)
        
        cursor.execute(sql, (nome, idade, profissao_atual, nivel_formacao, id_usu_var))
        
        novo_id = id_usu_var.getvalue()[0]
        conn.commit() 
        
        print(f'\n✔️ SUCESSO: Usuário {nome} adicionado com ID: {novo_id}.')
        return True
    except Exception as e:
        print(f'\n❌ ERRO ao adicionar usuário: {e}')
        conn.rollback()
        return False
    finally:
        if conn: conn.close()

def remover_usuario(id_usuario):
    """Remove um usuário pelo ID (DELETE)."""
    conn = getConnection()
    if not conn: return
    try:
        cursor = conn.cursor()
        # MUDANÇA: Usando 'USUARIOS' e 'id_usu' na cláusula WHERE
        sql = "DELETE FROM USUARIOS WHERE id_usu = :id"
        cursor.execute(sql, {'id': id_usuario})
        conn.commit()
        if cursor.rowcount > 0:
            print(f'\n✔️ SUCESSO: Usuário ID {id_usuario} excluído!')
        else:
            print(f'\n⚠️ AVISO: Nenhum usuário com ID {id_usuario} encontrado.')
    except Exception as e:
        print(f'\n❌ ERRO ao remover usuário: {e}')
        conn.rollback()
    finally:
        if conn: conn.close()

def atualizar_usuario(id_usuario, novo_nome, nova_idade, nova_profissao):
    """Atualiza nome, idade e/ou profissão do usuário (UPDATE)."""
    conn = getConnection()
    if not conn: return
    try:
        cursor = conn.cursor()
        sets = []
        params = {}
        
        if novo_nome.strip() != "":
            sets.append("nome = :nome")
            params['nome'] = novo_nome
        if nova_idade.strip() != "":
            sets.append("idade = :idade")
            params['idade'] = int(nova_idade)
        if nova_profissao.strip() != "":
            sets.append("profissao_atual = :profissao")
            params['profissao'] = nova_profissao
        
        if not sets:
            print("\n⚠️ AVISO: Nenhum campo para atualizar foi fornecido.")
            return

        # MUDANÇA: Usando 'USUARIOS' e 'id_usu' na cláusula WHERE
        sql = "UPDATE USUARIOS SET " + ', '.join(sets) + " WHERE id_usu = :id"
        params['id'] = id_usuario

        cursor.execute(sql, params)
        conn.commit()

        if cursor.rowcount > 0:
            print(f'\n✔️ SUCESSO: Usuário ID {id_usuario} atualizado!')
        else:
            print(f'\n⚠️ AVISO: Nenhum usuário com ID {id_usuario} encontrado!')

    except ValueError:
        print("\n❌ ERRO: A idade deve ser um número inteiro.")
        conn.rollback()
    except Exception as e:
        print(f'\n❌ ERRO ao atualizar usuário: {e}')
        conn.rollback()
    finally:
        if conn: conn.close()

# ====================================================
# 4. CRUD: CURSOS (Implementação C/R/U/D)
# ====================================================
# Implementação C/R/U/D na tabela 'cursos' (id_curso, nome_curso, area, duracao)
# (Este bloco já estava correto para a tabela CURSOS, então mantive)

def buscar_cursos_para_exportar():
    """Busca todos os cursos para exportação JSON (READ)."""
    conn = getConnection()
    if not conn: return []
    try:
        cursor = conn.cursor()
        sql = "SELECT id_curso, nome_curso, area, duracao FROM cursos ORDER BY id_curso"
        cursor.execute(sql)

        col_names = [i[0].lower() for i in cursor.description]
        rows = cursor.fetchall()
        
        # Converte para lista de dicionários
        dados_dict = [dict(zip(col_names, row)) for row in rows]
        return dados_dict
    except Exception as e:
        print(f'\n❌ Erro ao buscar cursos: {e}')
        return []
    finally:
        if conn: conn.close()

def listar_cursos():
    """Lê e exibe todos os cursos (READ)."""
    print('\n*** Lendo e exibindo todos os CURSOS ***')
    cursos = buscar_cursos_para_exportar()
    
    if not cursos:
        print("Nenhum curso encontrado.")
        return

    print("\n --- Lista de Cursos ---")
    for row in cursos:
        print(f"ID: {row['id_curso']:<3} | Nome: {row['nome_curso']:<30} | Área: {row['area']:<15} | Duração (h): {row['duracao']}")
        print('-' * 80)

def adicionar_curso(nome, area, duracao):
    """Adiciona um novo curso (CREATE)."""
    conn = getConnection()
    if not conn: return
    try:
        cursor = conn.cursor()
        sql = """
            INSERT INTO cursos (nome_curso, area, duracao) VALUES (:1, :2, :3) RETURNING id_curso INTO :id_curso
        """
        id_curso_var = cursor.var(oracledb.NUMBER)
        
        cursor.execute(sql, (nome, area, duracao, id_curso_var))
        novo_id = id_curso_var.getvalue()[0]
        conn.commit()
        print(f'\n✔️ SUCESSO: Curso "{nome}" adicionado com ID: {novo_id}.')
    except Exception as e:
        print(f'\n❌ ERRO ao adicionar curso: {e}')
        conn.rollback()
    finally:
        if conn: conn.close()

def remover_curso(id_curso):
    """Remove um curso pelo ID (DELETE)."""
    conn = getConnection()
    if not conn: return
    try:
        cursor = conn.cursor()
        sql = "DELETE FROM cursos WHERE id_curso = :id"
        cursor.execute(sql, {'id': id_curso})
        conn.commit()
        if cursor.rowcount > 0:
            print(f'\n✔️ SUCESSO: Curso ID {id_curso} excluído!')
        else:
            print(f'\n⚠️ AVISO: Nenhum curso com ID {id_curso} encontrado.')
    except Exception as e:
        print(f'\n❌ ERRO ao remover curso: {e}')
        conn.rollback()
    finally:
        if conn: conn.close()

def atualizar_curso(id_curso, novo_nome, nova_area, nova_duracao):
    """Atualiza nome, área e/ou duração do curso (UPDATE)."""
    conn = getConnection()
    if not conn: return
    try:
        cursor = conn.cursor()
        sets = []
        params = {}
        
        if novo_nome.strip() != "":
            sets.append("nome_curso = :nome")
            params['nome'] = novo_nome
        if nova_area.strip() != "":
            sets.append("area = :area")
            params['area'] = nova_area
        if nova_duracao.strip() != "":
            sets.append("duracao = :duracao")
            params['duracao'] = int(nova_duracao)
        
        if not sets:
            print("\n⚠️ AVISO: Nenhum campo para atualizar foi fornecido.")
            return

        sql = "UPDATE cursos SET " + ', '.join(sets) + " WHERE id_curso = :id"
        params['id'] = id_curso

        cursor.execute(sql, params)
        conn.commit()

        if cursor.rowcount > 0:
            print(f'\n✔️ SUCESSO: Curso ID {id_curso} atualizado!')
        else:
            print(f'\n⚠️ AVISO: Nenhum curso com ID {id_curso} encontrado!')

    except ValueError:
        print("\n❌ ERRO: A duração deve ser um número inteiro.")
        conn.rollback()
    except Exception as e:
        print(f'\n❌ ERRO ao atualizar curso: {e}')
        conn.rollback()
    finally:
        if conn: conn.close()

# ====================================================
# 5. CONSUMO DE API EXTERNA (VIACEP) (Requisito de 20 pontos)
# ====================================================

def consultar_endereco_viacep_interno(cep):
    """Consulta dados de endereço a partir do ViaCEP, retornando um dicionário de dados."""
    cep_limpo = cep.replace('-', '').replace('.', '').strip()
    if len(cep_limpo) != 8 or not cep_limpo.isdigit():
        return None

    url = f"https://viacep.com.br/ws/{cep_limpo}/json/"
    try:
        response = requests.get(url)
        response.raise_for_status()
        dados = response.json()
        
        if dados.get('erro'):
            return None
        else:
            return dados
    except requests.exceptions.RequestException:
        return None

def consultar_endereco_viacep(cep):
    """Consulta dados de endereço a partir do ViaCEP (versão para menu principal)."""
    print(f"\nTentando acessar a API: https://viacep.com.br/ws/{cep.replace('-', '')}/json/")
    dados = consultar_endereco_viacep_interno(cep)
    
    if dados:
        print('\n--- RESULTADO DA CONSULTA VIA CEP ---')
        print(f"CEP: {dados.get('cep')}")
        print(f"Logradouro: {dados.get('logradouro')}")
        print(f"Bairro: {dados.get('bairro')}")
        print(f"Localidade/UF: {dados.get('localidade')}/{dados.get('uf')}")
        print('-------------------------------------')
    else:
        print("\n❌ Erro! CEP inválido ou falha na comunicação com a API.")

def adicionar_usuario_com_cep():
    """Adiciona um novo usuário E consulta o CEP via API externa."""
    print("\n--- ADICIONAR NOVO USUÁRIO (com CEP) ---")
    try:
        nome = input('Nome: ')
        idade = int(input('Idade: '))
        profissao_atual = input('Profissão Atual: ')
        nivel_formacao = input('Nível de Formação (Ex: Superior, Técnico): ')
        cep = input('CEP (para consulta com API Externa): ')

        # 1. Consulta a API Externa (ViaCEP)
        endereco = consultar_endereco_viacep_interno(cep)
        
        # 2. Executa o CRUD (CREATE)
        cadastro_sucesso = adicionar_usuario(nome, idade, profissao_atual, nivel_formacao)
        
        # 3. Exibe o resultado da API externa
        if cadastro_sucesso:
            if endereco:
                cidade = endereco.get('localidade', 'N/A')
                estado = endereco.get('uf', 'N/A')
                print(f"\n✨ SUCESSO! Usuário '{nome}' cadastrado.")
                print(f"✔️ DADO EXTERNO: CEP {cep} encontrado. Cidade: {cidade}/{estado}")
            else:
                print(f"\n✨ SUCESSO! Usuário '{nome}' cadastrado.")
                print("⚠️ Aviso: CEP inválido ou falha na consulta da API Externa.")

    except ValueError:
        print("❌ Erro: Idade deve ser um número inteiro.")
    except Exception as e:
        print(f"❌ Erro ao adicionar usuário: {e}")

# ====================================================
# 6. MENUS E PROGRAMA PRINCIPAL
# ====================================================
# (O restante do código dos menus permanece o mesmo, pois eles apenas chamam as funções acima)

def menu_usuarios():
    # Menu CRUD completo para Usuários
    while True:
        print('\n--- MENU USUÁRIOS ---')
        print('1. Adicionar Usuário Simples')
        print('2. Adicionar Usuário com CEP')
        print('3. Listar Usuários')
        print('4. Atualizar Nome/Idade/Profissão')
        print('5. Remover Usuário')
        print('6. Exportar Usuários para JSON')
        print('7. Voltar ao Menu Principal')   

        opcao_str = input('Digite uma opção: ')
        try:
            opcao = int(opcao_str)
            if opcao == 1:
                nome = input('Nome: ')
                idade = int(input('Idade: '))
                profissao_atual = input('Profissão Atual: ')
                nivel_formacao = input('Nível de Formação (Ex: Superior, Técnico): ')
                adicionar_usuario(nome, idade, profissao_atual, nivel_formacao)
            elif opcao == 2:
                adicionar_usuario_com_cep() 
            elif opcao == 3:
                listar_usuarios()
            elif opcao == 4:
                id_usuario = int(input('ID do Usuário a atualizar: '))
                novo_nome = input('Novo Nome (Deixe em branco para não alterar): ')
                nova_idade = input('Nova Idade (Deixe em branco para não alterar): ')
                nova_profissao = input('Nova Profissão (Deixe em branco para não alterar): ')
                atualizar_usuario(id_usuario, novo_nome, nova_idade, nova_profissao)
            elif opcao == 5:
                id_usuario = int(input('ID do Usuário a remover: '))
                remover_usuario(id_usuario)
            elif opcao == 6:
                dados = buscar_usuarios_para_exportar()
                if dados:
                    exportar_para_json(dados, 'usuarios_desenvolvase')
            elif opcao == 7:
                break
            else:
                print('Opção inválida.')
        except ValueError:
            print("Entrada inválida. Por favor, digite um número para a opção e IDs/Idade.")

def menu_cursos():
    # Menu CRUD completo para Cursos
    while True:
        print('\n--- MENU CURSOS ---')
        print('1. Adicionar Curso')
        print('2. Listar Cursos')
        print('3. Atualizar Curso')
        print('4. Remover Curso')
        print('5. Exportar Cursos para JSON')
        print('6. Voltar ao Menu Principal')

        opcao_str = input('Digite uma opção: ')
        try:
            opcao = int(opcao_str)
            if opcao == 1:
                nome = input('Nome do Curso: ')
                area = input('Área (Ex: Tecnologia, Saúde): ')
                duracao = int(input('Duração em Horas: '))
                adicionar_curso(nome, area, duracao)
            elif opcao == 2:
                listar_cursos()
            elif opcao == 3:
                id_curso = int(input('ID do Curso a atualizar: '))
                novo_nome = input('Novo Nome (Deixe em branco para não alterar): ')
                nova_area = input('Nova Área (Deixe em branco para não alterar): ')
                nova_duracao = input('Nova Duração (Horas) (Deixe em branco para não alterar): ')
                atualizar_curso(id_curso, novo_nome, nova_area, nova_duracao)
            elif opcao == 4:
                id_curso = int(input('ID do Curso a remover: '))
                remover_curso(id_curso)
            elif opcao == 5:
                dados = buscar_cursos_para_exportar()
                if dados:
                    exportar_para_json(dados, 'cursos_desenvolvase')
            elif opcao == 6:
                break
            else:
                print('Opção inválida.')
        except ValueError:
            print("Entrada inválida. Por favor, digite um número para a opção e IDs/Duração.")

def menu_principal():
    while True:
        print('\n' + '='*40)
        print('*** MENU CRUD CONSOLE - DESENVOLVA-SE ***')
        print('='*40)
        print('1. Usuários (CRUD + JSON)')
        print('2. Cursos (CRUD + JSON)')
        print('3. Consultar Endereço (API Externa - ViaCEP)')
        print('4. Sair')

        try:
            opcao = int(input('Digite uma opção: '))
            if opcao == 1:
                menu_usuarios()
            elif opcao == 2:
                menu_cursos()
            elif opcao == 3:
                cep = input('Digite o CEP para consulta (API Externa): ')
                consultar_endereco_viacep(cep)
            elif opcao == 4:
                print('Encerrando o programa... até breve!')
                break
            else:
                print('Opção inválida... tente novamente!')
        except ValueError:
            print("Entrada inválida. Por favor, digite um número.")
        except Exception as e:
            print(f"Ocorreu um erro inesperado: {e}")


# ----------------------------------------------------
# PROGRAMA PRINCIPAL
# ----------------------------------------------------

if __name__ == '__main__':
    menu_principal()