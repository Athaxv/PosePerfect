"use client";
import { useState, useRef } from "react";
import { Exercise, exerciseLibrary } from "../../lib/posture-utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ExerciseLibraryProps {
  onSelectExercise: (exercise: Exercise) => void;
  selectedExerciseId: string | null;
}

const ExerciseLibrary = ({ onSelectExercise, selectedExerciseId }: ExerciseLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const exerciseRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const filteredExercises = exerciseLibrary.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.targetMuscles.some((muscle) => muscle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Function to select an exercise and move it to center
  const handleSelectExercise = (exercise: Exercise) => {
    onSelectExercise(exercise);

    // Scroll into view smoothly
    if (exerciseRefs.current[exercise.id]) {
      exerciseRefs.current[exercise.id]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16" id="exercises">
      <div className="text-center mb-10">
        <p className="text-lg font-medium text-blue-500 uppercase tracking-wider mb-2">Exercise Library</p>
        <h2 className="text-5xl font-semibold mb-3">Perfect Your Form</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Select an exercise to receive real-time posture feedback and form correction while you workout.
        </p>
      </div>

      <div className="w-full max-w-md mx-auto mb-8">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search by exercise or muscle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Carousel with centered navigation */}
      <div className="relative">
      <Carousel className="w-full relative">
  <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-500" />
  <CarouselContent>
    {filteredExercises.map((exercise) => (
      <CarouselItem
        key={exercise.id}
        className="basis-1/1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
        ref={(el) => (exerciseRefs.current[exercise.id] = el)}
      >
        <div
          className={`group rounded-xl overflow-hidden shadow-sm transition-all duration-300 card-hover ${
            selectedExerciseId === exercise.id ? "ring-2 ring-blue-500" : ""
          }`}
          onClick={() => handleSelectExercise(exercise)}
        >
          <div className="relative h-48 overflow-hidden bg-gray-100">
            <img
              src={exercise.imageUrl}
              alt={exercise.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-white text-lg font-medium">{exercise.name}</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {exercise.targetMuscles.slice(0, 2).map((muscle, idx) => (
                  <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white">
                    {muscle}
                  </span>
                ))}
                {exercise.targetMuscles.length > 2 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white">
                    +{exercise.targetMuscles.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="p-4 bg-white">
            <p className="text-sm text-muted-foreground line-clamp-2">{exercise.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs font-medium text-blue-600">{exercise.commonErrors.length} common mistakes</div>
            </div>
          </div>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious className="absolute right-0 top-1/2 text-blue-500"/>
  <CarouselNext className="absolute  top-1/2 -translate-y-1/2  text-blue-500" />
</Carousel>

      </div>
    </div>
  );
};

export default ExerciseLibrary;
