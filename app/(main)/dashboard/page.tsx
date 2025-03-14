"use client"
import { useState } from 'react';
import { Menu, LayoutDashboard, Camera, Activity, History, Settings, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import WebcamView from '../_components/WebcamView';
import { ExerciseType } from '@/lib/posture-utils';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseType>(ExerciseType.SQUAT);
  const [selectedTab, setSelectedTab] = useState<'webcam' | 'stats' | 'history'>('webcam');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', tab: 'stats' },
    { icon: Camera, label: 'Posture Analysis', tab: 'webcam' },
    { icon: History, label: 'History', tab: 'history' },
  ];

  const exerciseOptions = [
    { label: 'Squat', value: ExerciseType.SQUAT },
    { label: 'Deadlift', value: ExerciseType.DEADLIFT },
    { label: 'Push-up', value: ExerciseType.PUSHUP },
    { label: 'Plank', value: ExerciseType.PLANK },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'bg-white border-r border-border/40 h-screen transition-all duration-300 ease-in-out flex flex-col z-20',
          isSidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border/40">
          <div className={cn('flex items-center space-x-2', !isSidebarOpen && 'justify-center w-full')}>
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-white w-5 h-5"
              >
                <path d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" />
                <path d="m4 16 4-4" />
                <path d="m4 20 8-8" />
                <path d="m8 20 12-12" />
                <path d="m12 20 8-8" />
                <path d="m20 12 0.01 0" />
              </svg>
            </div>
            {isSidebarOpen && <span className="font-medium">Posture Perfect</span>}
          </div>
          <button 
            onClick={toggleSidebar} 
            className={cn("p-1 rounded-md hover:bg-secondary transition-colors", !isSidebarOpen && "hidden")}
          >
            <Menu size={20} />
          </button>
        </div>
        
        {/* Main navigation */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => setSelectedTab(item.tab as any)}
                  className={cn(
                    'flex items-center w-full p-3 rounded-lg transition-colors',
                    selectedTab === item.tab
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-secondary text-foreground/80',
                    !isSidebarOpen && 'justify-center'
                  )}
                >
                  <item.icon size={20} className={cn(!isSidebarOpen && 'mx-auto')} />
                  {isSidebarOpen && <span className="ml-3">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
          
          {isSidebarOpen && selectedTab === 'webcam' && (
            <div className="px-4 py-6">
              <h3 className="text-sm font-medium mb-3">Select Exercise</h3>
              <ul className="space-y-1">
                {exerciseOptions.map((exercise, index) => (
                  <li key={index}>
                    <button
                      onClick={() => setSelectedExercise(exercise.value)}
                      className={cn(
                        'flex items-center w-full p-2 rounded-md text-sm transition-colors',
                        selectedExercise === exercise.value
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-secondary text-foreground/80'
                      )}
                    >
                      <span>{exercise.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
        
        {/* User section */}
        <div className={cn(
          "border-t border-border/40 p-4",
          !isSidebarOpen && "flex justify-center"
        )}>
          <div className={cn(
            "flex items-center",
            isSidebarOpen ? "justify-between w-full" : "flex-col gap-3"
          )}>
            <div className={cn(
              "flex items-center",
              !isSidebarOpen && "flex-col gap-1"
            )}>
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User size={18} />
              </div>
              {isSidebarOpen && <span className="ml-3 text-sm font-medium">User</span>}
            </div>
            
            {isSidebarOpen ? (
              <button className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground">
                <LogOut size={18} />
              </button>
            ) : (
              <button className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground">
                <Settings size={18} />
              </button>
            )}
          </div>
        </div>
      </aside>
      
      {/* Main content area */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-border/40 bg-white p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center">
            {!isSidebarOpen && (
              <button onClick={toggleSidebar} className="mr-4 p-1.5 rounded-md hover:bg-secondary transition-colors">
                <Menu size={20} />
              </button>
            )}
            <h1 className="text-xl font-medium">
              {selectedTab === 'webcam' ? 'Posture Analysis' : 
               selectedTab === 'stats' ? 'Dashboard' : 'History'}
            </h1>
          </div>
          
          {selectedTab === 'webcam' && (
            <div className="flex items-center space-x-2">
              <label htmlFor="exercise-select" className="text-sm">Exercise:</label>
              <select
                id="exercise-select"
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value as ExerciseType)}
                className="text-sm border border-border rounded-md px-2 py-1.5 bg-transparent"
              >
                {exerciseOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        {/* Dashboard content */}
        <div className="p-6">
          {selectedTab === 'webcam' && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-medium mb-4">
                Analyzing: {exerciseOptions.find(o => o.value === selectedExercise)?.label}
              </h2>
              <WebcamView exerciseType={selectedExercise} />
              
              <div className="mt-8 glassmorphism p-6 rounded-xl">
                <h3 className="text-base font-medium mb-4">Tips For Correct Form</h3>
                <ul className="space-y-2">
                  {selectedExercise === ExerciseType.SQUAT && (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-posture-correct mt-0.5">✓</span>
                        <span>Keep your chest up and back straight</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-posture-correct mt-0.5">✓</span>
                        <span>Push your knees outward in line with your toes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-posture-incorrect mt-0.5">✗</span>
                        <span>Don't let your knees cave inward</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-posture-incorrect mt-0.5">✗</span>
                        <span>Avoid lifting your heels off the ground</span>
                      </li>
                    </>
                  )}
                  
                  {selectedExercise === ExerciseType.DEADLIFT && (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-posture-correct mt-0.5">✓</span>
                        <span>Keep the bar close to your body</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-posture-correct mt-0.5">✓</span>
                        <span>Maintain a neutral spine throughout the movement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-posture-incorrect mt-0.5">✗</span>
                        <span>Don't round your back</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-posture-incorrect mt-0.5">✗</span>
                        <span>Avoid jerking the weight off the floor</span>
                      </li>
                    </>
                  )}
                  
                  {selectedExercise === ExerciseType.PUSHUP && (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-posture-correct mt-0.5">✓</span>
                        <span>Keep your body in a straight line from head to heels</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-posture-correct mt-0.5">✓</span>
                        <span>Position elbows at about 45 degrees to your body</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-posture-incorrect mt-0.5">✗</span>
                        <span>Don't let your hips sag or pike up</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-posture-incorrect mt-0.5">✗</span>
                        <span>Avoid flaring your elbows outward</span>
                      </li>
                    </>
                  )}
                  
                  {selectedExercise === ExerciseType.PLANK && (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-posture-correct mt-0.5">✓</span>
                        <span>Keep your body in a straight line</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-posture-correct mt-0.5">✓</span>
                        <span>Engage your core by drawing your navel toward your spine</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-posture-incorrect mt-0.5">✗</span>
                        <span>Don't let your hips sag or rise too high</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-posture-incorrect mt-0.5">✗</span>
                        <span>Avoid hunching your shoulders around your ears</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
          
          {selectedTab === 'stats' && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-medium mb-4">Your Progress Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glassmorphism p-6 rounded-xl shadow-sm border border-border/60 col-span-2">
                  <h3 className="text-base font-medium mb-4">Recent Progress</h3>
                  <div className="h-64 bg-secondary/40 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Your progress chart will appear here</p>
                  </div>
                </div>
                
                <div className="glassmorphism p-6 rounded-xl shadow-sm border border-border/60">
                  <h3 className="text-base font-medium mb-4">Summary</h3>
                  <div className="space-y-6">
                    <div className="text-center">
                      <p className="text-3xl font-semibold text-primary">75%</p>
                      <p className="text-sm text-muted-foreground">Average Score</p>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="text-center">
                        <p className="text-xl font-medium">12</p>
                        <p className="text-xs text-muted-foreground">Sessions</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-medium">4</p>
                        <p className="text-xs text-muted-foreground">Days</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-medium">3</p>
                        <p className="text-xs text-muted-foreground">Exercises</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glassmorphism p-6 rounded-xl shadow-sm border border-border/60">
                <h3 className="text-base font-medium mb-4">Exercise Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {exerciseOptions.map((exercise, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white rounded-lg p-4 shadow-sm border border-border/60 transition-all hover:shadow-md"
                    >
                      <p className="text-base font-medium mb-2">{exercise.label}</p>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-muted-foreground">Score</p>
                        <p className="text-sm font-medium">{70 + idx * 5}%</p>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden mb-3">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${70 + idx * 5}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {3 + idx} sessions completed
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {selectedTab === 'history' && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-medium mb-4">Your Session History</h2>
              <div className="glassmorphism rounded-xl p-6 shadow-sm border border-border/60">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-border/60">
                        <th className="text-left py-3 px-4 text-sm font-medium">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Exercise</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Duration</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Score</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/20">
                        <td className="py-3 px-4 text-sm">Today, 10:30 AM</td>
                        <td className="py-3 px-4 text-sm">Squat</td>
                        <td className="py-3 px-4 text-sm">15 min</td>
                        <td className="py-3 px-4 text-sm">85%</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Good form
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-border/20">
                        <td className="py-3 px-4 text-sm">Yesterday, 6:15 PM</td>
                        <td className="py-3 px-4 text-sm">Deadlift</td>
                        <td className="py-3 px-4 text-sm">20 min</td>
                        <td className="py-3 px-4 text-sm">70%</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Needs improvement
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-border/20">
                        <td className="py-3 px-4 text-sm">May 21, 8:00 AM</td>
                        <td className="py-3 px-4 text-sm">Push-up</td>
                        <td className="py-3 px-4 text-sm">10 min</td>
                        <td className="py-3 px-4 text-sm">90%</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Excellent form
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-border/20">
                        <td className="py-3 px-4 text-sm">May 20, 5:45 PM</td>
                        <td className="py-3 px-4 text-sm">Plank</td>
                        <td className="py-3 px-4 text-sm">5 min</td>
                        <td className="py-3 px-4 text-sm">65%</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Needs improvement
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
