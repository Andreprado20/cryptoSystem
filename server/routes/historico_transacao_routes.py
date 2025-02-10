from flask import Blueprint, request, jsonify
from database import get_db_connection

historico_transacao_bp = Blueprint('historico_transacao', __name__)

@historico_transacao_bp.route('/historico_transacao', methods=['GET'])
def getHistoricoTransacoes():
    historicoTransacaoId = request.args.get('id')
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Não foi possível se conectar ao Banco de Dados!"}), 500
    
    try:
        with conn.cursor() as cur:
            if historicoTransacaoId:
                cur.execute(""" SELECT t.id AS transacao_id, 
                                    co.nome AS carteira_origem, 
                                    cd.nome AS carteira_destino, 
                                    cr.nome AS criptoativo, 
                                    t.quantidade, 
                                    t.tipo,
                                    t.data
                                FROM "transacao" t
                                LEFT JOIN "carteira" co ON t.id_carteira_origem = co.id
                                LEFT JOIN "carteira" cd ON t.id_carteira_destino = cd.id
                                JOIN "criptoativo" cr ON t.id_criptoativo = cr.id
                                WHERE t.id = %s; """, (historicoTransacaoId,))
                historico_transacao = cur.fetchone()
                if not historico_transacao:
                    return jsonify({"error": "Transação não Encontrada!"}), 404
            else:
                cur.execute(""" SELECT t.id AS transacao_id, 
                                    co.nome AS carteira_origem, 
                                    cd.nome AS carteira_destino, 
                                    cr.nome AS criptoativo, 
                                    t.quantidade, 
                                    t.tipo, 
                                    t.data
                                FROM "transacao" t
                                LEFT JOIN "carteira" co ON t.id_carteira_origem = co.id
                                LEFT JOIN "carteira" cd ON t.id_carteira_destino = cd.id
                                JOIN "criptoativo" cr ON t.id_criptoativo = cr.id; """)
                historico_transacao = cur.fetchall()
        conn.close()
        return jsonify(historico_transacao), 200
    except Exception as e:
        conn.close()
        return jsonify({"error": str(e)}), 500