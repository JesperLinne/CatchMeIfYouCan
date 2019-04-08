import React, { Component } from 'react';
import './App.css';
import { Map, Marker, Circle, GoogleApiWrapper } from 'google-maps-react';
import fire from './firebase.js';



class GoogleMap extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userLocation: { lat: 32, lng: 32 },
      playerName: null,
      opponent1Loc: { lat: 32, lng: 32 },
      lastActivity: new Date(),
      opponent2Loc: { lat: 32, lng: 32 },
      opponent3Loc: { lat: 32, lng: 32 },
      loggedIn: false,
      loading: true,
      map: null,
      opponentName: [
        { name: "DrFEEL", img: "" },
        { name: "BadBABIE", img: "" },
        { name: "SteveHARVEY", img: "" },
        { name: "JerrySPRINGER", img: "" }
      ],
      yourName: [{ name: "", img: "" }]
    };
  }

  panToTest(userLocation) {
    this.state.map.panTo(userLocation);
  }

  getOpponentInfo(opponent, opponentLoc) {
    opponent
      .once("value")
      .then(snapshot => snapshot.val())
      .then(player => {
        this.setState({
          [opponentLoc]: {
            lat: player.location.lat,
            lng: player.location.lng
          }
        });
      });
  }

  logIn() {
    fire
      .database()
      .ref(this.props.playerName)
      .update({
        loggedIn: true,
        lastActivity: this.state.lastActivity,
      });

    this.setState({ lastActivity: new Date(), loggedIn: true });
  }

  logOut(props) {
    fire
      .database()
      .ref(this.props.playerName)
      .update({
        loggedIn: false,
        lastActivity: this.state.lastActivity,
      });

    clearInterval(this.interval);

    this.props.logOut.call(this);

  }
  logOut1(props) {
    if(this.state.nearByopponent1 === true) {
    fire
      .database()
      .ref("BadBABIE")
      .update({
        loggedIn: false,
        lastActivity: this.state.lastActivity,
      });

    clearInterval(this.interval);
  }

  }
  logOut2(props) {
    if(this.state.nearByopponent2 === true) {
    fire
      .database()
      .ref("SteveHARVEY")
      .update({
        loggedIn: false,
        lastActivity: this.state.lastActivity,
      });

    clearInterval(this.interval);
  }

  }
  logOut3(props) {
    if(this.state.nearByopponent3 === true) {
    fire
      .database()
      .ref("JerrySPRINGER")
      .update({
        loggedIn: false,
        lastActivity: this.state.lastActivity,
      });

    clearInterval(this.interval);
  }

  }

  logOutOtherPLayer(props) {
    fire
      .database()
      .ref(this.props.playerName)
      .update({
        loggedIn: false,
        lastActivity: this.state.lastActivity,
      });

    clearInterval(this.interval);

    this.props.logOut.call(this);
  }

  onReady(mapProps, map) {
    this.setState({
      map: map
    });
    const google = window.google;
    var googleMapStyle = new google.maps.StyledMapType(
      [
        {
          featureType: "administrative",
          elementType: "all",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "labels",
          stylers: [
            {
              visibility: "on"
            },
            {
              weight: "10.00"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "labels.text",
          stylers: [
            {
              weight: "7.26"
            },
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#cfc8c8"
            },
            {
              weight: "4.51"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#000000"
            },
            {
              weight: "4.13"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "landscape.natural",
          elementType: "all",
          stylers: [
            {
              visibility: "on"
            },
            {
              saturation: "99"
            },
            {
              color: "#5fc661"
            }
          ]
        },
        {
          featureType: "landscape.natural.landcover",
          elementType: "all",
          stylers: [
            {
              saturation: "100"
            },
            {
              visibility: "on"
            },
            {
              lightness: "-16"
            },
            {
              gamma: "1.71"
            },
            {
              weight: "2.82"
            }
          ]
        },
        {
          featureType: "landscape.natural.landcover",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "landscape.natural.terrain",
          elementType: "all",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [
            {
              visibility: "simplified"
            },
            {
              saturation: "-100"
            },
            {
              lightness: "-100"
            },
            {
              gamma: "0.51"
            },
            {
              weight: "1.68"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [
            {
              saturation: "91"
            },
            {
              hue: "#009cff"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "labels.text",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "labels",
          stylers: [
            {
              saturation: "93"
            }
          ]
        },
        {
          featureType: "transit.station",
          elementType: "all",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [
            {
              weight: "3.40"
            },
            {
              saturation: "95"
            },
            {
              lightness: "-18"
            },
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry.stroke",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "water",
          stylers: [
            {
              color: "#71c8d4"
            }
          ]
        },

        {
          featureType: "water",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        }
      ],
      { name: "Styled Map" }
    );
    map.mapTypes.set("styled_map", googleMapStyle);
    map.setMapTypeId("styled_map");
  }

  updateLastactivity() {
    this.setState({ lastActivity: new Date() });
    fire.database().ref(this.props.playerName).update({
      lastActivity: this.state.lastActivity,
    });
  }

  checkForInactivity() {
    if (Date.now() - this.state.lastActivity > 1200000) {
      this.logOut.call(this);
    }
  }


  checkForLogout() {
    const firebaseRef = fire.database().ref(this.props.playerName);
    firebaseRef.on('child_changed', (snapshot, props) => {
      const logInChanged = snapshot.val()
      if (logInChanged === false) {
        this.logOut.call(this)
      }

    })
  }






  componentDidMount(props) {
    this.logIn();
    let arrOfOpponents = this.props.arrOfPlayers.filter(name => name.name !== this.props.playerName);
    let arrOfYou = this.props.arrOfPlayers.filter(name => name.name === this.props.playerName);
    this.setState({
      opponentName: arrOfOpponents,
      yourName: arrOfYou
    })



    const firebaseRef = fire.database().ref(this.props.playerName);
    const db = fire.database();
    const opponent1 = db.ref().child(arrOfOpponents[0].name);
    const opponent2 = db.ref().child(arrOfOpponents[1].name);
    const opponent3 = db.ref().child(arrOfOpponents[2].name);



    navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.interval = setInterval(() => {


          this.setState({
            userLocation: { lat: latitude, lng: longitude },
            loading: false,
            playerName: this.props.playerName,
            nearByopponent1: false,
            nearByopponent2: false,
            nearByopponent3: false,
            loggedIn: this.state.loggedIn
          });

          this.getOpponentInfo(opponent1, "opponent1Loc");
          this.getOpponentInfo(opponent2, "opponent2Loc");
          this.getOpponentInfo(opponent3, "opponent3Loc");

          // Skickar location till firebase

          const item = {
            location: this.state.userLocation,
          }
          firebaseRef.update(item);


          let latDif1 = this.state.userLocation.lat - this.state.opponent1Loc.lat
          let lngDif1 = this.state.userLocation.lng - this.state.opponent1Loc.lng
          if ((latDif1 < 0.001 && latDif1 > -0.001) && (lngDif1 < 0.001 && lngDif1 > -0.001) && (this.state.playerName === "DrFEEL")) {
            this.setState({
              color: "#FF0000",
              nearByopponent1: true,

            })

          } else {
            this.setState({
              color: "#4c00ff"
            })
          }

          let latDif2 = this.state.userLocation.lat - this.state.opponent2Loc.lat
          let lngDif2 = this.state.userLocation.lng - this.state.opponent2Loc.lng
          if ((latDif2 < 0.001 && latDif2 > -0.001) && (lngDif2 < 0.001 && lngDif2 > -0.001) && (this.state.playerName === "DrFEEL")) {
            this.setState({
              color: "#FF0000",
              nearByopponent2: true,

            })

          } else {
            this.setState({
              color: "#4c00ff"
            })
          }


          let latDif3 = this.state.userLocation.lat - this.state.opponent3Loc.lat
          let lngDif3 = this.state.userLocation.lng - this.state.opponent3Loc.lng
          if ((latDif3 < 0.001 && latDif3 > -0.001) && (lngDif3 < 0.001 && lngDif3 > -0.001) && (this.state.playerName === "DrFEEL")) {
            this.setState({
              color: "#FF0000",
              nearByopponent3: true,
            })

          } else {
            this.setState({
              color: "#4c00ff"
            })

          }


        }, 1000)

      }
    );
  }





  render() {

    this.checkForLogout()
    this.checkForInactivity();


    //console.log(Date.now() - this.state.lastActivity);
    

    

    if (Date.now() - this.state.lastActivity > 60000 && Date.now() - this.state.lastActivity < 61000) {
      window.confirm('Are you AFK? After 20 min of inactivity, you will be KICKED OUT');
    }

    const {
      loading,
      userLocation,
      opponent1Loc,
      opponent2Loc,
      opponent3Loc
    } = this.state;
    const { google } = this.props;

    if (loading) {
      return null;
    }

    return (
      <div>
      <div>
      </div>


        <Map
          onDragstart={this.updateLastactivity.bind(this)}
          google={google}
          initialCenter={userLocation}
          zoom={15}
          fullscreenControl={false}
          onReady={this.onReady.bind(this)}
          mapTypeControl={false}
          streetViewControl={false}
        >
          <div className="headerWrapper">
            <h1>TRy CATcH Me OUtSIde</h1>
          </div>

          <Circle
            radius={50}
            center={userLocation}
            strokeColor="transparent"
            fillColor="#ff0000"
          />

          <Marker
            icon={{
              url: this.state.yourName[0].img,
              anchor: new google.maps.Point(12, 12),
              scaledSize: new google.maps.Size(24, 24)
            }}
            position={userLocation}
          />

          <Marker
            icon={{
              url: this.state.opponentName[0].img,
              anchor: new google.maps.Point(12, 12),
              scaledSize: new google.maps.Size(24, 24)
            }}

            position={opponent1Loc} onClick={this.logOut1.bind(this)}
                             
              
          />

          <Marker
            icon={{
              url: this.state.opponentName[1].img,
              anchor: new google.maps.Point(12, 12),
              scaledSize: new google.maps.Size(24, 24)
            }}

            position={opponent2Loc} onClick={this.logOut2.bind(this)}

          />

          <Marker

            icon={{
              url: this.state.opponentName[2].img,
              anchor: new google.maps.Point(12, 12),
              scaledSize: new google.maps.Size(24, 24)
            }}

            position={opponent3Loc} onClick={this.logOut3.bind(this)}
            
              
                
               /*  console.log('Hes clicked'); */
              
            
          />
          <div id='exit-container'>
            <button onClick={this.logOut.bind(this)} id='exit'><i class="fas fa-times"></i></button>
          </div>


          <div id='center-container'>
            <button onClick={this.panToTest.bind(this, userLocation)} id='center'>
              <i class="fas fa-bullseye"></i>
            </button>
          </div>

          
        </Map>
        

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBIvD8kOI5sxcZPcNQDtRplslCRcf2Jm_8")
})(GoogleMap)