"use server"

import User from "@/model/user"
import Connectdb from "../connectDB"

export async function createUser(user: any){
    try {
        await Connectdb()
        const newUser = await User.create(user)
        return JSON.parse(JSON.stringify(newUser))

    } catch (error) {
        console.log(error)
    }
}