import { NextRequest } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import User from "@/app/models/user/User";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  try {
    await dbConnect();
    const user = await User.findOne({ email });
    return NextResponse.json({ status: 200, user });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "error banana" });
  }
}
