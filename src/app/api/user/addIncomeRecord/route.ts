import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import User, { IUser } from "@/app/models/user/User";
import { useEffect } from "react";

export async function POST(req: NextRequest) {
  const { email, chosenProfile, profiles } = await req.json();
  const { incomeRecords } = profiles[0];

  try {
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" });

    const findProfile = user?.profiles.find(
      (profile) => profile.label === chosenProfile
    );

    findProfile?.incomeRecords.push(...incomeRecords);

    const newUser = new User(user);
    await newUser.save();

    if (user) {
      return NextResponse.json({ status: 200, user });
    } else {
      return NextResponse.json({ status: 404, message: "User not found!" });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
