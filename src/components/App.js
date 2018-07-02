import React, { Component } from 'react';
import Die from './Die';
import Scoreboard from '../containers/Scoreboard';
import '../index.css';

export default class App extends Component {
  handleDieClick(die) {
    console.log(`Click die ${die}`);
    this.props.toggleDieSelect(die);
  }

  componentDidMount() {
    this.props.newGame();
  }
  render() {
    console.log(this.props.score);
    const {dice, selected} = this.props
    return (
      <div>
        <button onClick={this.props.newGame}>New Game</button>
        <div className="dice">
          <Die number={dice[0]} selected={selected[0]} onClick={() => this.handleDieClick(0)} />
          <Die number={dice[1]} selected={selected[1]} onClick={() => this.handleDieClick(1)} />
          <Die number={dice[2]} selected={selected[2]} onClick={() => this.handleDieClick(2)} />
          <Die number={dice[3]} selected={selected[3]} onClick={() => this.handleDieClick(3)} />
          <Die number={dice[4]} selected={selected[4]} onClick={() => this.handleDieClick(4)} />
          <div className="roll" onClick={this.props.rollDice}>
            <button disabled={this.props.rollsLeft <= 0 || this.props.turnsLeft <= 0}>Roll</button><br/>
            Rolls: {this.props.rollsLeft}
          </div>
        </div>
        <Scoreboard />
        <div className="final">
          {this.props.turnsLeft <= 0 && "FINAL SCORE: " + this.props.total}
        </div>
      </div>
    );
  }
}