import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import User from "@/app/models/user/User";

export async function POST(req: NextRequest) {
  const { email, profiles } = await req.json();

  try {
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" });

    for (const profile of profiles) {
      const { label, incomeRecords } = profile;
      const newProfile = {
        label: label,
        incomeRecords: incomeRecords || [],
      };
      user.profiles.push(newProfile);
    }

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
