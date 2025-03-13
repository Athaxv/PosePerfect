import { NextResponse } from "next/server";
import mongoose from "mongoose";

let isConnected = false;

export default async function() {
    const MONGO_URI = process.env.MONGODB_URI!;

    if (!MONGO_URI) {
        return NextResponse.json({ error: "MongoDB URI not provided" }, { status: 500 });
    }

    if (isConnected) {
        return NextResponse.json({ message: "MongoDB already connected" });
    }

    try {
        isConnected = true;
        await mongoose.connect(MONGO_URI);
        return NextResponse.json("MongoDB connected succesfully", {status: 200})
    } catch (error) {
        return NextResponse.json("MongoDB connection error", { status: 404 })
    }
}