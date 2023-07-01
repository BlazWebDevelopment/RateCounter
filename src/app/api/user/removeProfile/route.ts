import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import User, { IUser, IProfile } from "@/app/models/user/User";

export async function POST(req: NextRequest) {
  const { email, chosenProfile } = await req.json();

  try {
    await dbConnect();
    const user: IUser | null = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" });

    const findProfile = user.profiles.find(
      (profile) => profile.label === chosenProfile
    ) as IProfile;

    const index = user.profiles.indexOf(findProfile);

    if (index !== -1) {
      user.profiles.splice(index, 1);
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
