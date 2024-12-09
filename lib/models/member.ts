import mongoose, { Schema, Document } from "mongoose";

interface Member extends Document {
  firstName: string;
  lastName: string;
  district: string;
  phone: string;
  photo: string;
}

const memberSchemas = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MemberModel =
  mongoose.models.member || mongoose.model<Member>("member", memberSchemas);

export default MemberModel;
