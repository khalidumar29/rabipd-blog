import { model, Schema } from "mongoose";
import { createHmac, randomBytes } from "crypto";

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    salt: { type: String },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: "/images/deafult.png" },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.salt = salt;
  user.password = hashedPassword;
  next();
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found!");

  const userProvidedHash = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");

  if (userProvidedHash !== user.password) {
    throw new Error("Incorrect password");
  }

  return user;
});

const User = model("user", userSchema);
export default User;
