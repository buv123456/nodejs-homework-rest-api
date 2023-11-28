const { Schema, model } = require("mongoose");
const { handleSaveError, preUpdate } = require("./hooks");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", preUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

module.exports = User;
