import React, { Component } from 'react'
import Header from './Header'

export default class App extends Component {
  state = {
    break: 5,
    session: 25,
    isSession: true,
    minute: 25,
    second : 0,
    intervalId: 0,
    start: true,
    decInc: true
  }

  breakDecrement = () => {
    if(this.state.decInc){
      if(this.state.break !== 1){
        this.setState(state => {
          return {break : state.break - 1}
        })
      }
    }
  }

  breakIncrement = () => {
    if(this.state.decInc){
      if(this.state.break !== 60){
        this.setState(state => {
          return {break : state.break + 1}
        }) 
      }
    }
  }

  sessionDecrement = () => {
    if(this.state.decInc){
      if(this.state.session !== 1){
        this.setState(state => {
          return {
            session : state.session - 1,
            minute: state.minute -1
          }
        })
      }
    }
  }

  sessionIncrement = () => {
    if(this.state.decInc){
      if(this.state.session !== 60){
        this.setState(state => {
          return {
            session : state.session + 1,
            minute: state.minute + 1
          }
        })
      }
    }
  }

  startStopHandler = () => {
    this.setState( state => {
      return { start : !state.start }
    })
    if(this.state.start){
      const interval = setInterval( () => {
        switch(this.state.second){
          case 0:
            if(this.state.minute === 0){
              if(this.state.isSession){
                this.setState({
                  isSession: false,
                  minute: this.state.break
                })
              }else{
                this.setState({
                  isSession: true,
                  minute: this.state.session
                })
              }
            }else{
              this.setState(state => {
                return { minute: state.minute - 1}
              })
              this.setState({
                second: 59
              })
            }
            break;
          default:
            this.setState( state => {
              return { second : state.second - 1 }
            })
            break;
        }
        if(this.state.minute === 0 && this.state.second === 0){
          const sound = document.getElementById("beep")
          sound.play()
        }
      
      }, 1000)
      this.setState({
        intervalId : interval,
        decInc: false
      })
    }else{
      clearInterval(this.state.intervalId)
      this.setState({
        decInc: true
      })
      const sound = document.getElementById("beep")
      sound.pause()
    }
  }

  reset = () => {
    this.setState({
      break: 5,
      session: 25,
      isSession: true,
      minute : 25,
      second : 0,
      start: true,
      decInc: true
    })
    clearInterval(this.state.intervalId)
    const sound = document.getElementById("beep")
    sound.pause();
    sound.currentTime = 0
  }

  render() {
    return (
      <div>
        <Header />
        <div className="clock">
          <div className="titleCard">
              <h4 id="break-label">Break Length</h4>
              <h4 id="session-label">Session Length</h4>
          </div>
          <div className="flexer">
              <div className="break">
                <button disabled={this.state.decInc ? "" : "disabled"} id="break-decrement" onClick={this.breakDecrement}><span>-</span></button>
                <span id="break-length">{this.state.break}</span>
                <button disabled={this.state.decInc ? "" : "disabled"} id="break-increment" onClick={this.breakIncrement}><span>+</span></button>
              </div>
              <div className="session">
                <button disabled={this.state.decInc ? "" : "disabled"} id="session-decrement" onClick={this.sessionDecrement}><span>-</span></button>
                <span id="session-length">{this.state.session}</span>
                <button disabled={this.state.decInc ? "" : "disabled"} id="session-increment" onClick={this.sessionIncrement}><span>+</span></button>
              </div>
          </div>
          <h4 id="timer-label" className={this.state.isSession ? "" : "redBreakOG"}>{this.state.isSession ? "Session" : "Break"}</h4>
          <h1 id="time-left" className={this.state.isSession ? "greenBreak" : "redBreak"}>{this.state.minute < 10 ? "0" + this.state.minute : this.state.minute}:{this.state.second < 10 ? "0" + this.state.second : this.state.second }</h1>
          <div className="lastBttn">
            <button id="start_stop" onClick={this.startStopHandler}><span>Start / Stop</span></button>
            <button id="reset" onClick={this.reset}><span>Reset</span></button>
          </div>
        </div>
        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
        <div className="signature">
          <h6> Designed &amp; Coded By : </h6>
          <h6 className="name"> Abhilash Negi</h6>
        </div>
      </div>
    )
  }
}

