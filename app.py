from flask import Flask, render_template, jsonify, url_for, json
import numpy as np
import os

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/mapdata")
def mapdata(): 
    
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, "static/data", "united_states.json")
    usdata = json.load(open(json_url))
    
    return usdata

if __name__ == "__main__":
    app.run(debug=True)