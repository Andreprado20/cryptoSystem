from flask import Flask
from flask_cors import CORS
from routes.carteira_routes import carteira_bp
from routes.criptoativo_routes import criptoativo_bp
from routes.usuario_routes import usuario_bp
from routes.carteira_cripto_routes import carteira_cripto_bp
from routes.transacao_routes import transacao_bp
from routes.historico_transacao_routes import historico_transacao_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(carteira_bp, url_prefix='/api')
app.register_blueprint(criptoativo_bp, url_prefix='/api')
app.register_blueprint(usuario_bp, url_prefix='/api')
app.register_blueprint(carteira_cripto_bp, url_prefix='/api')
app.register_blueprint(transacao_bp, url_prefix='/api')
app.register_blueprint(historico_transacao_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run()
