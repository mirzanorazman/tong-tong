from PIL import Image
from PIL import ImageFilter
from pytesseract import image_to_string
import pytesseract
import re
import json

def process_image(file):
    image = _get_image(file)
    width, height = image.size

    # rotate image if taken from camera
    if width > 1000:
        image = image.transpose(Image.ROTATE_270)

    # resize image
    basewidth = 450
    wpercent = (basewidth / float(image.size[0]))
    hsize = int((float(image.size[1]) * float(wpercent)))
    image = image.resize((basewidth, hsize), Image.ANTIALIAS)

    # pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract'
    # TESSDATA_PREFIX = 'C:/Program Files (x86)/Tesseract-OCR'
    pytesseract.pytesseract.tesseract_cmd = r'/usr/local/Cellar/tesseract/4.1.0/bin/tesseract'
    image = image.filter(ImageFilter.SHARPEN)
    output = pytesseract.image_to_string(image)

    # parse text into vector
    receipt = list(filter(None, output.splitlines()))

    data = {}
    data['items'] = []

    i = 1
    for item in receipt:
        #m = re.search(r"^.*\${1}", item)
        clean = item.replace(",", ".")
        n = re.search(r"\d+\.{1}\d{2}", clean)
        m = re.search(r"^.*\d+\.{1}\d{2}", clean)
        
        if m:
            start = n.start()
            end = n.end()

            # clean item description
            title = clean[0:start].replace("$", "")
            title = re.sub(r'[^a-zA-Z\d\s:]+', '', title).strip().lower().capitalize()

            price = float(clean[start:end])
            data['items'].append({ 'id' : i, 'name' : title, 'price' : price })
            i += 1

    # with open('items.json', 'w') as outfile:
    #     json.dump(data, outfile)

    return data

def _get_image(file):
    return Image.open(file)