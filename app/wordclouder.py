from wordcloud import WordCloud
from wordcloud import ImageColorGenerator
import cv2
    
theme_files = {"Software Engineering" : "./app/words/Software Engineering.txt"}

def load_text(word_theme) :

    file_name = theme_files[word_theme]

    with open(file_name, 'r', encoding="utf8") as f :
        return f.read()

def preprocess(image) :
    return image

def get_wordcloud(image, word_theme, background_opacity) :

    mask = preprocess(image)

    mask_colors = ImageColorGenerator(image)
    text = load_text(word_theme)

    wc = WordCloud(# stopwords=STOPWORDS, #font_path=font_path,
                    mask=mask, background_color="white",
                    max_words=10000, max_font_size=128,
                    random_state=42, width=mask.shape[1],
                    height=mask.shape[0], color_func=mask_colors)
    wc.generate(text)
    wc_img = wc.to_array()

    return (1 - background_opacity) * wc_img + background_opacity * image