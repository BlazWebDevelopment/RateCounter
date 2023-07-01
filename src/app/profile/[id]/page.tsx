"use client";
import React, { useEffect } from "react";
import { IUser } from "../../models/user/User";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { IncomeRecordsContext } from "../../context/IncomeRecordsContext";
import YourIncomeRecords from "../../components/YourIncomeRecords";
import ProfileSelect from "../../components/ProfileSelect";
import useSessionManagement from "@/hooks/useSessionManagement";
import "./style/page.css";

interface IncomeRecords {
  id: string;
  name: string;
  money_collected: number;
  date: string;
  rate: number;
  session_lasted: string;
}

function Profile({ params }: { params: any }) {
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
  } = useSessionManagement();

  const { data: session } = useSession();
  const { setUser, user, currentProfile, startedSession } =
    useContext(IncomeRecordsContext);

  useEffect(() => {
    const fetchIncomeRecords = async () => {
      try {
        const response = await axios.get<IUser>(
          `/api/user?email=${session && session.user?.email}`
        );
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchIncomeRecords();
  }, [session, setUser]);

  const findCurrentSession = user?.profiles.find(
    (profile: any) => profile.label === currentProfile
  );

  return (
    <div>
      {!findCurrentSession && (
        <p className="p-tag">
          Create some profiles and sessions on home screen
        </p>
      )}
      {findCurrentSession && user?.profiles !== 0 && (
        <>
          <div className="yir-profile">
            <h1>Your income records, {params.id}</h1>
          </div>
          <ProfileSelect />
          {findCurrentSession &&
            findCurrentSession.incomeRecords.map(
              (incomeRecord: IncomeRecords) => (
                <YourIncomeRecords
                  key={incomeRecord.id}
                  id={incomeRecord.id}
                  name={incomeRecord.name}
                  money_collected={incomeRecord.money_collected}
                  date={incomeRecord.date}
                  rate={incomeRecord.rate}
                  time={incomeRecord.session_lasted}
                />
              )
            )}
        </>
      )}
    </div>
  );
}

export default Profile;
