import React, { Component } from "react";
import "./App.css";
import GoogleMaps from "./GoogleMaps.js";
import fire from "./firebase.js";

const arrOfPlayers = [
  {
    name: "DrFEEL",
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnpuDospBunSKgm8DaWf3boJSVKnuomTb4d0ccCP3Afg87F2So"
  },
  {
    name: "BadBABIE",
    img:
      "https://www.nicepng.com/png/full/314-3146783_report-abuse-bhad-bhabie-fuck-you.png"
  },
  {
    name: "SteveHARVEY",
    img: "https://t2.rbxcdn.com/b7f927ebbfe4c027fc11cc7d844a34c5"
  },
  {
    name: "JerrySPRINGER",
    img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Jerry_Springer_at_Emory_%28cropped%29.jpg/170px-Jerry_Springer_at_Emory_%28cropped%29.jpg"
  }
];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      playerName: "",
      loggedIn: false,
      lastActivity: 0,
      DrFEEL: { loggedIn: false, catched: false },
      BadBABIE: { loggedIn: false, catched: false },
      SteveHARVEY: { loggedIn: false, catched: false },
      JerrySPRINGER: { loggedIn: false, catched: false }
    };
  }

  onClickButton(name) {
    this.setState({
      clicked: true,
      playerName: name,
      loggedIn: true,
      catched: false
    });
  }
  componentDidMount() {
    const db = fire.database();

    setInterval(() => {
      arrOfPlayers.forEach(player =>
        db
          .ref()
          .child(player.name)
          .once("value")
          .then(snapshot => snapshot.val())
          .then(resultDB => {
            this.setState({
              [player.name]: {
                loggedIn: resultDB.loggedIn
              }
            });
          })
      );
    }, 2000);
  }

  logOut() {
    this.setState({
      loggedIn: false,
    });
  }

  render() {
    const buttons = arrOfPlayers.map((playerInArr, i) => {
      if (!this.state[playerInArr.name].loggedIn) {
        return (
          <button className='button-wrapper' onClick={this.onClickButton.bind(this, playerInArr.name)}>
            <span class="astext">{playerInArr.name}</span>
            <img src={playerInArr.img} class="del" />
          </button>
        );
      } else {
        return <button className='taken-character'><span className='takenCharText'>{playerInArr.name} is Taken</span> <img src={playerInArr.img} class="del" /></button>;
      }
    });

    return (
      <div>

      

        {/* lägg till att det ska vara sant att den är klickad och spelaren inte är upptagen */}
        {this.state.clicked && this.state.loggedIn ? (
          <div>
          
          <GoogleMaps
            playerName={this.state.playerName}
            logOut={this.logOut.bind(this)}
            arrOfPlayers={arrOfPlayers}
            
          />
          </div>
        ) : (
            <div>
              <div className="headerWrapper">
                <h1>TRy CATcH Me OUtSIde</h1>
              </div>
              <div className="buttonWrapper"> {buttons}</div>
            </div>
          )}
      </div>
    );
  }
}