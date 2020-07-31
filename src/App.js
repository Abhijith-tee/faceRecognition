import React from 'react';

import Navigation from './components/navigation/navigation.component';
import Logo from './components/logo/logo.component';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm.component';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Navigation />
        <Logo />
        <ImageLinkForm />
        {/*
        <FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
