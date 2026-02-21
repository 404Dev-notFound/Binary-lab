from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__, template_folder="templates", static_folder="templates")

# Serve index.html
@app.route("/")
def home():
    return send_from_directory(app.template_folder, "index.html")

# Serve CSS and JS from same templates folder
@app.route("/")
def serve_static_files(filename):
    return send_from_directory(app.template_folder, filename)

# Convert route
@app.route("/convert", methods=["POST"])
def convert():
    data = request.get_json()

    if not data or "text" not in data or "mode" not in data:
        return jsonify({
            "error": "Invalid input"
        }), 400

    text = data.get("text", "")
    mode = int(data.get("mode", 32))

    if not text.strip():
        return jsonify({
            "binary": "",
            "characters": 0,
            "bits": 0,
            "blocks": 0,
            "architecture": mode
        })

    # Convert each character to 8-bit binary
    binary_string = "".join(format(ord(char), "08b") for char in text)

    total_characters = len(text)
    total_bits = len(binary_string)

    # Split into architecture-sized blocks
    blocks = []
    for i in range(0, total_bits, mode):
        block = binary_string[i:i + mode]
        if len(block) < mode:
            block = block.ljust(mode, "0")
        blocks.append(block)

    formatted_binary = "\n\n".join(blocks)
    total_blocks = len(blocks)

    return jsonify({
        "binary": formatted_binary,
        "characters": total_characters,
        "bits": total_bits,
        "blocks": total_blocks,
        "architecture": mode
    })

if __name__ == "__main__":
    app.run(debug=True)
