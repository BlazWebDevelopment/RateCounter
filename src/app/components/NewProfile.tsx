"use client";
import React, { useContext, useEffect, useState } from "react";
import "./style/amountEnter.css";
import { IncomeRecordsContext } from "@/app/context/IncomeRecordsContext";

const NewProfile = (props: any) => {
  const { setProfileName, profileName, isNewProfile } =
    useContext(IncomeRecordsContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isNewProfile) {
      setTimeout(() => {
        setIsActive(true);
      }, 100);
    } else {
      setIsActive(false);
    }
  }, [isNewProfile]);
  return (
    <>
      <div className="enteramount-wrapper">
        <div className={`enteramount-insider${isActive ? " active" : ""}`}>
          <div className="enterProfile-input">
            <p>Create new Profile</p>
            <input
              type="text"
              placeholder="Enter name"
              onChange={(e) => setProfileName(e.target.value)}
            />
          </div>
          <div className="create-btn">
            <button onClick={() => props.createProfile(profileName)}>
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProfile;
