import React from 'react';

import Navigation from './components/navigation/navigation.component';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Navigation />
        {/*<Logo />
        <ImageLinkForm />
        <FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
