from flask import Flask, render_template, jsonify, url_for, json
import numpy as np
import os
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/foodwaste")
def foodwaste():
    return render_template("food_waste.html")

@app.route("/foodinsecurity")
def foodinsecurity():
    return render_template("food_insecurity.html")

@app.route("/dummydata")
def dummydata(): 
    
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, "static/data", "dummy_data.json")
    dummydata = json.load(open(json_url))
    
    return dummydata

@app.route("/mapdata")
def mapdata(): 
    
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, "static/data", "united_states.json")
    usdata = json.load(open(json_url))
    
    return usdata

@app.route("/realdata")
def realdata(): 

    # Read CSV
    df = pd.read_csv('static/data/MASTER.csv')

    # Year
    only2019 = df.loc[df['Year'] == 2019]

    # Rename DF columns 
    rename_only_2019 = only2019.rename({'Food Insecurity Rate (aggregate of counties)': 'Rates',
                                   ' Estimated Number Food Insecure Individuals ': 'Individuals'}, axis='columns')

    # Create New Data Frame
    df_almost_clean = rename_only_2019[["State Name", "Year", "State Abbreviation ","Rates","Individuals"]]

    # Strip %
    series = df_almost_clean['Rates'].str.strip('%')
    ratesframe = series.to_frame()
    rename_rates_frame = ratesframe.rename({'Rates':'RatesNum'}, axis='columns')
    rename_rates_frame['RatesNum'] = rename_rates_frame.RatesNum.astype(float)

    # Strip Comma From Numbers
    strip_comma = df_almost_clean['Individuals'].str.replace(',', '')
    individuals_frame_1 = strip_comma.to_frame()
    individuals_frame_1['Individuals'] = individuals_frame_1.Individuals.astype(int)

    # Add New Columns To DF
    df_almost_clean.insert(3,"RatesNum", rename_rates_frame, True)
    df_almost_clean.insert(5,"IndNum", individuals_frame_1, True)

    # Drop Columns 
    df_almost_clean1 = df_almost_clean.drop(columns=["Rates"])

    # Copy DF
    df_2019_cleanup = df_almost_clean1.copy()


    df_2019_cleanup['State Name'] = df_2019_cleanup['State Name'].replace({'South Dekota':'South Dakota', 'Minneapolis':'Minnesota'})
    
    df_2019_clean = df_2019_cleanup.copy()

    # Clean Data
    tojson = df_2019_clean.to_json(orient="table")
    results = json.loads(tojson)

    #########################################
    # Pull Other Data 
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, "static/data", "united_states.json")
    usdata = json.load(open(json_url))

    # Delete Puerto Rico
    for i in range(len(usdata["features"])): 
        if usdata['features'][i]['properties']['NAME'] == 'Puerto Rico':
            usdata['features'].pop(i)
            break
    # usdata['features'].pop(16)

    # Rename Washington D.C
    usdata['features'][25]['properties']['NAME'] = usdata['features'][25]['properties']['NAME'].replace('District of Columbia', 'Washington, D.C.')
    ##########################################

    Rates_Num_Array = []
    Ind_Num_Array = []
    Ind_String_Array = []

    for i in range(len(results["data"])):
        Rates_Num_Array.append(results['data'][i]['RatesNum'])
        Ind_Num_Array.append(results['data'][i]['IndNum'])
        Ind_String_Array.append(results['data'][i]['Individuals'])
    
    for i in range(len(usdata["features"])):
        for j in range(len(usdata["features"])):
            if usdata['features'][i]['properties']['NAME'] == results['data'][j]['State Name']:
                usdata['features'][i]['properties']['RatesNum'] = Rates_Num_Array[j]
                usdata['features'][i]['properties']['IndNum'] = Ind_Num_Array[j]
                usdata['features'][i]['properties']['IndString'] = Ind_String_Array[j]

    return usdata

if __name__ == "__main__":
    app.run(debug=True)