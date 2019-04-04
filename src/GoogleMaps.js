
import React, { Component } from 'react';
import './App.css';
import { Map, Marker, GoogleApiWrapper, Circle } from 'google-maps-react';
import fire from './firebase.js'


class GoogleMaps extends Component {
  state = {
    userLocation: { lat: 30, lng: 30 },
    secondUserLocation: { lat: 31, lng: 31 },
    thirdUserLocation: { lat: 32, lng: 32 },
    fourthUserLocation: { lat: 33, lng: 33 },
    opponentName: '',
    playerIsAlive: false,

    loading: true
  };




  componentDidMount(props) {

    let arrOfPlayers = ["player1", "player2", "player3", "player4"]
    let arrOfOpponents = arrOfPlayers.filter(name => name !== this.props.playerName);
    this.setState({
      opponentName: arrOfOpponents
    })
    this.interval = setInterval(() => {

      var firebaseRef = fire.database().ref(this.props.playerName)
      var db = fire.database();
      var secondPlayer = db.ref().child(arrOfOpponents[0])
      

      
      secondPlayer
        .once("value")
        .then(snapshot => snapshot.val())
        .then(secondPlayer => this.setState({ secondUserLocation: { lat: secondPlayer.location.lat, lng: secondPlayer.location.lng } }))
        
      const thirdPlayer = db.ref().child(arrOfOpponents[1])
      thirdPlayer
        .once("value")
        .then(snapshot => snapshot.val())
        .then(thirdPlayer => this.setState({ thirdUserLocation: { lat: thirdPlayer.location.lat, lng: thirdPlayer.location.lng } }))

      const fourthPlayer = db.ref().child(arrOfOpponents[2])
      fourthPlayer
        .once("value")
        .then(snapshot => snapshot.val())
        .then(fourthPlayer => this.setState({ fourthUserLocation: { lat: fourthPlayer.location.lat, lng: fourthPlayer.location.lng } }))





      navigator.geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;

          this.setState({
            userLocation: { lat: latitude, lng: longitude },
            loading: false,
            color: '',
            playerNearBy: false
          });

          // Skickar location till firebase
          const item = {
            location: this.state.userLocation
          }

          firebaseRef.update(item);

        },
        (position) => {

          const { latitude, longitude } = position.coords;
          this.setState({ loading: false, userLocation: { lat: latitude, lng: longitude }, });
        }
      );
      // console.log(this.state.userLocation.lat,this.state.userLocation.lng)
      let latDif1 = this.state.userLocation.lat - this.state.secondUserLocation.lat
      let lngDif1 = this.state.userLocation.lng - this.state.secondUserLocation.lng
     
      if ((latDif1 < 0.001 && latDif1 > -0.001) && (lngDif1 < 0.001 && lngDif1 > -0.001)) {
        this.setState({
          color: "#FF0000",
          playerNearBy: true
        })
        console.log("test är innanför " + this.state.playerNearBy);
        

      } else {
        this.setState({
          color: "#4c00ff",
          playerNearBy: false

        })
        console.log("test är utanförför " + this.state.playerNearBy);

      }

      let latDif2 = this.state.userLocation.lat - this.state.thirdUserLocation.lat
      let lngDif2 = this.state.userLocation.lng - this.state.thirdUserLocation.lng
      if ((latDif2 < 0.001 && latDif2 > -0.001) && (lngDif2 < 0.001 && lngDif2 > -0.001)) {
        this.setState({
          color: "#FF0000",
          playerNearBy: true

        })

      } else {
        this.setState({
          color: "#4c00ff",
          playerNearBy: false

        })

      }


      let latDif3 = this.state.userLocation.lat - this.state.fourthUserLocation.lat
      let lngDif3 = this.state.userLocation.lng - this.state.fourthUserLocation.lng
      if ((latDif3 < 0.001 && latDif3 > -0.001) && (lngDif3 < 0.001 && lngDif3 > -0.001)) {
        this.setState({
          color: "#FF0000",
          playerNearBy: true

        })

      } else {
        this.setState({
          color: "#4c00ff",
          playerNearBy: false

        })

      }

    }, 4000)
  }


  render() {
    const { loading, userLocation, secondUserLocation, thirdUserLocation, fourthUserLocation } = this.state;
    const { google } = this.props;

    if (loading) {
      return null;
    }

    return <div>
      <Map google={google} initialCenter={userLocation} zoom={15}>
        <Circle
          radius={30}
          center={userLocation}
          strokeColor="transparent"
          strokeOpactiy={0}
          strokeWeight={5}
          fillColor={this.state.color}
          fillOpacity={0.2}

        />
        <Marker icon = {{
          url: "https://www.fg-a.com/smileys/smiley-detective.jpg",
          anchor: new google.maps.Point(12, 12),
          scaledSize: new google.maps.Size(24, 24)
        }}
         position={userLocation}
          onClick={() => {
            alert("You")
          }} />

        <Marker icon="https://www.robotwoods.com/dev/misc/bluecircle.png"

          position={secondUserLocation} onClick={() => {
          alert("Second user")
          if (this.state.playerNearBy === true) {
            console.log("Du tog honom! " + this.state.playerNearBy)

            const db = fire.database();
            const secondPlayer = db.ref().child(this.state.opponentName[0])

            const item = {
              PlayerAlive: false
            }

            secondPlayer.update(item);

          } else {
            console.log("Han slank undan den skiten " + this.state.playerNearBy);

            const db = fire.database();
            const secondPlayer = db.ref().child(this.state.opponentName[0])

            const item = {
              PlayerAlive: true
            }
            secondPlayer.update(item);

          }
        }} />

        <Marker icon="https://www.robotwoods.com/dev/misc/bluecircle.png" position={thirdUserLocation} onClick={() => {
          alert("Second user")
          if (this.state.playerNearBy === true) {
            console.log("Du tog honom! " + this.state.playerNearBy)

            const db = fire.database();
            const thirdPlayer = db.ref().child(this.state.opponentName[1])

            const item = {
              PlayerAlive: false
            }

            thirdPlayer.update(item);

          } else {
            console.log("Han slank undan den skiten " + this.state.playerNearBy);

            const db = fire.database();
            const thirdPlayer = db.ref().child(this.state.opponentName[1])

            const item = {
              PlayerAlive: true
            }
            thirdPlayer.update(item);

          }
        }} />

        <Marker icon="https://www.robotwoods.com/dev/misc/bluecircle.png" position={fourthUserLocation} onClick={() => {
          alert("fourth user")
          if (this.state.playerNearBy === true) {
            console.log("Du tog honom! " + this.state.playerNearBy)

            const db = fire.database();
            const fourthPlayer = db.ref().child(this.state.opponentName[2])

            const item = {
              PlayerAlive: false
            }

            fourthPlayer.update(item);

          } else {
            console.log("Han slank undan den skiten " + this.state.playerNearBy);

            const db = fire.database();
            const fourthPlayer = db.ref().child(this.state.opponentName[2])

            const item = {
              PlayerAlive: true
            }
            fourthPlayer.update(item);

          }
        }} />

      </Map>
    </div>
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBIvD8kOI5sxcZPcNQDtRplslCRcf2Jm_8")
})(GoogleMaps)