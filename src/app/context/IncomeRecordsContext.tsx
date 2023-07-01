import React, {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { IUser } from "../models/user/User";

interface IncomeRecordsType {
  id: string;
  name: string;
  money_collected: number;
  sessionRate: number;
  date: Date;
}

interface IncomeRecordsContextData {
  sessionName: string;
  setSessionName: Dispatch<SetStateAction<string>>;
  sessionRate: number;
  setSessionRate: Dispatch<SetStateAction<number>>;
  calculatedRate: number;
  setCalculatedRate: Dispatch<SetStateAction<number>>;
  startedSession: boolean;
  setStartedSessions: Dispatch<SetStateAction<boolean>>;
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  isStop: boolean;
  setIsStop: Dispatch<SetStateAction<boolean>>;
  profileName: string;
  setProfileName: Dispatch<SetStateAction<string>>;
  isNewProfile: boolean;
  setIsNewProfile: Dispatch<SetStateAction<boolean>>;
  currentProfile: string;
  setCurrentProfile: Dispatch<SetStateAction<string>>;
  chosenRecord: string;
  setChosenRecord: Dispatch<SetStateAction<string>>;
}

export const IncomeRecordsContext = createContext<IncomeRecordsContextData>({
  sessionName: "",
  setSessionName: () => {},
  sessionRate: 0,
  setSessionRate: () => {},
  calculatedRate: 0,
  setCalculatedRate: () => {},
  startedSession: false,
  setStartedSessions: () => {},
  setUser: () => {},
  user: [],
  isStop: false,
  setIsStop: () => {},
  profileName: "",
  setProfileName: () => {},
  isNewProfile: false,
  setIsNewProfile: () => {},
  currentProfile: "",
  setCurrentProfile: () => {},
  chosenRecord: "",
  setChosenRecord: () => {},
});

interface IncomeRecordsProviderProps {
  children: ReactNode;
}

export function IncomeRecordsProvider({
  children,
}: IncomeRecordsProviderProps) {
  const [sessionName, setSessionName] = useState("");
  const [sessionRate, setSessionRate] = useState(0);
  const [calculatedRate, setCalculatedRate] = useState(0);
  const [startedSession, setStartedSessions] = useState(false);
  const [user, setUser] = useState<IUser | undefined>();
  const [isStop, setIsStop] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [isNewProfile, setIsNewProfile] = useState(false);
  const [currentProfile, setCurrentProfile] = useState("");
  const [chosenRecord, setChosenRecord] = useState("");

  return (
    <IncomeRecordsContext.Provider
      value={{
        sessionName,
        setSessionName,
        setSessionRate,
        sessionRate,
        setCalculatedRate,
        calculatedRate,
        startedSession,
        setStartedSessions,
        user,
        setUser,
        isStop,
        setIsStop,
        setProfileName,
        profileName,
        isNewProfile,
        setIsNewProfile,
        currentProfile,
        setCurrentProfile,
        chosenRecord,
        setChosenRecord,
      }}
    >
      {children}
    </IncomeRecordsContext.Provider>
  );
}
