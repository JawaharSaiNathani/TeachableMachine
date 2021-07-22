from keras.models import load_model
import cv2

def catVSdog(file_name):

    #load required image and preprocess it.
    img_path = 'Image_Classification/catVSdog/evaluating_images/'+file_name
    img = cv2.imread(img_path)                         #load image
    img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)          #convert black and white image to RGB image.
    img = cv2.resize(img,(256,256))                    #resize image to size used while training model.
    img = img.reshape(1,256,256,-1)                    #reshape the image array to 1d array.
    img = img/255                                      #normalise the image array.

    model = load_model('Image_Classification/catVSdog/catVSdog.h5')     #load the pre-trained model.

    pred = model.predict(img)       #predict the image.

    return { 'cat' : str(100-int(100*pred[0][0])) , 'dog' : str(int(100*pred[0][0]))}

if __name__ == "__main__":
    print("This program doesn't work on its own. Please run the root program for cat VS dog Classification.")
