from flask import Flask, request, jsonify
import pytesseract
from PIL import Image
app = Flask(__name__)
from parse import process_image

pytesseract.pytesseract.tesseract_cmd = r'/usr/local/Cellar/tesseract/4.1.0/bin/tesseract'

# utility function: to check for valid files, only images
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def hello_world():
    response = jsonify({'data': 'Hello World!'})
    response.status_code = 201
    return response

@app.route('/upload_image', methods= ['POST'])
def upload_image():
    # check if the post request has the file part
    print (request.files)
    print (request.get_json())
    if 'file' not in request.files:
      response = jsonify({'message' : 'No file part in the request key'})
      response.status_code = 400
      return response
    
    file = request.files['file']

    # check if file not selected
    if file.filename == '':
      response = jsonify({'message' : 'No file selected for uploading'})
      response.status_code = 400
      return response
    
    # if file is valid
    if file and allowed_file(file.filename):
      # calls process_image to extract text from image into json
      output = process_image(file)      
      response = jsonify(output)
      response.status_code = 201
      return response
    
    # Check for other uncaught errors
    else:
      response = jsonify({'message' : 'Allowed file types are images: png, jpg, jpeg'})
      response.status_code = 400
      return response

@app.route('/mock_data', methods= ['GET'])
def mock_data():
    response = jsonify({
      "data": {
        "shareditem" : [
          {
            "itemid": 0,
            "name": "minyak masak",
            "price": 2.83
          },
          {
            "itemid": 1,
            "name": "cili kering",
            "price": 1.22
          },
          {
            "itemid": 2,
            "name": "telur",
            "price": 6.09
          }
        ],
        "personalitem": [
          {
            "nameid": 0,
            "name": "A",
            "items": [
              {
                "itemid": 0,
                "name": "roti gardenia",
                "price": 13.96
              },
              {
                "itemid": 1,
                "name": "ubat gigi colgate",
                "price": 3.75
              },
              {
                "itemid": 2,
                "name": "pisang tanduk",
                "price": 5.02
              }
            ]
          },
          {
            "nameid": 1,
            "name": "B",
            "items": [
              {
                "itemid": 0,
                "name": "kirkland pomegranate",
                "price": 1.43
              },
              {
                "itemid": 1,
                "name": "tropicana orange",
                "price": 2.36
              },
              {
                "itemid": 2,
                "name": "cadbury chocolate",
                "price": 0.74
              }
            ]
          },
          {
            "nameid": 2,
            "name": "C",
            "items": [
              {
                "itemid": 0,
                "name": "plastik sampah",
                "price": 6.66
              },
              {
                "itemid": 1,
                "name": "hawaian potato chips",
                "price": 5.55
              },
              {
                "itemid": 2,
                "name": "lays sour and cream",
                "price": 4.44
              }
            ]
          }
        ]
      }
      
    })
    response.status_code = 201
    return response
    
if __name__ == '__main__':
    app.debug = True
    app.run(host = '35.0.46.81')

# app.py
# from flask import Flask, request, jsonify
# app = Flask(__name__)

# @app.route('/getmsg/', methods=['GET'])
# def respond():
#     # Retrieve the name from url parameter
#     name = request.args.get("name", None)

#     # For debugging
#     print(f"got name {name}")

#     response = {}

#     # Check if user sent a name at all
#     if not name:
#         response["ERROR"] = "no name found, please send a name."
#     # Check if the user entered a number not a name
#     elif str(name).isdigit():
#         response["ERROR"] = "name can't be numeric."
#     # Now the user entered a valid name
#     else:
#         response["MESSAGE"] = f"Welcome {name} to our awesome platform!!"

#     # Return the response in json format
#     return jsonify(response)

# @app.route('/post/', methods=['POST'])
# def post_something():
#     param = request.form.get('name')
#     print(param)
#     # You can add the test cases you made in the previous function, but in our case here you are just testing the POST functionality
#     if param:
#         return jsonify({
#             "Message": f"Welcome {name} to our awesome platform!!",
#             # Add this option to distinct the POST request
#             "METHOD" : "POST"
#         })
#     else:
#         return jsonify({
#             "ERROR": "no name found, please send a name."
#         })

# # A welcome message to test our server
# @app.route('/')
# def index():
#     return "<h1>Welcome to our server !!</h1>"

# if __name__ == '__main__':
#     # Threaded option to enable multiple instances for multiple user access support
#     app.run(threaded=True, port=5000)