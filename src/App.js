import React, { Component } from 'react';
import './App.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Circle } from 'google-maps-react';
import fire from './firebase.js'


class App extends Component {
  state = { userLocation: { lat: 32, lng: 32 }, secondUserLocation: { lat: 32, lng: 32 }, loading: true };


  constructor(props) {
    super(props);

    const db = fire.database();
    const secondPlayer = db.ref().child('test')
    secondPlayer
      .once("value")
      .then(snapshot => snapshot.val())
      .then(secondPlayer => this.setState({ secondUserLocation: { lat: secondPlayer.location.lat, lng: secondPlayer.location.lng } }))
  }

  componentDidMount(props) {



    const firebaseRef = fire.database().ref('Jesper')


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
        
        firebaseRef.update(item);

      },
      () => {
        this.setState({ loading: false });
      }
    );

  }



  render() {
    console.log(this.state.userLocation)
    const { loading, userLocation, secondUserLocation } = this.state;
    const { google } = this.props;

    if (loading) {
      return null;
    }

    return <Map google={google} initialCenter={userLocation} center={secondUserLocation} zoom={15}>
      <Circle
        radius={100}
        center={userLocation}
        onClick={() => console.log("klickade på cirkeln")}
        strokeColor="transparent"
        strokeOpactiy={0}
        strokeWeight={5}
        fillColor="#FF0000"
        fillOpacity={0.2}

      />
      <Marker
        position={userLocation}
        icon="https://www.robotwoods.com/dev/misc/bluecircle.png"
      />
      <Marker
        position={secondUserLocation} />
    </Map>
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBIvD8kOI5sxcZPcNQDtRplslCRcf2Jm_8")
})(App)