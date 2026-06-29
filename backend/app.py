from app import create_app
from app.db import db

app = create_app()


def print_initialized_models():
    model_names = sorted(
        mapper.class_.__name__
        for mapper in db.Model.registry.mappers
        if hasattr(mapper.class_, "__tablename__")
    )
    print("Initialized Bloc models:")
    for model_name in model_names:
        print(f" - {model_name}")


if __name__ == "__main__":
    print_initialized_models()
    app.run(host="0.0.0.0", port=3000)
