import { NextResponse } from "next/server";
import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGODB_URI!;

interface MongooseConn {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: any = (global as any).mongoose;

if (!cached){
    cached = (global as any).mongoose = {
        conn: null,
        promise: null 
    }
}

export default async function Connectdb() {
    if (cached.conn) return cached.conn

    cached.Promise = cached.Promise || 
    mongoose.connect(MONGO_URI, {
        dbName: "PosePerfect",
        bufferCommands: false,
        connectTimeoutMS: 30000,
    })

    cached.conn = await cached.promise

    return cached.conn;

}