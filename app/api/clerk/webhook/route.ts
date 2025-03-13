import { Webhook } from 'svix';
import { headers} from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';

export async function POST(req: Request){
    const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET!;

    if (!WEBHOOK_SECRET){
        throw new Error("Please provide the webhook secret");
    }

    const headerPayload = headers();
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
            
        } catch (error) {
            
        }
    }
}