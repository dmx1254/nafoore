import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import MemberModel from "@/lib/models/member";

connectDB();

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    await MemberModel.findByIdAndDelete(userId);
    return NextResponse.json(
      { success: "Membre supprimé avec succès" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ errorMessage: error.message }, { status: 500 });
  }
}
