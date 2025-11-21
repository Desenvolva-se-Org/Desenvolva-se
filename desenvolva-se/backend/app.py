# backend/app.py
# VERSÃO ADAPTADA PARA A TABELA 'USUARIOS' DO BANCO EXISTENTE

from flask import Flask, request, jsonify
import oracledb
# IMPORTANTE: CORS para o React funcionar
from flask_cors import CORS

# --- CONFIGURAÇÕES DO BANCO DE DADOS ORACLE (FIAP) ---
# Usando os dados que você forneceu anteriormente
DB_USER = "rm563674"
DB_PASS = "010207"
DB_HOST = "oracle.fiap.com.br"
DB_PORT = "1521"
DB_SERVICE = "orcl" # Verifique se é 'orcl' ou 'xe' se der erro de conexão

# Tenta criar a string de conexão (DSN)
try:
    dsn_tns = oracledb.makedsn(DB_HOST, DB_PORT, service_name=DB_SERVICE)
except Exception as e:
    print(f"Erro crítico na configuração do DSN: {e}")
    dsn_tns = None

app = Flask(__name__)

# IMPORTANTE: Ativa o CORS
CORS(app) 

# Função para obter a conexão
def get_db_connection():
    if not dsn_tns:
        print("DSN não configurado.")
        return None
    try:
        conn = oracledb.connect(
            user=DB_USER,
            password=DB_PASS,
            dsn=dsn_tns
        )
        return conn
    except oracledb.Error as e:
        error_obj, = e.args
        print(f"Erro de Conexão Oracle: {error_obj.message}")
        print("Verifique se está conectado à VPN da FIAP.")
        return None

# --- ROTAS ADAPTADAS PARA A TABELA 'USUARIOS' ---

# READ (Listar)
@app.route('/clientes', methods=['GET'])
def get_clientes():
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Falha na conexão com o banco Oracle da FIAP."}), 500
    
    cursor = conn.cursor()
    try:
        # MUDANÇA AQUI: Usando a tabela USUARIOS e a coluna ID_USU
        cursor.execute('SELECT id_usu, nome, idade, profissao_atual, nivel_formacao FROM USUARIOS ORDER BY id_usu')
        
        clientes = []
        for row in cursor.fetchall():
            # Mapeamos o resultado do banco para o JSON que o React espera.
            # row[0] é o 'id_usu' do banco, mas enviamos como 'ID' para o front.
            clientes.append({
                'ID': row[0], 
                'NOME': row[1],
                'IDADE': row[2],
                'PROFISSAO_ATUAL': row[3],
                'NIVEL_FORMACAO': row[4]
            })
        return jsonify(clientes)
    except oracledb.Error as e:
        error_obj, = e.args
        print(f"Erro no SELECT: {error_obj.message}")
        return jsonify({"error": f"Erro ao buscar dados: {error_obj.message}"}), 500
    finally:
        cursor.close()
        conn.close()

# CREATE (Adicionar)
@app.route('/clientes', methods=['POST'])
def add_cliente():
    novo_cliente = request.get_json()
    conn = get_db_connection()
    if not conn: return jsonify({"error": "Erro de conexão com o BD"}), 500
    cursor = conn.cursor()
    try:
        # MUDANÇA AQUI: Tabela USUARIOS
        cursor.execute("""
            INSERT INTO USUARIOS (nome, idade, profissao_atual, nivel_formacao)
            VALUES (:1, :2, :3, :4)
        """, (novo_cliente['nome'], novo_cliente['idade'], novo_cliente['profissao_atual'], novo_cliente['nivel_formacao']))
        conn.commit()
        return jsonify({"message": "Cliente adicionado!"}), 201
    except oracledb.Error as e:
        conn.rollback()
        error_obj, = e.args
        return jsonify({"error": error_obj.message}), 500
    finally:
        cursor.close()
        conn.close()

# UPDATE (Atualizar)
@app.route('/clientes/<int:id>', methods=['PUT'])
def update_cliente(id):
    dados = request.get_json()
    conn = get_db_connection()
    if not conn: return jsonify({"error": "Erro de conexão com o BD"}), 500
    cursor = conn.cursor()
    try:
        # MUDANÇA AQUI: Tabela USUARIOS e WHERE id_usu
        cursor.execute("""
            UPDATE USUARIOS SET nome=:1, idade=:2, profissao_atual=:3, nivel_formacao=:4 WHERE id_usu=:5
        """, (dados['nome'], dados['idade'], dados['profissao_atual'], dados['nivel_formacao'], id))
        conn.commit()
        return jsonify({"message": "Cliente atualizado!"}), 200
    except oracledb.Error as e:
        conn.rollback()
        error_obj, = e.args
        return jsonify({"error": error_obj.message}), 500
    finally:
        cursor.close()
        conn.close()

# DELETE (Excluir)
@app.route('/clientes/<int:id>', methods=['DELETE'])
def delete_cliente(id):
    conn = get_db_connection()
    if not conn: return jsonify({"error": "Erro de conexão com o BD"}), 500
    cursor = conn.cursor()
    try:
        # MUDANÇA AQUI: Tabela USUARIOS e WHERE id_usu
        cursor.execute('DELETE FROM USUARIOS WHERE id_usu=:1', (id,))
        conn.commit()
        return jsonify({"message": "Cliente excluído!"}), 200
    except oracledb.Error as e:
        conn.rollback()
        error_obj, = e.args
        return jsonify({"error": error_obj.message}), 500
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    print("--- Iniciando Servidor Flask (Conectado a USUARIOS) ---")
    app.run(debug=True, port=5000)