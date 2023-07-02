"use client";
import React, { useContext } from "react";
import "./style/yourIncomeRecords.css";
import leftSide from "@/app/img/left.svg";
import rightSide from "@/app/img/right.svg";
import Image from "next/image";
import Close from "@/app/img/close.svg";
import { IncomeRecordsContext } from "../context/IncomeRecordsContext";

function YourIncomeRecords(props: any) {
  const { currentProfile } = useContext(IncomeRecordsContext);

  return (
    <>
      <div className="yourIncome-whoewrapper">
        <div className="yourIncome-wrapper">
          <div className="close-btn-wrapper">
            <div
              className="close-btn"
              onClick={() =>
                props.removeIncomeRecord(props.name, currentProfile)
              }
            >
              <Image src={Close} alt="close" height={32} width={32} />
            </div>
          </div>
          <div className="yourIncome-p">
            <p>Session: {props.name}</p>
          </div>
          <div className="inside-yourIncome-wrapper">
            <div className="data-yourIncome-wrapper">
              <p className="your-rate">
                RATE:
                <span className="your-numberMoney">${props.rate} / h</span>
                <span className="duration-text">Duration: </span>
                <span className="duration-time">&quot;{props.time}&quot;</span>
              </p>
              <p className="your-money">
                Money earned:
                <span className="your-moneycollected">
                  {props.money_collected}€
                </span>
              </p>
              <p className="your-date">Date: {props.date}</p>
            </div>
            <div className="end-start-time">
              <div className="end-start-time-inside">
                <p className="p1">START</p>
                <p className="p2"> {props.start_time}</p>
              </div>
              <div className="end-start-time-inside">
                <p className="p1">END</p>
                <p className="p2"> {props.end_time}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default YourIncomeRecords;
