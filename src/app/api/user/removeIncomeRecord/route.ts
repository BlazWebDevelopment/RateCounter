import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import User, { IUser, IIncomeRecord } from "@/app/models/user/User";

export async function POST(req: NextRequest) {
  const { email, chosenIncomeRecord, chosenProfile } = await req.json();

  try {
    await dbConnect();
    const user: IUser | null = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" });

    const findIncomeRecord = user.profiles.find((profile) =>
      profile.incomeRecords.find((income) => income.name === chosenIncomeRecord)
    );
    const removableIncomeRecord = findIncomeRecord?.incomeRecords.find(
      (income) => income.name === chosenIncomeRecord
    );

    const index = findIncomeRecord?.incomeRecords.indexOf(
      removableIncomeRecord as IIncomeRecord
    );

    if (index !== undefined && index !== -1) {
      findIncomeRecord?.incomeRecords.splice(index, 1);
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
