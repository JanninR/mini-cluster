from flask import Flask, jsonify, redirect, url_for
import os, requests

# Lee las URLs desde la variable de entorno NODES (separadas por coma)
NODE_URLS = [u.strip() for u in os.getenv("NODES", "").split(",") if u.strip()]

app = Flask(__name__)

@app.route("/status")
def status():
    resultado = []
    for url in NODE_URLS:
        try:
            r = requests.get(f"{url}/health", timeout=2)
            ok = r.json().get("status") == "healthy"
            estado = "healthy" if ok else "error"
        except Exception:
            estado = "down"
        resultado.append({"url": url, "status": estado})
    return jsonify(resultado)

@app.route("/")
def home():
    # return "Monitor en línea. Revisa /status para ver los nodos."
    return redirect(url_for("status"))