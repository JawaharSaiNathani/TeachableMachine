from Image_Classification.custom.model import training_model, evaluating_custom_model
from Image_Classification.catVSdog.model import catVSdog
from Image_Classification.rickVSmorty.model import rickVSmorty
from Object_Detection.model import object_Detection
from flask import Flask, request, jsonify, send_file, make_response
import os
import shutil

app = Flask(__name__)

# post method for training custom image classification model.
@app.route('/api/custom/train', methods=['POST'])
def custom_train():

    # make sure Dataset directory is empty.
    shutil.rmtree("Image_Classification/custom/Dataset")
    os.mkdir("Image_Classification/custom/Dataset")

    # convert files recieved from request into directory.
    images = request.files.to_dict()

    folder_no = 1
    folder_loc = "Image_Classification/custom/Dataset/1/"
    os.mkdir("Image_Classification/custom/Dataset/1")

    # store images in specific directories, such that it can be used to train model.
    for image in images:
        
        if(image[0] != str(folder_no)):

            folder_no += 1
            os.mkdir("Image_Classification/custom/Dataset/"+str(folder_no))
            folder_loc = "Image_Classification/custom/Dataset/" + str(folder_no) + "/"

        file_name = images[image].filename
        images[image].save(folder_loc+file_name)

    epochs = 0
    class_names = []
    no_of_images = []

    # load required params from request.
    infos = request.form.to_dict()

    for info in infos:
        items = info.split("_")
        if items[0] == 'epochs':
            epochs = int(infos[info])
        elif items[1] == 'name':
            class_names.append(infos[info])
        elif items[1] == 'images':
            no_of_images.append(int(infos[info]))

    # train custom model.
    print(training_model(epochs,class_names,no_of_images))

    # send response to the client.
    data = {'result': 'Trained Model Successfully'}

    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

# post request to evaluate the trained custom model.
@app.route('/api/custom/evaluate', methods=['POST'])
def custom_evaluate():

    # convert files recieved from request into directory.
    test_images = request.files.to_dict()
    evaluating_file_name = ""

    # save the image that has to be evaluated in a specific directory.
    for image in test_images:

        file_name = test_images[image].filename
        evaluating_file_name = file_name
        test_images[image].save('Image_Classification/custom/evaluating_images/'+file_name)

    # evaluate the model.
    data = evaluating_custom_model(evaluating_file_name)

    # remove the saved image( just to save storage. ).
    for image in test_images:

        file_name = test_images[image].filename
        os.remove('Image_Classification/custom/evaluating_images/'+file_name)

    # send the response( class names and respective percentages ) to the client.
    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

# post request to evaluate the trained cat vs dog model.
@app.route('/api/catVSdog/evaluate', methods=['POST'])
def catvsdog():

    # convert files recieved from request into directory.
    test_images = request.files.to_dict()
    evaluating_file_name = ""

    # save the image that has to be evaluated in a specific directory.
    for image in test_images:

        file_name = test_images[image].filename
        evaluating_file_name = file_name
        test_images[image].save('Image_Classification/catVSdog/evaluating_images/'+file_name)

    # evaluate the image.
    data = catVSdog(evaluating_file_name)

    # remove the saved image( just to save storage. ).
    for image in test_images:

        file_name = test_images[image].filename
        os.remove('Image_Classification/catVSdog/evaluating_images/'+file_name)

    # send the response( class names and respective percentages ) to the client.
    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/api/rickVSmorty/evaluate', methods=['POST'])
def rickvsmorty():

    # convert files recieved from request into directory.
    test_images = request.files.to_dict()
    evaluating_file_name = ""

    # save the image that has to be evaluated in a specific directory.
    for image in test_images:

        file_name = test_images[image].filename
        evaluating_file_name = file_name
        test_images[image].save('Image_Classification/rickVSmorty/evaluating_images/'+file_name)

    # evaluate the image.
    data = rickVSmorty(evaluating_file_name)

    # remove the saved image( just to save storage. ).
    for image in test_images:

        file_name = test_images[image].filename
        os.remove('Image_Classification/rickVSmorty/evaluating_images/'+file_name)

    # send the response (class names and respective percentages) to the client.
    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/api/object_detection/detect', methods=['POST'])
def obd():

    shutil.rmtree("Object_Detection/detecting_images")
    os.mkdir("Object_Detection/detecting_images")

    # convert files recieved from request into directory.
    test_images = request.files.to_dict()
    evaluating_file_name = ""

    # save the image that has to be evaluated in a specific directory.
    for image in test_images:

        file_name = test_images[image].filename
        evaluating_file_name = file_name
        test_images[image].save('Object_Detection/detecting_images/image.jpg')

    # remove the spaces from name of image file (useful for creating URL for image saved after detecting objects).
    evaluating_file_name = evaluating_file_name.split(' ')
    temp = ''
    for x in evaluating_file_name:
        temp += x

    evaluating_file_name = temp

    # Actual detection.
    print(object_Detection(evaluating_file_name))

    # send file name (used for rendering image saved after detection) as response to client.
    data = {'result': evaluating_file_name}

    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

# get request to render image produced adter detecting objects in it.
@app.route('/detected_images/<string:pid>')
def get_image(pid):

    # send image produced after detecting objects, by encoding it into base64 format, as response to client.
    response = make_response(send_file(
        'Object_Detection/detecting_images/'+pid,
        mimetype='image/jpg',
        ))
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == '__main__':
    app.run(debug=True)