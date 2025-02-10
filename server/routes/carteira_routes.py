from flask import Blueprint, request, jsonify
from database import get_db_connection

# Blueprint for carteira routes
carteira_bp = Blueprint('carteira', __name__)

# GET all carteiras or a specific one by ID
@carteira_bp.route('/carteiras', methods=['GET'])
def get_carteiras():
    carteira_id = request.args.get('id')  # Optional ID query param
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            if carteira_id:
                cur.execute("SELECT * FROM carteira WHERE id = %s;", (carteira_id,))
                carteira = cur.fetchone()
                if not carteira:
                    return jsonify({"error": "Carteira not found"}), 404
            else:
                cur.execute("SELECT * FROM carteira;")
                carteira = cur.fetchall()
        conn.close()
        return jsonify(carteira), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

# POST: Create a new carteira
@carteira_bp.route('/carteiras', methods=['POST'])
def create_carteira():
    data = request.get_json()
    nome = data.get("nome")
    id_usuario = data.get("id_usuario")

    if not nome or not id_usuario:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO carteira (nome, id_usuario) VALUES (%s, %s) RETURNING id;",
                (nome, id_usuario),
            )
            carteira_id = cur.fetchone()["id"]
            conn.commit()
        conn.close()
        return jsonify({"message": "Carteira created successfully", "id": carteira_id}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

# PUT: Update a carteira
@carteira_bp.route('/carteiras/<int:id>', methods=['PUT'])
def update_carteira(id):
    data = request.get_json()
    nome = data.get("nome")
    id_usuario = data.get("id_usuario")

    if not nome or not id_usuario:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE carteira SET nome = %s, id_usuario = %s WHERE id = %s;",
                (nome, id_usuario, id),
            )
            conn.commit()
        conn.close()
        return jsonify({"message": "Carteira atualizada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

# DELETE: Delete a carteira
@carteira_bp.route('/carteiras/<int:id>', methods=['DELETE'])
def delete_carteira(id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM carteira WHERE id = %s;", (id,))
            conn.commit()
        conn.close()
        return jsonify({"message": "Carteira apagada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500
