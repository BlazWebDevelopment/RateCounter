"use client";
import React, { useContext, useState, useEffect } from "react";
import "./style/amountEnter.css";
import { IncomeRecordsContext } from "@/app/context/IncomeRecordsContext";
import Play from "@/app/img/play.svg";
import Image from "next/image";

interface NewSessionProps {
  isNewSession: boolean;
  onStart: () => void;
}

const NewSession: React.FC<NewSessionProps> = ({ isNewSession, onStart }) => {
  const { setSessionName, setSessionRate, sessionRate } =
    useContext(IncomeRecordsContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isNewSession) {
      setTimeout(() => {
        setIsActive(true);
      }, 100);
    } else {
      setIsActive(false);
    }
  }, [isNewSession]);

  return (
    <>
      {isNewSession && (
        <div className="enteramount-wrapper">
          <div className={`enteramount-insider${isActive ? " active" : ""}`}>
            <div className="enteramount-input">
              <p>Name</p>
              <input
                className="enteramount-input-name"
                type="text"
                placeholder="Session name"
                onChange={(e) => setSessionName(e.target.value)}
              />
              <p>Hourly rate:</p>
              <input
                className="rate-input"
                type="number"
                name="money"
                min="0"
                step="0.01"
                value={sessionRate === 0 ? "0.00" : sessionRate}
                required
                onChange={(e) => setSessionRate(+e.target.value)}
              />
            </div>
            <div onClick={onStart} className="start-stop-btn">
              <button>START</button>
              <Image
                src={Play}
                height={32}
                width={32}
                alt="play"
                className="play-img"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewSession;
