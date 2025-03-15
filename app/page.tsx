
import React from "react";
import Navbar from "./_components/Navbar";
import Homebar from "./_components/Homebar";
import Features from "./_components/Features";
import Footer from "./_components/Footer";
import ExerciseLibrary from "./_components/ExerciseLibrary";
import ExerciseProvider from "./provider";
import ProgressDashboard from "./_components/ProgressDashboard";
import GetinTouch from "./_components/GetinTouch";
import Feedback from "./_components/Feedback";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Homebar/>
      <ExerciseProvider>
      </ExerciseProvider>
      <Feedback/>
      <ProgressDashboard/>
      <Features/>
      <GetinTouch/>
      <Footer/>
    </div>
  );
}
