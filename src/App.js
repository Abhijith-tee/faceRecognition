import React from 'react';

import Clarifai from 'clarifai';
import Particles from 'react-particles-js';

import Navigation from './components/navigation/navigation.component';
import Logo from './components/logo/logo.component';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm.component';
import Rank from './components/Rank/rank.component';

import './App.css';

const app = new Clarifai.App({
  apiKey: 'c3d15756d4aa40b48a79bc565bf40584'
});

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('click');
    app.models.predict("a403429f2ddf4b49b307e318f00e528b",
     "https://samples.clarifai.com/face-det.jpg").then(
      function(response) {
        console.log(response);
      },
      function(err) {

      }
    );
  }

  render() {
    return (
      <div className='App'>
        <Particles className='particles'
        params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        {/*
        <FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
