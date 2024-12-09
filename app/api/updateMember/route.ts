import { NextResponse } from "next/server";
import MemberModel from "@/lib/models/member";
import { connectDB } from "@/lib/db";

connectDB();

export async function POST(req: Request) {
  try {
    const { userId, ...updateData } = await req.json();

    const member = await MemberModel.findByIdAndUpdate(
      userId,
      {
        $set: updateData,
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      { success: "Membre mis à jour avec succès", memberUpdated: member },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ errorMessage: error.message }, { status: 500 });
  }
}
