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
  const [error, setError] = useState(true);

  useEffect(() => {
    if (isNewSession) {
      setTimeout(() => {
        setIsActive(true);
      }, 100);
    } else {
      setIsActive(false);
    }
  }, [isNewSession]);

  const profileNameHandler = (e: any) => {
    setSessionName(e.target.value);

    if (e.target.value === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <>
      {isNewSession && (
        <div className="enteramount-wrapper">
          <div className={`enteramount-insider${isActive ? " active" : ""}`}>
            <div className="enteramount-input">
              <input
                className="enteramount-input-name"
                type="text"
                placeholder="Session name"
                onChange={profileNameHandler}
              />
              <div className="rate-inp">
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
                <span className="eur">€</span>
              </div>
            </div>
            {error ? (
              <div
                className={error ? "start-stop-btn-error" : "start-stop-btn"}
              >
                <button>START</button>
                <Image
                  src={Play}
                  height={32}
                  width={32}
                  alt="play"
                  className="play-img"
                />
              </div>
            ) : (
              <div
                onClick={onStart}
                className={error ? "start-stop-btn-error" : "start-stop-btn"}
              >
                <button>START</button>
                <Image
                  src={Play}
                  height={32}
                  width={32}
                  alt="play"
                  className="play-img"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NewSession;
