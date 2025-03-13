import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true }, // Clerk's user ID
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    profileImage: { type: String },
}, { timestamps: true });

const User = models.User || mongoose.model("User", UserSchema);

export default User;
