// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import './Home.css';

type Props = {};


export default class Home extends Component<Props> {
  props: Props;

  state = {
    isTimerOn: false,
    hours: 0,
    mins: 0,
    secs: 0,
    timerId: '',
    currentTime: '00:00',
  }

  toggleTimer = () => {
    const { isTimerOn } = this.state;
    if (isTimerOn) {
      this.onStop();
    } else {
      this.onStart();
    }
    this.setState({ isTimerOn: !this.state.isTimerOn });
  };

  onStart = () => {
    this.setState({
      timerId: setTimeout(this.add, 1000),
    });
  }

  onStop = () => {
    const { timerId } = this.state;
    clearTimeout(timerId);
  }

  add = () => {
    const { hours, mins, secs } = this.state;
    this.setState({
      secs: secs + 1,
    });
    if (secs >= 60) {
      this.setState({
        secs: 0,
      });
      this.setState({
        mins: mins + 1,
      });
      if (mins >= 60) {
        this.setState({
          mins: 0,
        });
        this.setState({
          hours: hours + 1,
        });
      }
    }

    this.onStart();
  }

  getCurrentTime = () => {
    setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const mins = date.getMinutes();

      this.setState({
        currentTime: `${hours}:${mins}`,
      });
    }, 1000);
  }


  render() {
    const {
      isTimerOn,
      hours,
      mins,
      secs,
      currentTime,
    } = this.state;

    this.getCurrentTime();

    return (
      <div className="timely">
        <div className="container">
          <div className="header">
            <div className="logo">
              Time.ly
            </div>
            <div className="current-time">
              {currentTime}
            </div>
          </div>
          <div className="body">
            <div className="form">
              <input placeholder="What are you working on?" />
            </div>
            <div className="timer">
              <div className="hrs">
                <div className="content">
                  {hours > 9 ? hours : `0${hours}`}
                </div>
                <div className="type">
                  HRS
                </div>
              </div>
              <div className="divider">&#58;</div>
              <div className="min">
                <div className="content">
                  {mins > 9 ? mins : `0${mins}`}
                </div>
                <div className="type">
                  MIN
                </div>
              </div>
              <div className="divider">&#58;</div>
              <div className="sec">
                <div className="content">
                  {secs > 9 ? secs : `0${secs}`}
                </div>
                <div className="type">
                  SEC
                </div>
              </div>
            </div>
            <div className="action">
              <div className={cx({ play: !isTimerOn, pause: isTimerOn })} onClick={this.toggleTimer.bind(this)}>
                <div className={cx({ triangle: !isTimerOn, square: isTimerOn })} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
