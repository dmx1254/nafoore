import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import MemberModel from "@/lib/models/member";

connectDB();


export async function GET() {
  try {
    const data = await MemberModel.find();
    return NextResponse.json({ members: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await MemberModel.create(data);

    return NextResponse.json(
      { success: "Membre ajouté avec succès" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ errorMessage: error.message }, { status: 500 });
  }
}
