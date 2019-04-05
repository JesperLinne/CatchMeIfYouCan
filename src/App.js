import React, { Component } from "react";
import "./App.css";
import GoogleMaps from "./GoogleMaps.js";
import fire from "./firebase.js";

const arrOfPlayers = ["player1", "player2", "player3", "player4"];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      playerName: "",
      loggedIn: false,
      lastActivity: 0,
      isOn: false,
      player1: { loggedIn: false },
      player2: { loggedIn: false },
      player3: { loggedIn: false },
      player4: { loggedIn: false }
    };
  }

  onClickButton(name) {
    this.setState({
      clicked: true,
      playerName: name,
      loggedIn: true,
      lastActivity: new Date(),
      isOn: true
    });
  }
  componentDidMount() {
    const db = fire.database();

    setInterval(() => {
      arrOfPlayers.forEach(playername =>
        db
          .ref()
          .child(playername)
          .once("value")
          .then(snapshot => snapshot.val())
          .then(player => {
            this.setState({
              [playername]: {
                loggedIn: player.loggedIn
              }
            });
          })
      );
    }, 2000);
  }

  logOut() {
    this.setState({
      loggedIn: false,
      isOn: false
    });
  }

  render() {
    console.log("player1", this.state.player1, "player2", this.state.player2);

    const buttons = arrOfPlayers.map(playerInArr => {
      if (!this.state[playerInArr].loggedIn) {
        return (
          <button onClick={this.onClickButton.bind(this, playerInArr)}>
            {playerInArr}
          </button>
        );
      } else {
        return <button>{playerInArr} is Taken</button>;
      }
    });

    return (
      <div>
        {/* lägg till att det ska vara sant att den är klickad och spelaren inte är upptagen */}
        {this.state.clicked && this.state.loggedIn ? (
          <GoogleMaps
            playerName={this.state.playerName}
            logOut={this.logOut.bind(this)}
          />
        ) : (
            <div> {buttons}</div>
          )}
      </div>
    );
  }
}
