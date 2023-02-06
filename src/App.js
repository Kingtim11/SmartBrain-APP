import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ParticlesBg from 'particles-bg'

/*USER_ID = 'ityojvw8axin';
//Your PAT (Personal Access Token) can be found in the portal under Authentification:
const PAT = '8923f51c9fa74259a186d350d25893fa';

const APP_ID = 'eb407230b0164b2aaa22e9996628d533';
// Change these to whatever model and image URL you want to use:
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';*/

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'SignIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
constructor() {
  super();
  this.state = initialState;
  }


loadUser = (data) => {
  this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  }})
}

calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputImage');
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
  this.setState({box: box})
}

onInputChange = (event) => {
  this.setState({input: event.target.value});
}

onPictureSubmit = () => {
  this.setState({imageUrl: this.state.input});
  
    fetch('http://localhost:3000/imageUrl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
        .then(response => {
          if(response) {
            fetch('http://localhost:3000/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
          }
        this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log('error', err));
}

onRouteChange = (route) => {
  if (route === 'signout') {
    this.setState(initialState)
  } else if (route === 'home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route});
}

render() {
  const { isSignedIn, imageUrl, route, box } = this.state;
  return (
    <div className="App">
      <ParticlesBg color="#ffffff" num={150} type="cobweb" bg={true} />
      <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange} />
      { route === 'home' 
        ? <div>
            <Logo />
            <Rank 
              name = {this.state.user.name} 
              entries = {this.state.user.entries}
            />
            <ImageLinkForm 
              onInputChange = {this.onInputChange}
              onPictureSubmit = {this.onPictureSubmit}
            />
            <FaceRecognition box = {box} imageUrl = {imageUrl}/>
          </div>
        : ( 
          route === 'SignIn'
          ? <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
          : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
          ) 
        }
      </div>
    );
  }
};

export default App;