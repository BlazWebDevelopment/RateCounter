"use client";
import { useState, useEffect, useContext, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { IncomeRecordsContext } from "@/app/context/IncomeRecordsContext";
import useUser from "@/hooks/useUser";
import { IUser } from "@/app/models/user/User";
import { useSession } from "next-auth/react";
import axios from "axios";

interface SessionManagementProps {
  isNewSession: boolean;
  seconds: string;
  minutes: string;
  hours: string;
  calculatedRate: number;
  setIsNewSession: (isNew: boolean) => void;
  startNewSession: () => void;
  stopTimer: () => void;
  saveIncomeRecord: () => void;
  resumeSession: () => void;
  test: () => void;
  createProfile: (profileName: string) => void;
  removeYourIncomeRecord: (
    yourChosenRecord: string,
    yourCurrentProfile: string
  ) => void;
  removeYourProfile: (removableProfile: string) => void;
}

const useSessionManagement = (): SessionManagementProps => {
  const [isNewSession, setIsNewSession] = useState(false);
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const {
    addIncomeRecords,
    createNewProfile,
    removeIncomeRecord,
    removeProfile,
  } = useUser();
  const [startTime, setStartTime] = useState("");

  const { data: session } = useSession();
  const {
    sessionName,
    sessionRate,
    calculatedRate,
    setCalculatedRate,
    setStartedSessions,
    setUser,
    setIsStop,
    setIsNewProfile,
    currentProfile,
    chosenRecord,
  } = useContext(IncomeRecordsContext);

  const formatTime = (value: number): string => {
    return value.toString().padStart(2, "0");
  };

  const calculateRateHandler = useCallback(() => {
    const totalHours =
      hours + minutes / 60 + seconds / 3600 + milliseconds / 3600000;
    const rate = sessionRate * totalHours;
    const formattedRate = rate.toFixed(5);
    setCalculatedRate(+formattedRate);
  }, [hours, minutes, seconds, sessionRate, milliseconds, setCalculatedRate]);

  const test = () => {
    if (hours === 0 && minutes === 0 && seconds >= 0) {
      return seconds + "s";
    }
    if (hours === 0 && minutes > 0 && seconds >= 0) {
      return minutes + "m " + seconds + "s";
    }
    if (hours > 0 && minutes > 0 && seconds >= 0) {
      return hours + "h " + minutes + "m " + seconds + "s";
    }
  };

  const startTimer = () => {
    const id = setInterval(() => {
      setMilliseconds((prevMilliseconds) => prevMilliseconds + 1);
      setSeconds((prevSeconds) => {
        if (prevSeconds < 59) {
          return prevSeconds + 1;
        } else {
          setMinutes((prevMinutes) => {
            if (prevMinutes < 59) {
              return prevMinutes + 1;
            } else {
              setHours((prevHours) => prevHours + 1);
              return 0;
            }
          });
          return 0;
        }
      });
    }, 1000);
    setIntervalId(id);
  };

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsStop(true);
  };

  const resumeSession = () => {
    if (!intervalId) {
      startTimer();
    }
    setIsNewSession(false);
    setStartedSessions(true);
    setIsStop(false);
  };

  const startNewSession = () => {
    if (!intervalId) {
      startTimer();
    }
    setSeconds(0);
    setMinutes(0);
    setHours(0);

    setIsNewSession(false);
    setStartedSessions(true);
    setIsStop(false);
    setStartTime(yourHours + ":" + yourMinutes + ":" + yourSeconds);
  };
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const yourHours = date.getHours().toString().padStart(2, "0");
  const yourMinutes = date.getMinutes().toString().padStart(2, "0");
  const yourSeconds = date.getSeconds().toString().padStart(2, "0");

  const timeDate = day + "-" + month + "-" + year;

  const saveIncomeRecord = () => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<IUser>(
          `/api/user?email=${session && session.user?.email}`
        );
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    setTimeout(() => {
      fetchUser();
    }, 1500);

    const endDate = new Date();
    const endHours = endDate.getHours().toString().padStart(2, "0");
    const endMinutes = endDate.getMinutes().toString().padStart(2, "0");
    const endSeconds = endDate.getSeconds().toString().padStart(2, "0");
    const endTime = endHours + ":" + endMinutes + ":" + endSeconds;

    addIncomeRecords(
      [
        {
          id: uuidv4(),
          name: sessionName,
          rate: sessionRate,
          money_collected: calculatedRate,
          start_time: startTime,
          end_time: endTime,
          date: timeDate,
          session_lasted: test(),
        },
      ],
      currentProfile
    );

    setStartedSessions(false);
    setIsStop(false);
  };

  const createProfile = (profileName: string) => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<IUser>(
          `/api/user?email=${session && session.user?.email}`
        );
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    setTimeout(() => {
      fetchUser();
    }, 1000);
    createNewProfile(profileName, []);
    setIsNewProfile(false);
  };

  const removeYourIncomeRecord = (
    yourChosenRecord: string,
    yourCurrentProfile: string
  ) => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<IUser>(
          `/api/user?email=${session && session.user?.email}`
        );
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    setTimeout(() => {
      fetchUser();
    }, 1000);

    removeIncomeRecord(yourChosenRecord, yourCurrentProfile);

    setStartedSessions(false);
    setIsStop(false);
  };

  const removeYourProfile = (removableProfile: string) => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<IUser>(
          `/api/user?email=${session && session.user?.email}`
        );
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    setTimeout(() => {
      fetchUser();
    }, 1000);
    removeProfile(removableProfile);
  };

  useEffect(() => {
    calculateRateHandler();
  }, [hours, minutes, seconds, sessionRate, calculateRateHandler]);

  return {
    isNewSession,
    seconds: formatTime(seconds),
    minutes: formatTime(minutes),
    hours: formatTime(hours),
    calculatedRate,
    setIsNewSession,
    startNewSession,
    stopTimer,
    saveIncomeRecord,
    resumeSession,
    test,
    createProfile,
    removeYourIncomeRecord,
    removeYourProfile,
  };
};

export default useSessionManagement;
