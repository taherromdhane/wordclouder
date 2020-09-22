from app import app
from flask import jsonify, abort, request, make_response, render_template, session, redirect, url_for
from app.wordclouder import get_wordcloud
from app.utils import json2im, im2json

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/get_wordcloud', methods=['POST'])
def wordclouding():
    if 'image' not in request.files:
        return make_response(jsonify({'error': '`image` field is required'}), 400)

    filestr = request.files['image'].read()
    image = json2im(filestr)

    word_theme = "Software Engineering"

    wordcloud_img = get_wordcloud(image, word_theme, 0.1)
    wordcloud_img_str = im2json(wordcloud_img)

    result = {"wordcloud": wordcloud_img_str}
    response = jsonify(result)

    return make_response(response, 200)