import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import MemberModel from "@/lib/models/member";

connectDB();

export async function POST(req: Request) {
  try {
    const { pageNumber } = await req.json();
    const data = await MemberModel.find().skip(pageNumber).limit(20);
    const membersLength = await MemberModel.countDocuments();
    return NextResponse.json({ members: data, membersLength }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
