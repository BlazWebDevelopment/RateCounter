"use client";
import React, { useState, useContext, useEffect } from "react";
import left from "@/app/img/left.svg";
import right from "@/app/img/right.svg";
import Image from "next/image";
import "./style/profileSelect.css";
import { IncomeRecordsContext } from "../context/IncomeRecordsContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import None from "@/app/img/none.svg";
import useSessionManagement from "@/hooks/useSessionManagement";
import Remove from "@/app/img/close.svg";

function ProfileSelect(props: any) {
  const { currentProfile, setCurrentProfile, user } =
    useContext(IncomeRecordsContext);

  const [index, setIndex] = useState(0);
  const length = user?.profiles?.length || 0;
  const { removeYourProfile } = useSessionManagement();

  useEffect(() => {
    setCurrentProfile(user?.profiles?.[index]?.label || "");
  }, [index, setCurrentProfile, user]);

  const changeRightHandler = async () => {
    if (index < length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const changeLeftHandler = async () => {
    if (index > 0) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="profileSelect-wrapper">
      {user?.profiles.length === 0 ? null : (
        <div className="profileSelect-btns">
          <button onClick={changeLeftHandler}>
            <Image
              src={index !== 0 ? left : None}
              width={32}
              height={32}
              alt="left"
            />
          </button>
          <TransitionGroup>
            {index < length && (
              <CSSTransition key={index} classNames="slide" timeout={300}>
                <div className="profile-name-wrapper">
                  <button onClick={() => removeYourProfile(currentProfile)}>
                    <Image src={Remove} height={16} width={16} alt="remove" />
                  </button>
                  <p className="profile">
                    {user?.profiles?.[index]?.label || ""}
                  </p>
                </div>
              </CSSTransition>
            )}
          </TransitionGroup>

          <button onClick={changeRightHandler}>
            <Image
              src={index + 1 !== length ? right : None}
              width={32}
              height={32}
              alt="right"
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileSelect;
