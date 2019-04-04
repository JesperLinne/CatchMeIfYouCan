import React, { Component } from "react";
import "./App.css";
import GoogleMaps from "./GoogleMaps.js";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      playerName: ""
    };
  }

  onClickButton(name) {
    this.setState({
      clicked: true,
      playerName: name
    });
  }

  render() {
    const buttons = (
      <div>
        <button onClick={this.onClickButton.bind(this, "player1")}>
          Emil
        </button>
        <button onClick={this.onClickButton.bind(this, "player2")}>
          Jesper
        </button>
        <button onClick={this.onClickButton.bind(this, "player3")}>
          Axel
        </button>
        <button onClick={this.onClickButton.bind(this, "player4")}>
          Ankan
        </button>
      </div>
    );

    return (
      <div>
        {this.state.clicked ? (
          <GoogleMaps playerName={this.state.playerName} />
        ) : (
          buttons
        )}
      </div>
    );
  }
}


