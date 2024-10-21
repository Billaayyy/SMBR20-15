from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')  # Serve index.html from the current directory

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)  # Serve other files from the current directory

if __name__ == '__main__':
    app.run(debug=True)
