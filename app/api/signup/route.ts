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

        const { userId } = await auth();
        console.log(userId);

        if (!userId) {
            return NextResponse.json("user id Unauthorized", { status: 401})
        }

        const user = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`
            },
        }).then((res) => res.json())

        const existingUser = user.findOne({ clerkId: user.id })

        if (!existingUser){
            const newUser =  new User({
                clerkId: user.id,
                email: user.email_addresses[0].email_address,
                Name: user.first_name + " " + user.last_name,
                image: user.image_url 
            })
            await newUser.save()

            return NextResponse.json("User saved in db", { status: 200 });
        }

        return NextResponse.json("User already exists", { status: 200})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}