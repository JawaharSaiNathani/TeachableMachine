import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Cicg from './pages/Image_Classification/CICG/CICG';
import Main from './main';
import Image_Classification_HomePage from './pages/Image_Classification/index';
import Object_Detection from './pages/Object_Detection/App';
import DogCat from './pages/Image_Classification/DogCat/App';
import RickMorty from './pages/Image_Classification/RickMorty/App';
import reportWebVitals from './reportWebVitals';
import { Route,Switch, BrowserRouter as Router } from 'react-router-dom';

function Index() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/Image_Classification" exact component={Image_Classification_HomePage} />
        <Route path="/Object_Detection" exact component={Object_Detection} />
        <Route path="/Image_Classification/dog_cat_classifier" exact component={DogCat} />
        <Route path="/Image_Classification/rick_morty_classifier" exact component={RickMorty} />
        <Route path="/Image_Classification/custom_image_classifier" exact component={Cicg} />
      </Switch>
    </Router>
  )
}

ReactDOM.render( <Index /> ,
    document.getElementById('root')
);

reportWebVitals();