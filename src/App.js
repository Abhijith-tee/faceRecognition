import React from 'react';

import Clarifai from 'clarifai';
import Particles from 'react-particles-js';

import Navigation from './components/navigation/navigation.component';
import Logo from './components/logo/logo.component';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm.component';
import Rank from './components/Rank/rank.component';
import FaceRecognition from './components/Facerecognition/facerecognition.component';
import Signin from './components/signin/signin.component';
import Register from './components/Register/register.component';

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
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className='App'>
        <Particles className='particles'
        params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' 
        ?  <div>
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
         <FaceRecognition box={box} imageUrl={imageUrl} />
         </div>
        : (
          route === 'signin' ? 
          <Signin onRouteChange={this.onRouteChange} /> 
          :
          <Register onRouteChange={this.onRouteChange} />
        )
        }
      </div>
    );
  }
}

export default App;
