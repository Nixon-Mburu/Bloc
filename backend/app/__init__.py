from flask import Flask
from flask_cors import CORS

from app.config import Config
from app.db import db
from app.models import import_models
from app.routes.auth_routes import auth_bp
from app.routes.customer_routes import customer_bp
from app.routes.health_routes import health_bp
from app.routes.merchant_routes import merchant_bp
from app.routes.payment_routes import payment_bp
from app.routes.search_routes import search_bp
from app.routes.settings_routes import settings_bp


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app, resources={r"/api/*": {"origins": app.config["FRONTEND_URL"]}})
    db.init_app(app)
    import_models()

    app.register_blueprint(health_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(customer_bp)
    app.register_blueprint(merchant_bp)
    app.register_blueprint(payment_bp)
    app.register_blueprint(search_bp)
    app.register_blueprint(settings_bp)

    @app.cli.command("init-db")
    def init_db():
        db.create_all()
        print("Bloc backend tables created.")

    return app
