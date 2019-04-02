import React, { Component } from 'react';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import fire from './firebase.js'


class App extends Component {
  state = { userLocation: { lat: 32, lng: 32 }, loading: true };

  
  componentDidMount(props) {
    
    const firebaseRef = fire.database().ref('user')

    navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        
        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        }); 
        // Skickar location till firebase
                const item = {
                  location: this.state.userLocation
                }
              
                firebaseRef.push(item);
      },
      () => {
        this.setState({ loading: false });
      }
    );
  }

  render() {
    console.log(this.state.userLocation)
    const { loading, userLocation } = this.state;
    const { google } = this.props;



    if (loading) {
      return null;
    }

    return <Map google={google} initialCenter={userLocation} zoom={15}>
    <Marker
      position = {userLocation}
      icon="https://www.robotwoods.com/dev/misc/bluecircle.png"
      />
    </Map>
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBIvD8kOI5sxcZPcNQDtRplslCRcf2Jm_8")
})(App)