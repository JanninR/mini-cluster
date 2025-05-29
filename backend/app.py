from flask import Flask, jsonify
import os, socket

app = Flask(__name__)

@app.route("/")
def index():
    return jsonify({
        "msg": "Hola desde el backend",
        "host": socket.gethostname()
    })

@app.route("/health")
def health():
    return jsonify({"status": "healthy"})

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
