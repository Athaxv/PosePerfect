import { Webhook } from 'svix';
import { headers} from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import connectDB from '@/lib/connectDB';
import User from '@/schema/user';
import { NextResponse } from 'next/server';

export async function POST(req: Request){
    await connectDB();
    const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET!;

    if (!WEBHOOK_SECRET){
        throw new Error("Please provide the webhook secret");
    }

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_signature || !svix_timestamp){
        return new Response("Error occured - No svix headers");
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    const wh = new Webhook(WEBHOOK_SECRET)
    
    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature
        }) as WebhookEvent;
    } catch (error) {
        console.error("Error verifying Webhook", error)
        return new Response("Error occured", { status: 400 })
    }

    const {id} = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created"){
        try {
            const { id, email_addresses, first_name, last_name, image_url } = evt.data;

            let user = await User.findOne({ clerkId: id });

            if (!user) {
                user = new User({
                    clerkId: id,
                    email: email_addresses[0]?.email_address,
                    firstName: first_name,
                    lastName: last_name,
                    profileImage: image_url,
                });

                await user.save();
            }
            console.log(user);
            return NextResponse.json({ message: "User created successfully" }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
        }
    }
}