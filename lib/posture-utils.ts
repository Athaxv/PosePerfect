export interface JointPoint {
  x: number;
  y: number;
  confidence: number;
}

export interface Pose {
  keypoints: Array<JointPoint & { name: string }>;
  score: number;
}

export enum ExerciseType {
  SQUAT = 'squat',
  DEADLIFT = 'deadlift',
  PUSHUP = 'pushup',
  PLANK = 'plank',
  LUNGE = 'lunge',
  BENCH_PRESS = 'benchPress',
  SHOULDER_PRESS = 'shoulderPress',
  BICEP_CURL = 'bicepCurl',
  YOGA_WARRIOR = 'yogaWarrior',
  YOGA_DOWNDOG = 'yogaDowndog',
  YOGA_TREE = 'yogaTree',
  YOGA_CHAIR = 'yogaChair'
}

export interface PostureAnalysisResult {
  isCorrect: boolean;
  score: number;
  feedback: string[];
  mainIssue: string | null;
}

export interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
  description: string;
  targetMuscles: string[];
  commonErrors: string[];
  tips: string[];
  imageUrl: string;
}

// Mock function for pose estimation
// In a real implementation, this would use TensorFlow.js or a similar library
export const estimatePose = async (video: HTMLVideoElement | null): Promise<Pose | null> => {
  // This is a mock function, in a real app you would use a pose estimation library
  if (!video) return null;
  
  // Mock pose data
  const mockPose: Pose = {
    keypoints: [
      { x: 200, y: 50, confidence: 0.9, name: 'nose' },
      { x: 210, y: 80, confidence: 0.85, name: 'leftEye' },
      { x: 190, y: 80, confidence: 0.85, name: 'rightEye' },
      { x: 220, y: 100, confidence: 0.7, name: 'leftEar' },
      { x: 180, y: 100, confidence: 0.7, name: 'rightEar' },
      { x: 250, y: 150, confidence: 0.8, name: 'leftShoulder' },
      { x: 150, y: 150, confidence: 0.8, name: 'rightShoulder' },
      { x: 270, y: 220, confidence: 0.75, name: 'leftElbow' },
      { x: 130, y: 220, confidence: 0.75, name: 'rightElbow' },
      { x: 290, y: 280, confidence: 0.7, name: 'leftWrist' },
      { x: 110, y: 280, confidence: 0.7, name: 'rightWrist' },
      { x: 240, y: 300, confidence: 0.8, name: 'leftHip' },
      { x: 160, y: 300, confidence: 0.8, name: 'rightHip' },
      { x: 250, y: 400, confidence: 0.75, name: 'leftKnee' },
      { x: 150, y: 400, confidence: 0.75, name: 'rightKnee' },
      { x: 260, y: 480, confidence: 0.7, name: 'leftAnkle' },
      { x: 140, y: 480, confidence: 0.7, name: 'rightAnkle' },
    ],
    score: 0.8
  };
  
  return mockPose;
};

// Function to analyze posture based on detected pose and exercise type
export const analyzePosture = (pose: Pose | null, exerciseType: ExerciseType): PostureAnalysisResult => {
  if (!pose) {
    return {
      isCorrect: false,
      score: 0,
      feedback: ['No pose detected. Please ensure you are visible in the frame.'],
      mainIssue: 'No pose detected'
    };
  }
  
  // Default result
  const result: PostureAnalysisResult = {
    isCorrect: true,
    score: 85,
    feedback: ['Your form looks good!'],
    mainIssue: null
  };
  
  // Mock analysis for different exercise types
  switch (exerciseType) {
    case ExerciseType.SQUAT:
      // Check for common squat mistakes
      if (Math.random() > 0.7) {
        result.isCorrect = false;
        result.score = 65;
        result.feedback = ['Knees caving inward', 'Maintain knee alignment with toes'];
        result.mainIssue = 'Knee valgus detected';
      }
      break;
      
    case ExerciseType.DEADLIFT:
      // Check for common deadlift mistakes
      if (Math.random() > 0.6) {
        result.isCorrect = false;
        result.score = 70;
        result.feedback = ['Back is rounding', 'Keep your spine neutral throughout the movement'];
        result.mainIssue = 'Spinal flexion detected';
      }
      break;
      
    case ExerciseType.PUSHUP:
      // Check for common pushup mistakes
      if (Math.random() > 0.5) {
        result.isCorrect = false;
        result.score = 75;
        result.feedback = ['Hips sagging', 'Engage your core to maintain a straight line'];
        result.mainIssue = 'Core not engaged';
      }
      break;
      
    case ExerciseType.YOGA_WARRIOR:
      if (Math.random() > 0.7) {
        result.isCorrect = false;
        result.score = 68;
        result.feedback = ['Hip not fully opened', 'Try to square your hips more to the side'];
        result.mainIssue = 'Hip alignment needs adjustment';
      }
      break;
      
    case ExerciseType.YOGA_DOWNDOG:
      if (Math.random() > 0.6) {
        result.isCorrect = false;
        result.score = 72;
        result.feedback = ['Heels not reaching toward the ground', 'Try to lengthen your spine more'];
        result.mainIssue = 'Heels lifting too high';
      }
      break;
      
    case ExerciseType.YOGA_TREE:
      if (Math.random() > 0.5) {
        result.isCorrect = false;
        result.score = 70;
        result.feedback = ['Body is leaning', 'Focus on keeping your standing leg straight'];
        result.mainIssue = 'Balance issue detected';
      }
      break;
      
    case ExerciseType.BENCH_PRESS:
      if (Math.random() > 0.6) {
        result.isCorrect = false;
        result.score = 75;
        result.feedback = ['Uneven bar path', 'Keep the bar moving in a straight line'];
        result.mainIssue = 'Inconsistent bar path';
      }
      break;
      
    case ExerciseType.BICEP_CURL:
      if (Math.random() > 0.5) {
        result.isCorrect = false;
        result.score = 70;
        result.feedback = ['Using momentum', 'Slow down and focus on the contraction'];
        result.mainIssue = 'Using body swing';
      }
      break;
      
    // Add more exercise types as needed
    
    default:
      // Generic posture checks
      if (Math.random() > 0.8) {
        result.isCorrect = false;
        result.score = 60;
        result.feedback = ['Uneven weight distribution', 'Try to balance your posture better'];
        result.mainIssue = 'Balance issue detected';
      }
  }
  
  return result;
};

// Updated exercise library with more exercises and yoga poses
export const exerciseLibrary: Exercise[] = [
  {
    id: '1',
    name: 'Barbell Squat',
    type: ExerciseType.SQUAT,
    description: 'A compound exercise that targets primarily the quadriceps, hamstrings, and glutes.',
    targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes', 'Core'],
    commonErrors: [
      'Knees caving inward',
      'Heels lifting off the ground',
      'Insufficient depth',
      'Forward lean'
    ],
    tips: [
      'Keep your chest up',
      'Push your knees outward',
      'Descend until thighs are parallel to the ground',
      'Keep your weight in your heels'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80'
  },
  {
    id: '2',
    name: 'Deadlift',
    type: ExerciseType.DEADLIFT,
    description: 'A compound exercise that works most major muscle groups, with emphasis on the posterior chain.',
    targetMuscles: ['Hamstrings', 'Glutes', 'Lower Back', 'Trapezius', 'Forearms'],
    commonErrors: [
      'Rounding the back',
      'Starting with the bar too far from shins',
      'Jerking the weight off the floor',
      'Insufficient hip extension'
    ],
    tips: [
      'Keep the bar close to your body',
      'Engage your lats before lifting',
      'Push through your heels',
      'Think of the movement as pushing the floor away rather than pulling the bar'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1598575478423-3f910c4366e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80'
  },
  {
    id: '3',
    name: 'Push-Up',
    type: ExerciseType.PUSHUP,
    description: 'A bodyweight exercise that targets the chest, shoulders, and triceps.',
    targetMuscles: ['Chest', 'Shoulders', 'Triceps', 'Core'],
    commonErrors: [
      'Sagging hips',
      'Flared elbows',
      'Incomplete range of motion',
      'Head dropping forward'
    ],
    tips: [
      'Keep your body in a straight line from head to heels',
      'Position elbows at about 45 degrees to your body',
      'Lower until chest nearly touches the ground',
      'Engage your core throughout the movement'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-a2570ad603a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80'
  },
  {
    id: '4',
    name: 'Plank',
    type: ExerciseType.PLANK,
    description: 'An isometric core exercise that also engages the shoulders, arms, and glutes.',
    targetMuscles: ['Core', 'Shoulders', 'Arms', 'Glutes'],
    commonErrors: [
      'Sagging hips',
      'Raised buttocks',
      'Shoulders hunched around ears',
      'Looking up or down'
    ],
    tips: [
      'Keep your body in a straight line',
      'Engage your core by drawing your navel toward your spine',
      'Keep shoulders down and back',
      'Look at a spot on the floor to keep your neck neutral'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1566241144246-c427d838eb9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80'
  },
  {
    id: '5',
    name: 'Lunge',
    type: ExerciseType.LUNGE,
    description: 'A unilateral exercise that targets the quadriceps, hamstrings, and glutes while improving balance and stability.',
    targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes', 'Core'],
    commonErrors: [
      'Front knee extending past the toes',
      'Torso leaning too far forward',
      'Back knee not lowering enough',
      'Uneven weight distribution'
    ],
    tips: [
      'Keep your torso upright',
      'Lower your back knee toward the floor',
      'Maintain a 90-degree angle in both knees at the bottom',
      'Push through your front heel when rising'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80'
  },
  {
    id: '6',
    name: 'Bench Press',
    type: ExerciseType.BENCH_PRESS,
    description: 'A compound upper body exercise that targets the chest, shoulders, and triceps.',
    targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
    commonErrors: [
      'Arching the back excessively',
      'Bouncing the bar off the chest',
      'Uneven bar path',
      'Wrists bending back'
    ],
    tips: [
      'Keep your feet flat on the floor',
      'Maintain a slight arch in your lower back',
      'Lower the bar to your mid-chest',
      'Keep your wrists straight throughout the movement'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1534368786749-b63e05c90863?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80'
  },
  {
    id: '7',
    name: 'Shoulder Press',
    type: ExerciseType.SHOULDER_PRESS,
    description: 'An upper body strength exercise that targets the shoulders, triceps, and upper chest.',
    targetMuscles: ['Shoulders', 'Triceps', 'Upper Chest', 'Core'],
    commonErrors: [
      'Arching the lower back',
      'Flaring the elbows too wide',
      'Incomplete range of motion',
      'Leaning back excessively'
    ],
    tips: [
      'Keep your core tight to protect your lower back',
      'Position elbows at about 45 degrees to your body',
      'Press the weight directly overhead',
      'Keep your wrists neutral throughout the movement'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80'
  },
  {
    id: '8',
    name: 'Bicep Curl',
    type: ExerciseType.BICEP_CURL,
    description: 'An isolation exercise that targets the biceps brachii muscles in the front of the upper arm.',
    targetMuscles: ['Biceps', 'Forearms'],
    commonErrors: [
      'Using momentum (swinging)',
      'Moving the elbows forward',
      'Incomplete range of motion',
      'Wrists bending excessively'
    ],
    tips: [
      'Keep your elbows fixed at your sides',
      'Fully extend your arms at the bottom',
      'Squeeze your biceps at the top',
      'Control the weight on the way down'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80'
  },
  {
    id: '9',
    name: 'Warrior Pose',
    type: ExerciseType.YOGA_WARRIOR,
    description: 'A fundamental standing yoga pose that strengthens the legs and core while improving balance and focus.',
    targetMuscles: ['Quadriceps', 'Hamstrings', 'Core', 'Shoulders'],
    commonErrors: [
      'Front knee not aligned with ankle',
      'Hips not square to the side',
      'Shoulders tensed up',
      'Back foot not at 45-degree angle'
    ],
    tips: [
      'Align your front heel with the arch of your back foot',
      'Keep your front knee directly above your ankle',
      'Square your hips toward the side of your mat',
      'Relax your shoulders down away from your ears'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80'
  },
  {
    id: '10',
    name: 'Downward-Facing Dog',
    type: ExerciseType.YOGA_DOWNDOG,
    description: 'A restorative yoga pose that stretches the hamstrings, calves, and shoulders while strengthening the arms and legs.',
    targetMuscles: ['Hamstrings', 'Calves', 'Shoulders', 'Arms', 'Core'],
    commonErrors: [
      'Rounding the upper back',
      'Heels lifted too high',
      'Hands too close to feet',
      'Shoulders hunched'
    ],
    tips: [
      'Create an inverted V-shape with your body',
      'Press your heels toward the floor (they don\'t have to touch)',
      'Spread your fingers wide and press into your knuckles',
      'Draw your shoulder blades down your back'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1508283117907-8182fdd73db9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80'
  },
  {
    id: '11',
    name: 'Tree Pose',
    type: ExerciseType.YOGA_TREE,
    description: 'A balancing yoga pose that improves focus, concentration, and stability while strengthening the legs and core.',
    targetMuscles: ['Legs', 'Core', 'Ankles'],
    commonErrors: [
      'Pressing foot against the knee joint',
      'Leaning to one side',
      'Hip of raised leg pointing forward',
      'Holding breath'
    ],
    tips: [
      'Press your foot into your inner thigh, not your knee',
      'Keep your standing leg straight but not locked',
      'Open the hip of your raised leg to the side',
      'Focus your gaze on a fixed point to maintain balance'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80'
  },
  {
    id: '12',
    name: 'Chair Pose',
    type: ExerciseType.YOGA_CHAIR,
    description: 'A standing yoga pose that strengthens the thighs, glutes, and core while improving posture and balance.',
    targetMuscles: ['Quadriceps', 'Glutes', 'Core', 'Lower Back'],
    commonErrors: [
      'Knees extending past toes',
      'Shoulders hunching forward',
      'Lower back arching',
      'Weight in the toes'
    ],
    tips: [
      'Sit back as if lowering into an imaginary chair',
      'Keep your weight in your heels',
      'Lengthen your spine and draw your shoulder blades down',
      'Keep your knees aligned with your second and third toes'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1599447292180-45fd84092ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80'
  }
];
