from flask import Blueprint, request, jsonify
from database import get_db_connection

# Blueprint for carteira_cripto routes
carteira_cripto_bp = Blueprint('carteira_cripto', __name__)

# GET all relations or specific by carteira_id or criptoativo_id
@carteira_cripto_bp.route('/carteira_cripto', methods=['GET'])
def get_carteira_cripto():
    carteira_id = request.args.get('id_carteira')
    criptoativo_id = request.args.get('id_criptoativo')
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            if carteira_id and criptoativo_id:
                cur.execute(
                    """
                    SELECT * FROM carteira_cripto 
                    WHERE id_carteira = %s AND id_criptoativo = %s;
                    """,
                    (carteira_id, criptoativo_id),
                )
                result = cur.fetchone()
                if not result:
                    return jsonify({"error": "Relation not found"}), 404
            elif carteira_id:
                cur.execute(
                    "SELECT * FROM carteira_cripto WHERE id_carteira = %s;", (carteira_id,)
                )
                result = cur.fetchall()
            elif criptoativo_id:
                cur.execute(
                    "SELECT * FROM carteira_cripto WHERE id_criptoativo = %s;", (criptoativo_id,)
                )
                result = cur.fetchall()
            else:
                cur.execute("SELECT * FROM carteira_cripto;")
                result = cur.fetchall()
        conn.close()
        return jsonify(result), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

# POST: Add a new relation
@carteira_cripto_bp.route('/carteira_cripto', methods=['POST'])
def create_carteira_cripto():
    data = request.get_json()
    id_carteira = data.get("id_carteira")
    id_criptoativo = data.get("id_criptoativo")
    quantidade = data.get("quantidade", 0)

    if not id_carteira or not id_criptoativo or quantidade is None:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO carteira_cripto (id_carteira, id_criptoativo, quantidade) 
                VALUES (%s, %s, %s);
                """,
                (id_carteira, id_criptoativo, quantidade),
            )
            conn.commit()
        conn.close()
        return jsonify({"message": "Relation added successfully"}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

# PUT: Update an existing relation
@carteira_cripto_bp.route('/carteira_cripto', methods=['PUT'])
def update_carteira_cripto():
    data = request.get_json()
    id_carteira = data.get("id_carteira")
    id_criptoativo = data.get("id_criptoativo")
    quantidade = data.get("quantidade")

    if not id_carteira or not id_criptoativo or quantidade is None:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE carteira_cripto 
                SET quantidade = %s 
                WHERE id_carteira = %s AND id_criptoativo = %s;
                """,
                (quantidade, id_carteira, id_criptoativo),
            )
            conn.commit()
        conn.close()
        return jsonify({"message": "Relation atualizada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

# DELETE: Remove a relation
@carteira_cripto_bp.route('/carteira_cripto', methods=['DELETE'])
def delete_carteira_cripto():
    data = request.get_json()
    id_carteira = data.get("id_carteira")
    id_criptoativo = data.get("id_criptoativo")

    if not id_carteira or not id_criptoativo:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                DELETE FROM carteira_cripto 
                WHERE id_carteira = %s AND id_criptoativo = %s;
                """,
                (id_carteira, id_criptoativo),
            )
            conn.commit()
        conn.close()
        return jsonify({"message": "Relation apagada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500
