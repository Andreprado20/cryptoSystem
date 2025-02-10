from flask import Blueprint, request, jsonify
from database import get_db_connection

transacao_bp = Blueprint('transacao', __name__)

# GET all transactions or specific by ID
@transacao_bp.route('/transacao', methods=['GET'])
def get_transacoes():
    transacao_id = request.args.get('id')
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            if transacao_id:
                cur.execute("SELECT * FROM transacao WHERE id = %s;", (transacao_id,))
                transacao = cur.fetchone()
                if not transacao:
                    return jsonify({"error": "Transação não Encontrada!"}), 404
            else:
                cur.execute("SELECT * FROM transacao;")
                transacao = cur.fetchall()
        conn.close()
        return jsonify(transacao), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

# POST: Create a new transaction
@transacao_bp.route('/transacao', methods=['POST'])
def create_transacao():
    data = request.get_json()
    id_carteira_origem = data.get("id_carteira_origem")
    id_carteira_destino = data.get("id_carteira_destino")
    id_criptoativo = data.get("id_criptoativo")
    quantidade = data.get("quantidade")
    tipo = data.get("tipo")
    
    if not id_criptoativo or not quantidade or not tipo:
        return jsonify({"error": "Missing required fields"}), 400

    if tipo not in ["compra", "venda", "transferencia"]:
        return jsonify({"error": "Invalid transaction type"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO transacao (id_carteira_origem, id_carteira_destino, id_criptoativo, quantidade, tipo) 
                VALUES (%s, %s, %s, %s, %s) RETURNING id;
                """,
                (id_carteira_origem, id_carteira_destino, id_criptoativo, quantidade, tipo),
            )
            transacao_id = cur.fetchone()["id"]
            conn.commit()
        conn.close()
        return jsonify({"message": "Transação criada com sucesso!", "id": transacao_id}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

# PUT: Update an existing transaction
@transacao_bp.route('/transacao/<int:id>', methods=['PUT'])
def update_transacao(id):
    data = request.get_json()
    id_carteira_origem = data.get("id_carteira_origem")
    id_carteira_destino = data.get("id_carteira_destino")
    id_criptoativo = data.get("id_criptoativo")
    quantidade = data.get("quantidade")
    tipo = data.get("tipo")

    if not id_criptoativo or not quantidade or not tipo:
        return jsonify({"error": "Missing required fields"}), 400

    if tipo not in ["compra", "venda", "transferencia"]:
        return jsonify({"error": "Invalid transaction type"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE transacao 
                SET id_carteira_origem = %s, id_carteira_destino = %s, id_criptoativo = %s, 
                    quantidade = %s, tipo = %s
                WHERE id = %s;
                """,
                (id_carteira_origem, id_carteira_destino, id_criptoativo, quantidade, tipo, id),
            )
            conn.commit()
        conn.close()
        return jsonify({"message": "Transação atualizada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

# DELETE: Remove a transaction
@transacao_bp.route('/transacao/<int:id>', methods=['DELETE'])
def delete_transacao(id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM transacao WHERE id = %s;", (id,))
            conn.commit()
        conn.close()
        return jsonify({"message": "Transação apagada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500
