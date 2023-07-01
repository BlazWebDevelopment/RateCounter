"use client";
import React, { useContext, useEffect, useState } from "react";
import "./style/amountEnter.css";
import { IncomeRecordsContext } from "@/app/context/IncomeRecordsContext";

const NewProfile = (props: any) => {
  const { setProfileName, profileName, isNewProfile } =
    useContext(IncomeRecordsContext);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(true); // Set initial value of error to true

  useEffect(() => {
    if (isNewProfile) {
      setTimeout(() => {
        setIsActive(true);
      }, 100);
    } else {
      setIsActive(false);
    }
  }, [isNewProfile]);

  const profileNameHandler = (e: any) => {
    setProfileName(e.target.value);

    if (e.target.value === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <>
      <div className="enteramount-wrapper">
        <div className={`enteramount-insider${isActive ? " active" : ""}`}>
          <div className="enterProfile-input">
            <p>Create new Profile</p>
            <input
              type="text"
              placeholder="Enter name"
              onChange={profileNameHandler}
            />
          </div>
          <div className={error ? `create-btn-error` : `create-btn`}>
            {error ? (
              <button disabled onClick={() => props.createProfile(profileName)}>
                Create
              </button>
            ) : (
              <button onClick={() => props.createProfile(profileName)}>
                Create
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProfile;
