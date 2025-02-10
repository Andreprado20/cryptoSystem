from flask import Flask, Blueprint, request, jsonify
from database import get_db_connection

usuario_bp = Blueprint('usuario', __name__)

# GET endpoint to retrieve all users
@usuario_bp.route('/usuarios', methods=['GET'])
def get_users():
    usuario_id = request.args.get('id')
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            if usuario_id:
                cur.execute("SELECT id, nome, login FROM usuario WHERE id = %s;", (usuario_id))
                user = cur.fetchone()
                if not user:
                    return jsonify({"error" : "Usuário não encontrado!"}), 404
            else:    
                cur.execute("SELECT id, nome, login FROM usuario;")
                user = cur.fetchall()
        conn.close()
        return jsonify(user), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

# POST endpoint to add a new user
@usuario_bp.route('/usuarios', methods=['POST'])
def add_user():
    data = request.get_json()
    nome = data.get("nome")
    login = data.get("login")
    senha = data.get("senha")

    if not nome or not login or not senha:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO usuario (nome, login, senha)
                VALUES (%s, %s, %s)
                RETURNING id;
                """,
                (nome, login, senha),
            )
            user_id = cur.fetchone()["id"]
            conn.commit()
        conn.close()
        return jsonify({"message": "Usuário adicionado com sucesso!", "id": user_id}), 201
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500
    
@usuario_bp.route('/usuarios/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    nome = data.get("nome")
    login = data.get("login")
    senha = data.get("senha")

    if not nome or not login or not senha:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE usuario
                SET nome = %s, login = %s, senha = %s
                WHERE id = %s;
                """,
                (nome, login, senha, id),
            )
            if cur.rowcount == 0:
                return jsonify({"error": "Usuário não encontrado!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Usuário atualizado com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500

# DELETE endpoint to remove a user
@usuario_bp.route('/usuarios/<int:id>', methods=['DELETE'])
def delete_user(id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM usuario WHERE id = %s;", (id,))
            if cur.rowcount == 0:
                return jsonify({"error": "Usuário não encontrado!"}), 404
            conn.commit()
        conn.close()
        return jsonify({"message": "Usuário deletado com sucesso!"}), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500