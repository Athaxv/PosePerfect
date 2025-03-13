import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true }, // Clerk's user ID
    email: { type: String, required: true, unique: true },
    password: { type: String } // Clerk handles authentication, so this may not be needed
});

// Prevent redefining the model if it already exists
const User = models.User || mongoose.model("User", UserSchema);

export default User;
