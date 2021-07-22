# Overview

App mainly consists of 2 Parts.
- Image Classification
- Object Detection
### Image Classification
Image classification is divided into 3 parts.
- catVSdog classification - user can upload an image and classify it between cat and dog.
- rickVSmorty classification  - user can upload an image and classify it between rick and morty.
- custom Image classifier - user can train his own custom Image classification model just by uploading images into desired classes, and can evaluate the trained model by uploading images.

### Object Detection
In Object Detection user can detect objects present in an Image just by uploading the image. This Object Detection is done using a ML model developed using Tensorflow-ObjectDetection API.

## Client

### Built with

- [ReactJs](https://reactjs.org) - JavaScript library for building user interfaces.
- [Material UI](https://material-ui.com/) - React component and styling library based on 'material design' by google.
- [Typescript](https://www.typescriptlang.org)  - Superset of javascript with support for types.

## Server

### Built with

- [Flask](https://flask.palletsprojects.com/en/1.1.x/)  - Python library for building and managing servers.
- [Tensorflow](https://www.tensorflow.org/) - Python library for building Machine Learning models.
- [Keras](https://keras.io/)  - Python library, subset of Tensorflow, for building Machine Learning models.
- [OpenCV](https://opencv.org/) - Python library for manipulating images.

### Prerequisites

- NodeJS JavaScript Runtime.
- Node Package Manager (npm).
- Git.
- python.

### Installing

A step by step series of examples that tell you how to get a development env running

```
git clone https://github.com/StrAnGe-7805/MegaMLProject.git
```

Frontend libraries Installation
```
cd frontend
npm install
```

Backend Libraries Installation
```
# Download and update Backend libraries and models from Google Drive at their respective paths. If you still run into any trouble run the following commands.
cd Backend
source bin/activate
pip install -r requirements.txt
```

### Running the application (locally)

To start ReactJs client(frontend)
```
cd frontend
npm start
```
To start Flask Server(Backend)
```
cd Backend
source bin/activate
python app.py
```

Download catVSdog and rickVSmorty models from Google Drive into paths mentioned below.

- catVSdog  - ``` Backend/Image_Classification/catVSdog/```
- rickVSmorty - ```Backend/Image_Classification/rickVSmorty/```
