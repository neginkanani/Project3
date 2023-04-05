from flask import Flask, render_template, redirect, jsonify
import json


app = Flask(__name__)

# Initialize PyMongo to work with MongoDBs this is only valid on Negin's PC since she has the Mongo_db 
# conn = 'mongodb://localhost:27017'
# client = pymongo.MongoClient(conn)

# # Define database and collection

# # client.drop_database('brewery_db')
# db = client.brewery_db
# collection = db.brewery


# @app.route("/")
# def index():
#     db = client.brewery_db
#     collection = db.brewery
#     # find one document from our mongo db and return it.
#     data = list(collection.find())
#     for i in data:
#         print(i)
#         print("-------------------")
#     # pass that listing to render_template
#     return render_template("index.html", data_beer=data)


@app.route("/")
def index():
    with open('data/brewery_untappd_export_MD.json', 'r', encoding="utf8") as myfile:
        data_untappd = myfile.read()
        data_untappd = json.loads(data_untappd)
    return render_template("index.html", data_untappd=data_untappd)

@app.route("/api/brewery_untappd_export_MD.json")
def datajson():
    #connect to Mongodb databse
    with open('data/brewery_untappd_export_MD.json', 'r', encoding="utf8") as myfile:
        data_untappd = myfile.read()
        data_untappd= json.loads(data_untappd)

    return jsonify(data_untappd)


@app.route("/api/brewery_api_export_MD.json")
def dataapijson():
    #connect to Mongodb databse
    with open('data/brewery_api_export_MD.json', 'r', encoding="utf8") as myfile:
        data_api = myfile.read()
        data_api= json.loads(data_api)

    return jsonify(data_api)

@app.route("/api/brewery_api.geojson")
def datageojson():
    with open('data/brewery_api.geojson', 'r', encoding="utf8") as myfile:
        data_api = myfile.read()
        data_api= json.loads(data_api)

    return jsonify(data_api)


@app.route("/about.html")
def about_us():
    return render_template("about.html")


@app.route("/faq.html")
def faq():
    return render_template("faq.html")

@app.route("/bar_chartjs_lib.html")
def bar_chart():
    return render_template("bar_chartjs_lib.html")


@app.route("/breweries.html")
def breweries():
    return render_template("breweries.html")


if __name__ == "__main__":
    app.run(debug=True)
