"use client";
import { useRouter } from "next/router";
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
  start_time: string;
  end_time: string;
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
    removeYourIncomeRecord,
  } = useSessionManagement();

  const { data: session, status } = useSession();
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
  if (status === "loading") {
    return (
      <div className="flex justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <ProfileSelect />
      {!findCurrentSession && (
        <div className="flex justify-center">
          <p className="p-tag">
            Create some profiles and sessions on the home screen
          </p>
        </div>
      )}
      {findCurrentSession && user?.profiles !== 0 && (
        <>
          <div className="yir-profile">
            <h1>Your income records, {params.id}</h1>
          </div>
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
                  start_time={incomeRecord.start_time}
                  end_time={incomeRecord.end_time}
                  removeIncomeRecord={removeYourIncomeRecord}
                />
              )
            )}
        </>
      )}
    </div>
  );
}

export default Profile;
