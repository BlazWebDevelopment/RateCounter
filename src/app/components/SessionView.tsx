"use client";
import React from "react";
import "./style/sessionView.css";

function SessionView(props: any) {
  return (
    <div className="session-whoewrapper">
      <div className="session-wrapper">
        <div className="session-p">
          <p>Session: {props.sessionName}</p>
        </div>
        <div className="inside-session-wrapper">
          <div className="data-wrapper">
            <p className="rate">
              RATE &#8594;
              <span className="numberMoney">{props.calculatedRate}€</span>
            </p>
            <div className="time">
              <span className="hours">{props.hours}</span> :
              <span className="minutes">{props.minutes}</span> :
              <span className="seconds">{props.seconds}</span>
            </div>
            <p className="date">Date: {props.date}</p>
          </div>
          <div className="btns">
            {props.isStop ? (
              <div className="resume-btn">
                <button onClick={props.resume}>Resume</button>
              </div>
            ) : (
              <div className="stop-btn">
                <button onClick={props.stopSession}>Stop</button>
              </div>
            )}
            <div className="save-btn">
              <button onClick={props.saveIncomeRecord}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionView;
