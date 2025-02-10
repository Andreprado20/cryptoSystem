from flask import Blueprint, request, jsonify
from database import get_db_connection

# Blueprint for criptoativo routes
criptoativo_bp = Blueprint('criptoativo', __name__)

# GET all criptoativos or a specific one by ID
@criptoativo_bp.route('/criptoativos', methods=['GET'])
def get_criptoativos():
    cripto_id = request.args.get('id')  # Optional ID query param
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            if cripto_id:
                cur.execute("SELECT * FROM criptoativo WHERE id = %s;", (cripto_id,))
                criptoativo = cur.fetchone()
                if not criptoativo:
                    return jsonify({"error": "Criptoativo not found"}), 404
            else:
                cur.execute("SELECT * FROM criptoativo;")
                criptoativo = cur.fetchall()
        conn.close()
        return jsonify(criptoativo), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

# POST: Create a new criptoativo
@criptoativo_bp.route('/criptoativos', methods=['POST'])
def create_criptoativo():
    data = request.get_json()
    nome = data.get("nome")
    codigo = data.get("codigo")
    preco = data.get("preco")

    if not nome or not codigo or preco is None:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO criptoativo (nome, codigo, preco) VALUES (%s, %s, %s) RETURNING id;",
                (nome, codigo, preco),
            )
            cripto_id = cur.fetchone()["id"]
            conn.commit()
        conn.close()
        return jsonify({"message": "Criptoativo created successfully", "id": cripto_id}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

# PUT: Update a criptoativo
@criptoativo_bp.route('/criptoativos/<int:id>', methods=['PUT'])
def update_criptoativo(id):
    data = request.get_json()
    nome = data.get("nome")
    codigo = data.get("codigo")
    preco = data.get("preco")

    if not nome or not codigo or preco is None:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE criptoativo SET nome = %s, codigo = %s, preco = %s WHERE id = %s;",
                (nome, codigo, preco, id),
            )
            conn.commit()
        conn.close()
        return jsonify({"message": "Criptoativo atualizada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

# DELETE: Delete a criptoativo
@criptoativo_bp.route('/criptoativos/<int:id>', methods=['DELETE'])
def delete_criptoativo(id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM criptoativo WHERE id = %s;", (id,))
            conn.commit()
        conn.close()
        return jsonify({"message": "Criptoativo apagada com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500
