# similar to catVSdog model.py refer that file for detailed understanding of code.
from keras.models import load_model
import cv2

def rickVSmorty(file_name):

    img_path = 'Image_Classification/rickVSmorty/evaluating_images/'+file_name
    img = cv2.imread(img_path)
    img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
    img = cv2.resize(img,(256,256))
    img = img.reshape(1,256,256,-1)
    img = img/255

    model = load_model('Image_Classification/rickVSmorty/rickVSmorty.h5')

    pred = model.predict(img)

    return { 'morty' : str(100-int(100*pred[0][0])) , 'rick' : str(int(100*pred[0][0]))}

if __name__ == "__main__":
    print("This program doesn't work on its own. Please run the root program for rick VS morty classification.")