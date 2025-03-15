"use client"
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';
import { ExerciseType } from '@/lib/posture-utils';

// Mock data for the dashboard
const mockData = [
  { day: 'Mon', score: 65 },
  { day: 'Tue', score: 72 },
  { day: 'Wed', score: 78 },
  { day: 'Thu', score: 85 },
  { day: 'Fri', score: 82 },
  { day: 'Sat', score: 88 },
  { day: 'Sun', score: 91 },
];

const mockExerciseData = [
  { name: 'Squat', score: 82, count: 15 },
  { name: 'Deadlift', score: 76, count: 9 },
  { name: 'Push-Up', score: 88, count: 23 },
  { name: 'Plank', score: 92, count: 18 },
];

const ProgressDashboard = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glassmorphism p-2 rounded-lg border border-border">
          <p className="text-sm font-medium">{`${payload[0].payload.day}`}</p>
          <p className="text-sm text-muted-foreground">
            Score: <span className="text-primary font-medium">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16 mt-20" id="dashboard">
      <div className="text-center mb-10">
        <p className="text-lg font-medium uppercase tracking-wider text-blue-500 mb-2">Your Progress</p>
        <h2 className="text-3xl font-semibold mb-3">Track Your Improvement</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Monitor your posture correction progress over time and identify areas for improvement.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 glassmorphism rounded-xl p-6 shadow-sm border border-border/60 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium ">Posture Score Trend</h3>
            <div className="flex items-center p-1 rounded-lg bg-secondary">
              <button
                onClick={() => setTimeRange('week')}
                className={cn(
                  "text-xs px-3 py-1.5 rounded-md transition-colors",
                  timeRange === 'week' 
                    ? "bg-white text-blue-500 shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Week
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={cn(
                  "text-xs px-3 py-1.5 rounded-md transition-colors",
                  timeRange === 'month' 
                    ? "bg-white text-primary shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Month
              </button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  domain={[0, 100]} 
                  ticks={[0, 25, 50, 75, 100]}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                <Bar 
                  dataKey="score" 
                  radius={[4, 4, 0, 0]} 
                  fill="#156fed" 
                  barSize={30} 
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glassmorphism rounded-xl p-6 shadow-sm border border-border/60 flex flex-col animate-fade-in animation-delay-200">
          <h3 className="text-lg font-medium mb-6">Summary</h3>
          
          <div className="flex items-center justify-between mb-6">
            <div className="text-center">
              <p className="text-3xl font-semibold text-blue-500">82</p>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-blue-500">65</p>
              <p className="text-sm text-muted-foreground">Sessions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-blue-500">12</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
          </div>
          
          <div className="mt-auto">
            <h4 className="text-sm font-medium mb-3">Current Focus Areas</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm">Back Alignment</p>
                <div className="flex items-center text-sm font-medium text-amber-500">
                  <span>Needs Work</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Knee Position</p>
                <div className="flex items-center text-sm font-medium text-posture-correct">
                  <span>Good</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Shoulder Stability</p>
                <div className="flex items-center text-sm font-medium text-posture-lightblue">
                  <span>Improving</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glassmorphism rounded-xl p-6 shadow-sm border border-border/60 animate-fade-in animation-delay-400">
        <h3 className="text-lg font-medium mb-6">Exercise Breakdown</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mockExerciseData.map((exercise, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-lg p-4 shadow-sm border border-border/60 transition-all hover:shadow-md"
            >
              <p className="text-base font-medium mb-2">{exercise.name}</p>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-muted-foreground">Score</p>
                <p className="text-sm font-medium">{exercise.score}%</p>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${exercise.score}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {exercise.count} sessions completed
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
