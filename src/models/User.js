import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  avatarUrl: String,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  socialOnly: { type: Boolean },
  name: { type: String, required: true },
  location: String,
});

userSchema.pre("save", async function () {
  console.log(this.password);
  this.password = await bcrypt.hash(this.password, 5);
  console.log(this.password);
});

const User = mongoose.model("User", userSchema);
export default User;
