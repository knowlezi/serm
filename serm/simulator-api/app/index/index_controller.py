from app import app


@app.route('/')
def index():
    return 'Simulating the Effects of Releasing Malware'