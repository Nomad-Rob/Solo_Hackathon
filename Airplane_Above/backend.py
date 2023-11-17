from flask import Flask, jsonify, render_template, abort
from opensky_api import OpenSkyApi
from requests.exceptions import ReadTimeout

app = Flask(__name__)
api = OpenSkyApi()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/nearest-aircraft', methods=['GET'])
def nearest_aircraft():
    lat = 36.1467687  # Your latitude
    lon = -95.9721628 # Your longitude
    bbox = (lat-1, lat+1, lon-1, lon+1)  # 1 degree bounding box

    try:
        states = api.get_states(bbox=bbox)
        aircrafts = [{'icao24': state.icao24,
                      'callsign': state.callsign,
                      'country': state.origin_country,
                      'longitude': state.longitude,
                      'latitude': state.latitude,
                      'altitude': state.baro_altitude,
                      'squawk': state.squawk,
                      'velocity': state.velocity,
                      'vertical_rate': state.vertical_rate,}
                     for state in states.states]
        return jsonify(aircrafts)
    except ReadTimeout:
        return jsonify({'error': 'The request to OpenSky timed out.'}), 504
    
if __name__ == '__main__':
    app.run(debug=True)
