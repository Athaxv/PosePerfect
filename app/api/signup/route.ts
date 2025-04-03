import Connectdb from "@/lib/connectDB";
import User from "@/model/user";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    return NextResponse.json("OK", { status: 200})
}

export async function POST(req: NextRequest){
    try {
        await Connectdb();
        const { clerkId, email, name, image} = await req.json()

        if (!clerkId || !email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        let user = await User.findOne({ clerkId });
        if (!user){
            user = new User({ clerkId, name, email, image})
            const newuser = await user.save()
            console.log(newuser);

            return NextResponse.json("User saved in db", { status: 201})
        }

        return NextResponse.json("User already exists", { status: 200})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}