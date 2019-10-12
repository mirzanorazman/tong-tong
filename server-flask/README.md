# tong-tong server

Built fully in Python 3 using [Flask](https://palletsprojects.com/p/flask/).

## Installation

Install a virtual enviroment like [Conda](https://conda.io/en/latest/) or [Virtualenv](https://virtualenv.pypa.io/en/latest/). This guide suggests [Conda](https://conda.io/en/latest/).

```bash
conda create --name NAME_OF_VIR_ENV python=3
pip install -r requirements.txt
```

You have to install [Tesseract](https://github.com/tesseract-ocr/tesseract) on your computer. On Mac, you can use [homebrew](https://brew.sh).

```bash
brew install tesseract
```

Then, navigate to app.py, and replace pytesseract.pytesseract.tesseract_cmd with your local path to tessaract's bin. Here's how you find the path on Mac:

```bash
brew list tesseract

# this outputs something like this: /usr/local/Cellar/tesseract/4.1.0/bin/tesseract
```

## Run

```bash
python app.py
```

and open localhost:5000 for output.
