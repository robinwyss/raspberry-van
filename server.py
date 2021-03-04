from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/mppt")
def mppt():
    return {
        "solarVoltage": 36,
        "solarCurrent": 5.4,
        "batteryVoltage": 13.3,
        "chargingCurrent": 10}

@app.route("/climate")
def climate():
    return {
        "temperature": 21
    }

if __name__ == "__main__":
    app.run()
