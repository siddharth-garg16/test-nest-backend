import * as mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 4,
      trim: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    marksPerQuestion: {
      type: Number,
      default: 1,
    },
    negativeMarking: {
      type: Number,
      default: 0,
    },
    passingCutoff: {
      type: Number,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Exam = mongoose.model("Exam", examSchema);
