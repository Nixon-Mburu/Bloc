from flask import Blueprint, request

from app.services.search_people import search_people
from app.utils.json_response import json_response

search_bp = Blueprint("search", __name__, url_prefix="/api")


@search_bp.get("/search")
def search():
    query = request.args.get("q", "")
    customer_id = request.args.get("customer_id", type=int)
    if not query.strip():
        return json_response({"customers": [], "merchants": [], "suggestions": []})

    return json_response(search_people(query=query, customer_id=customer_id))
