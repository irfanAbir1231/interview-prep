import mongoose, { Schema, model, models } from "mongoose";

// Disable strict query option
mongoose.set("strictQuery", false);

const InterviewSchema = new Schema({
  user_id: {
    type: Schema.Types.String,
    ref: "User",
    required: true,
  },
  job_title: String,
  job_description: String,
  tech_expertise: String,
  years_experience: Number,
  status: { type: String, default: "In Progress" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

InterviewSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

const InterviewModel = models.Interview || model("Interview", InterviewSchema);

export default InterviewModel;
