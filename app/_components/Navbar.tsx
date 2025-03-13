"use client"
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Navbar() {
  const { isSignedIn, user } = useUser();
  return (
    <div className='p-5 flex items-center justify-between'>
    <div className='items-center flex gap-2 cursor-pointer'>
        <Image src={'/newlogo.svg'} alt='logo' height={30} width={30}/>
        <h2 className='text-2xl font-bold text-blue-500'>PosePerfect</h2>
    </div>
    <div className='flex flex-row-reverse gap-3'>
        {/* <UserButton/> */}
        <Link href="/dashboard">
        <Button className="bg-blue-500 hover:bg-blue-600">
                    {isSignedIn ? "Dashboard" : "Sign In"}
                  </Button>
        </Link>
    </div>
    </div>
  )
}

export default Navbar