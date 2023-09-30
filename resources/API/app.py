import webbrowser
from flask import Flask, jsonify
import json

app = Flask(__name__)

# Load data from the JSON file
def load_data_from_json():
    with open('stock.json', 'r') as json_file:
        data = json.load(json_file)
    return data

# Define a route to get the entire dataset
@app.route('/api/stock_data')
def get_stock_data():
    data = load_data_from_json()
    return jsonify(data)

# Define a route to get data for a specific date (by index)
@app.route('/api/stock_data/<int:index>')
def get_stock_data_by_index(index):
    data = load_data_from_json()
    if 0 <= index < len(data):
        return jsonify(data[index])
    else:
        return jsonify({"error": "Index out of range"}), 404

if __name__ == '__main__':
    # Open Chrome browser to test the API
    webbrowser.open_new_tab('http://127.0.0.1:5000/api/stock_data')
    app.run(debug=True)
