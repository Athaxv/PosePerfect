import { Button } from '@/components/ui/button';
import Spline from '@splinetool/react-spline/next';
import React, { useEffect } from 'react';
import SplineProvider from './SplineProvider';
import Link from 'next/link';


function Homebar() {

  return (
    <div className="relative w-full h-screen flex items-center justify-center p-10 md:px-20 lg:px-36 xl:px-48">
      {/* Background Spline Animation */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <SplineProvider>
        <Spline scene="https://prod.spline.design/kIEq55kPdfiYfLCV/scene.splinecode"/>
        </SplineProvider>
      </div>

      {/* Content Section */}
      <div className="relative z-10 mb-28 w-full text-center ">
        <Button variant={'outline'} className='mb-5 text-blue-400 hover:bg-blue-50 hover:text-blue-400 outline-blue-100' size={'sm'}>AI-Powered Form Correction</Button>
        <p className="font-bold text-4xl lg:text-6xl lg:px-12">
          Perfect your <span className="text-blue-500">Workout Form</span> with Real-Time AI
        </p>
        <p className="text-gray-600 mt-7 lg:px-24">
          Get instant posture analysis and corrective feedback for your exercises. Train smarter, prevent injuries, and maximize your workout effectiveness.
        </p>

        {/* Buttons */}
        <div className="flex justify-center mt-7 gap-4 text-xl">
          <Link href="/sign-up">
          <Button variant="outline" size="lg" className="text-blue-500 hover:text-blue-600">
            Start Correction
          </Button>
          </Link>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Homebar;
