import os
import shutil
import keras
from keras.models import Sequential, load_model
from keras.layers import Dense,MaxPool2D,Conv2D,Flatten
import cv2

def get_batch_size(no_of_images):       #returns the batch size based on no of images.
    if no_of_images >= 20:
        return 16
    elif no_of_images >= 10:
        return 8
    elif no_of_images >= 2:
        return 2
    else:
        return 1

def data_generation(training_dir,class_mode,batch_size):           #returns train data and validation data by splitting the images from training directory.
    train_gen = keras.preprocessing.image.ImageDataGenerator(      #train data generator.
        rescale=1/255,                                             
        horizontal_flip=True,
        validation_split=0.2,                                      #remove this if validation data is not required.
    )
    train_data = train_gen.flow_from_directory(
        training_dir,
        batch_size=batch_size,
        color_mode="rgb",
        target_size=(256, 256),
        shuffle=True,
        class_mode=class_mode,                                     #it can be binary or categorical based no of classes.
        subset="training",                                         #remove this if validation data is not required.
    )

    validation_data = train_gen.flow_from_directory(
        training_dir,
        batch_size=8,
        color_mode="rgb",
        target_size=(256, 256),
        shuffle=True,
        class_mode=class_mode,
        subset="validation",                                       #remove this if validation data is not required.
    )

    return (train_data, validation_data)

def build_model(classes):                                          #returns the model structure.
    model = Sequential()

    model.add(Conv2D(64,3,1,input_shape=(256,256,3),activation='relu'))
    model.add(Conv2D(64,3,1,activation='relu'))
    model.add(MaxPool2D(pool_size=(2,2),strides=2))

    model.add(Conv2D(128,3,1,activation='relu'))
    model.add(Conv2D(128,3,1,activation='relu'))
    model.add(MaxPool2D(pool_size=(2,2),strides=2))

    model.add(Conv2D(256,3,1,activation='relu'))
    model.add(Conv2D(256,3,1,activation='relu'))
    model.add(MaxPool2D(pool_size=(2,2),strides=2))

    model.add(Flatten())
    model.add(Dense(128,activation='relu'))
    model.add(Dense(64,activation='relu'))

    if(classes == 2):
        model.add(Dense(1,activation='sigmoid'))
        model.compile(optimizer='adam',loss='binary_crossentropy',metrics=['accuracy'])
    else:
        model.add(Dense(3,activation='softmax'))
        model.compile(optimizer='adam',loss='categorical_crossentropy',metrics=['accuracy'])

    return model

def fit_model(model,train_data,validation_data,epochs):            #fit model to training and validation data and return the model.
    model.fit(train_data,epochs=epochs,validation_data=validation_data)
    return model

storing_class_names = []        #store class names and use them while evaluating model.
storing_model = ""              #store model and use it while evaluating.

def training_model(epochs,class_names,no_of_images):            #Train the model.
    global storing_model
    global storing_class_names

    storing_class_names = class_names

    class_mode = ""
    train_dir = "Image_Classification/custom/Dataset/"
    
    if len(class_names) == 2:
        class_mode = "binary"
    else:
        class_mode = "categorical"

    batch_size = get_batch_size(min(no_of_images))
    train_data, validation_data = data_generation(training_dir=train_dir,class_mode=class_mode,batch_size=batch_size)

    nn_model = build_model(len(class_names))

    nn_model = fit_model(nn_model,train_data=train_data,validation_data=validation_data,epochs=epochs)

    #Just to make sure the saved_model directory is empty.
    shutil.rmtree("Image_Classification/custom/saved_model")            
    os.mkdir("Image_Classification/custom/saved_model")

    storing_model = nn_model
    nn_model.save('Image_Classification/custom/saved_model/model.h5')

    return "model saved"


def evaluating_custom_model(file_name):         # Evaluate model.
    global storing_model
    global storing_class_names
    
    # load the image and pre-process it with dimensions used while training.
    img_path = 'Image_Classification/custom/evaluating_images/'+file_name
    img = cv2.imread(img_path)
    img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
    img = cv2.resize(img,(256,256))
    img = img.reshape(1,256,256,-1)
    img = img/255

    # load the model from saved_model directory if the model is lost.
    if storing_model == "":
        storing_model = load_model('Image_Classification/custom/saved_model/model.h5')

    #predict the image.
    pred = storing_model.predict(img)
    
    # categorise the result accordingly and return the response.
    if len(storing_class_names) == 0:
        return { 'result': '0' }
    elif len(storing_class_names) == 2:
        return { 'result': '1' , storing_class_names[0] : str(100-int(100*pred[0][0])) , storing_class_names[1] : str(int(100*pred[0][0]))}
    else:
        res = {'result': '0'}
        sum = 0
        for i in range(len(storing_class_names)-1):
            res[storing_class_names[i]] = str(int(100*(pred[0][i])))
            sum += int(100*(pred[0][i]))
        res[storing_class_names[-1]] = str(100-sum)
        return res


if __name__ == "__main__":
    print("This program doesn't work on its own. Please run the root program for Custom Image Classifier generation.")