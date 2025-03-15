"use client"
import React, { ReactNode } from 'react'
import ExerciseLibrary from './_components/ExerciseLibrary'

function ExerciseProvider() {
  return (
    <div>
       <ExerciseLibrary onSelectExercise={() => {}} selectedExerciseId={null} /> 
    </div>
  )
}

export default ExerciseProvider