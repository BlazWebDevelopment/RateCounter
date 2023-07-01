"use client";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { IUser } from "@/app/models/user/User";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { IncomeRecordsContext } from "@/app/context/IncomeRecordsContext";

interface UserHookResult {
  addIncomeRecords: (
    incomeRecord: any[],
    chosenProfile: string
  ) => Promise<void>;
  createNewProfile: (label: string, incomeRecords: any[]) => Promise<void>;
  removeIncomeRecord: (
    chosenIncomeRecord: string,
    chosenProfile: string
  ) => Promise<void>;
  removeProfile: (chosenProfile: string) => Promise<void>;
}

function useUser(): UserHookResult {
  const { user, setUser } = useContext(IncomeRecordsContext);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) return;
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
    fetchUser();
  }, [session, setUser]);

  const createNewProfile = async (label: string, incomeRecords: any[]) => {
    if (!session?.user) return;

    try {
      const newProfile = {
        label,
        incomeRecords,
      };

      const response = await fetch(`/api/user/createNewProfile`, {
        method: "POST",
        body: JSON.stringify({
          email: session?.user?.email,
          profiles: [newProfile],
        }),
      });

      if (response.ok) {
        console.log("User transactions updated successfully");
      } else {
        console.error(
          "Failed to update user transactions:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Failed to update user transactions:", error);
    }
  };

  const addIncomeRecords = async (
    incomeRecord: any[],
    chosenProfile: string
  ) => {
    if (!session?.user) return;

    try {
      const response = await fetch(`/api/user/addIncomeRecord`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          chosenProfile: chosenProfile,
          profiles: [
            {
              incomeRecords: incomeRecord,
            },
          ],
        }),
      });

      if (response.ok) {
        console.log("User transactions updated successfully");
      } else {
        console.error(
          "Failed to update user transactions:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Failed to update user transactions:", error);
    }
  };

  const removeIncomeRecord = async (
    chosenIncomeRecord: string,
    chosenProfile: string
  ) => {
    if (!session?.user) return;

    try {
      const response = await fetch(`/api/user/removeIncomeRecord`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          chosenProfile: chosenProfile,
          chosenIncomeRecord: chosenIncomeRecord,
        }),
      });

      if (response.ok) {
        console.log("User transactions updated successfully");
      } else {
        console.error(
          "Failed to update user transactions:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Failed to update user transactions:", error);
    }
  };

  const removeProfile = async (chosenProfile: string) => {
    if (!session?.user) return;

    try {
      const response = await fetch(`/api/user/removeProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          chosenProfile: chosenProfile,
        }),
      });

      if (response.ok) {
        console.log("User transactions updated successfully", chosenProfile);
      } else {
        console.error(
          "Failed to update user transactions:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Failed to update user transactions:", error);
    }
  };

  return {
    addIncomeRecords,
    createNewProfile,
    removeIncomeRecord,
    removeProfile,
  };
}

export default useUser;
