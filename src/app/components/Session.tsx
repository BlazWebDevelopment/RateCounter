"use client";
import React, { useContext, useState } from "react";
import SessionView from "./SessionView";
import NewSession from "./NewSession";
import useSessionManagement from "@/hooks/useSessionManagement";
import "./style/session.css";
import useUser from "@/hooks/useUser";
import { IncomeRecordsContext } from "../context/IncomeRecordsContext";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import YourIncomeRecords from "./YourIncomeRecords";
import NewProfile from "./NewProfile";
import ProfileSelect from "./ProfileSelect";
import Link from "next/link";

interface IncomeRecords {
  id: string;
  name: string;
  money_collected: number;
  date: string;
  rate: number;
  session_lasted: string;
  start_time: string;
  end_time: string;
}

function Session() {
  const { data: session } = useSession();
  const {
    isNewSession,
    seconds,
    minutes,
    hours,
    calculatedRate,
    setIsNewSession,
    startNewSession,
    stopTimer,
    saveIncomeRecord,
    resumeSession,
    createProfile,
    removeYourIncomeRecord,
  } = useSessionManagement();

  const {
    sessionName,
    startedSession,
    user,
    isStop,
    profileName,
    isNewProfile,
    setIsNewProfile,
    currentProfile,
  } = useContext(IncomeRecordsContext);
  const date = new Date();
  const dateTime =
    date.getDay() + "." + date.getMonth() + "." + date.getFullYear();
  const [showAllSessions, setShowAllSessions] = useState(false);

  const findCurrentSession = user?.profiles.find(
    (profile: any) => profile.label === currentProfile
  );
  const showSomeIncomeRecords =
    findCurrentSession && findCurrentSession.incomeRecords.slice(0, 2);

  return (
    <div>
      {session && (
        <>
          <div className="newProfilebtn-wrap">
            <button
              className={`newProfile-btn${isNewProfile ? "-active" : ""}`}
              onClick={() => setIsNewProfile(!isNewProfile)}
            >
              {isNewProfile ? "Close" : " + New profile"}
            </button>
          </div>
          {isNewProfile && <NewProfile createProfile={createProfile} />}
          {user?.profiles.length === 0 ? (
            <div className="zero-profiles">
              <p>You have 0 profiles</p>
            </div>
          ) : (
            <ProfileSelect />
          )}
          {user?.profiles.length !== 0 && (
            <>
              <div className="newSession-btn-wrap">
                <button
                  className={`newSession-btn${isNewSession ? "-active" : ""}`}
                  onClick={() => setIsNewSession(!isNewSession)}
                >
                  {isNewSession ? "Close" : " + New Session"}
                </button>
              </div>
              <NewSession
                isNewSession={isNewSession}
                onStart={startNewSession}
              />
            </>
          )}
          {startedSession && (
            <SessionView
              seconds={seconds}
              minutes={minutes}
              hours={hours}
              date={dateTime}
              stopSession={stopTimer}
              calculatedRate={calculatedRate}
              saveIncomeRecord={saveIncomeRecord}
              sessionName={sessionName}
              isStop={isStop}
              resume={resumeSession}
            />
          )}
          {findCurrentSession &&
            showSomeIncomeRecords.map((incomeRecord: IncomeRecords) => (
              <YourIncomeRecords
                key={incomeRecord.id}
                id={incomeRecord.id}
                name={incomeRecord.name}
                money_collected={incomeRecord.money_collected}
                date={incomeRecord.date}
                rate={incomeRecord.rate}
                time={incomeRecord.session_lasted}
                start_time={incomeRecord.start_time}
                end_time={incomeRecord.end_time}
                removeIncomeRecord={removeYourIncomeRecord}
              />
            ))}
          {findCurrentSession &&
            findCurrentSession.incomeRecords.length > 2 &&
            !showAllSessions && (
              <div className="more-btn">
                <Link href={`/profile/${session?.user?.name}`}>
                  <button>More...</button>
                </Link>
              </div>
            )}
        </>
      )}
      {!session && (
        <>
          <div className="ifnot-login">
            <p>Log in to track your rates</p>
          </div>
          <div className="ifnot-login-btn">
            <button onClick={() => signIn("google")}>Log in</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Session;
