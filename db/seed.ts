import {
  ExerciseDominance,
  ExerciseEquipment,
  ExerciseHandle,
  ExerciseMachine,
  ExerciseMuscleGroup,
  ExerciseStyle,
  ExerciseTier,
  ExerciseType,
} from '@/models/enums';
import { ModelExercise } from '@/models/exercise';
import { ModelWorkoutTemplate } from '@/models/template';
import { ModelTemplateExercise } from '@/models/template-exercise';
import { ModelTemplateSet } from '@/models/template-set';
import { ModelWorkout } from '@/models/workout';
import { ModelWorkoutExercise } from '@/models/workout-exercise';
import { ModelWorkoutSet } from '@/models/workout-set';

import { AppDataSource } from './local-db';

const exercises = [
  {
    name: 'Push-up',
    description: 'Standard push-up exercise for chest, shoulders, and triceps',
    type: ExerciseType.Bodyweight,
    muscleGroup: ExerciseMuscleGroup.Chest,
    dominance: ExerciseDominance.MiddleChest,
    machine: ExerciseMachine.Bodyweight,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Pull-up',
    description: 'Bodyweight pulling exercise for back and biceps',
    type: ExerciseType.Bodyweight,
    muscleGroup: ExerciseMuscleGroup.Back,
    dominance: ExerciseDominance.BicepsLongHead,
    machine: ExerciseMachine.Bodyweight,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Bodyweight Squat',
    description: 'Basic bodyweight squat for legs and glutes',
    type: ExerciseType.Bodyweight,
    muscleGroup: ExerciseMuscleGroup.Legs,
    dominance: ExerciseDominance.Quadriceps,
    machine: ExerciseMachine.Bodyweight,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Handstand Push-up',
    description: 'Advanced inverted push-up for shoulders',
    type: ExerciseType.Bodyweight,
    muscleGroup: ExerciseMuscleGroup.Shoulders,
    dominance: ExerciseDominance.AnteriorDeltoid,
    machine: ExerciseMachine.Bodyweight,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },

  // Barbell Exercises
  {
    name: 'Barbell Bench Press',
    description: 'Classic chest exercise with barbell',
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.Chest,
    dominance: ExerciseDominance.MiddleChest,
    machine: ExerciseMachine.Barbell,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Barbell Deadlift',
    description: 'Compound pulling exercise for posterior chain',
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.FullBody,
    dominance: ExerciseDominance.Glutes,
    machine: ExerciseMachine.Barbell,
    equipment: ExerciseEquipment.Straps,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Barbell Back Squat',
    description: 'Compound leg exercise with barbell on back',
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.Legs,
    dominance: ExerciseDominance.Quadriceps,
    machine: ExerciseMachine.Barbell,
    equipment: ExerciseEquipment.KneeSleeves,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Barbell Row',
    description: 'Bent over row for back muscles',
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.Back,
    dominance: ExerciseDominance.BicepsLongHead,
    machine: ExerciseMachine.Barbell,
    equipment: ExerciseEquipment.Straps,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Overhead Press',
    description: 'Standing barbell press for shoulders',
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.Shoulders,
    dominance: ExerciseDominance.AnteriorDeltoid,
    machine: ExerciseMachine.Barbell,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },

  // Dumbbell Exercises
  {
    name: 'Dumbbell Chest Press',
    description: 'Chest exercise using dumbbells',
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.Chest,
    dominance: ExerciseDominance.MiddleChest,
    machine: ExerciseMachine.Dumbbell,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Dumbbell Bicep Curl',
    description: 'Isolation exercise for biceps',
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.Biceps,
    dominance: ExerciseDominance.BicepsLongHead,
    machine: ExerciseMachine.Dumbbell,
    equipment: ExerciseEquipment.ElbowSleeves,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Dumbbell Lateral Raise',
    description: 'Shoulder isolation exercise',
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.Shoulders,
    dominance: ExerciseDominance.LateralDeltoid,
    machine: ExerciseMachine.Dumbbell,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Hammer Curl',
    description: 'Bicep exercise with neutral grip',
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.Biceps,
    dominance: ExerciseDominance.Brachioradialis,
    machine: ExerciseMachine.Dumbbell,
    equipment: ExerciseEquipment.WristSleeves,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },

  // Cable Exercises
  {
    name: 'Cable Crossover',
    description: 'Chest isolation using cable machine',
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Chest,
    dominance: ExerciseDominance.MiddleChest,
    machine: ExerciseMachine.Cable,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.DHandle,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Lat Pulldown',
    description: 'Back exercise using cable machine',
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Back,
    dominance: ExerciseDominance.BicepsLongHead,
    machine: ExerciseMachine.Cable,
    equipment: ExerciseEquipment.Straps,
    handle: ExerciseHandle.LongStraightBar,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Cable Face Pull',
    description: 'Posterior deltoid exercise',
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Shoulders,
    dominance: ExerciseDominance.PosteriorDeltoid,
    machine: ExerciseMachine.Cable,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.DoubleRope,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Cable Tricep Extension',
    description: 'Tricep isolation using cable',
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Triceps,
    dominance: ExerciseDominance.TricepsLongHead,
    machine: ExerciseMachine.Cable,
    equipment: ExerciseEquipment.ElbowSleeves,
    handle: ExerciseHandle.ShortStraightBar,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Cable Crunch',
    description: 'Abdominal exercise using cable',
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Core,
    dominance: ExerciseDominance.Quadriceps,
    machine: ExerciseMachine.Cable,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.SingleRope,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },

  // Machine Exercises
  {
    name: 'Leg Press',
    description: 'Compound leg exercise on machine',
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Legs,
    dominance: ExerciseDominance.Quadriceps,
    machine: ExerciseMachine.Machine,
    equipment: ExerciseEquipment.KneeSleeves,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Chest Press Machine',
    description: 'Seated chest press on machine',
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Chest,
    dominance: ExerciseDominance.MiddleChest,
    machine: ExerciseMachine.Machine,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Seated Row Machine',
    description: 'Back exercise on seated row machine',
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Back,
    dominance: ExerciseDominance.BicepsLongHead,
    machine: ExerciseMachine.Machine,
    equipment: ExerciseEquipment.Straps,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Leg Curl Machine',
    description: 'Hamstring isolation on machine',
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Hamstrings,
    dominance: ExerciseDominance.Glutes,
    machine: ExerciseMachine.Machine,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Calf Press Machine',
    description: 'Calf exercise on leg press machine',
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Calves,
    dominance: ExerciseDominance.Quadriceps,
    machine: ExerciseMachine.Machine,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },

  // Specialty Bar Exercises
  {
    name: 'Trap Bar Deadlift',
    description: 'Deadlift variation using trap bar',
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.FullBody,
    dominance: ExerciseDominance.Quadriceps,
    machine: ExerciseMachine.TrapBar,
    equipment: ExerciseEquipment.Straps,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'EZ Bar Curl',
    description: 'Bicep curl with EZ bar',
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.Biceps,
    dominance: ExerciseDominance.BicepsLongHead,
    machine: ExerciseMachine.Barbell,
    equipment: ExerciseEquipment.ElbowSleeves,
    handle: ExerciseHandle.EzBar,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },

  // Smith Machine Exercises
  {
    name: 'Smith Machine Squat',
    description: 'Squat performed on Smith machine',
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Legs,
    dominance: ExerciseDominance.Quadriceps,
    machine: ExerciseMachine.SmithMachine,
    equipment: ExerciseEquipment.KneeSleeves,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Smith Machine Bench Press',
    description: 'Bench press on Smith machine',
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Chest,
    dominance: ExerciseDominance.MiddleChest,
    machine: ExerciseMachine.SmithMachine,
    equipment: ExerciseEquipment.WristSleeves,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },

  // Core Exercises
  {
    name: 'Plank',
    description: 'Isometric core exercise',
    type: ExerciseType.Bodyweight,
    muscleGroup: ExerciseMuscleGroup.Core,
    dominance: ExerciseDominance.Quadriceps,
    machine: ExerciseMachine.Bodyweight,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Russian Twist',
    description: 'Rotational core exercise',
    type: ExerciseType.Bodyweight,
    muscleGroup: ExerciseMuscleGroup.Core,
    dominance: ExerciseDominance.Quadriceps,
    machine: ExerciseMachine.Bodyweight,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },

  // Cardio Exercises
  {
    name: 'Treadmill Running',
    description: 'Cardiovascular exercise on treadmill',
    type: ExerciseType.Cardio,
    muscleGroup: ExerciseMuscleGroup.FullBody,
    dominance: ExerciseDominance.Quadriceps,
    machine: ExerciseMachine.Machine,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
  {
    name: 'Rowing Machine',
    description: 'Full body cardio exercise',
    type: ExerciseType.Cardio,
    muscleGroup: ExerciseMuscleGroup.FullBody,
    dominance: ExerciseDominance.BicepsLongHead,
    machine: ExerciseMachine.Machine,
    equipment: ExerciseEquipment.Straps,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound,
  },
];

// Workout Templates
const workoutTemplates = [
  {
    name: 'Push Day',
    description: 'Upper body pushing muscles workout focusing on chest, shoulders, and triceps',
  },
  {
    name: 'Pull Day',
    description: 'Upper body pulling muscles workout focusing on back and biceps',
  },
  {
    name: 'Leg Day',
    description: 'Lower body workout focusing on quads, hamstrings, and glutes',
  },
  {
    name: 'Full Body',
    description: 'Complete body workout hitting all major muscle groups',
  },
  {
    name: 'Upper Body',
    description: 'Upper body workout combining push and pull movements',
  },
  {
    name: 'Core Focus',
    description: 'Workout emphasizing core strength and stability',
  },
];

// Template Exercises (linking exercises to templates)
const templateExercises = [
  // Push Day Template
  { exerciseId: 1, templateId: 1 }, // Push-up
  { exerciseId: 5, templateId: 1 }, // Barbell Bench Press
  { exerciseId: 9, templateId: 1 }, // Dumbbell Chest Press
  { exerciseId: 11, templateId: 1 }, // Dumbbell Lateral Raise
  { exerciseId: 15, templateId: 1 }, // Cable Tricep Extension

  // Pull Day Template
  { exerciseId: 2, templateId: 2 }, // Pull-up
  { exerciseId: 8, templateId: 2 }, // Barbell Row
  { exerciseId: 12, templateId: 2 }, // Dumbbell Bicep Curl
  { exerciseId: 16, templateId: 2 }, // Lat Pulldown
  { exerciseId: 18, templateId: 2 }, // Cable Face Pull

  // Leg Day Template
  { exerciseId: 3, templateId: 3 }, // Bodyweight Squat
  { exerciseId: 7, templateId: 3 }, // Barbell Back Squat
  { exerciseId: 6, templateId: 3 }, // Barbell Deadlift
  { exerciseId: 25, templateId: 3 }, // Leg Press
  { exerciseId: 28, templateId: 3 }, // Leg Curl Machine
  { exerciseId: 29, templateId: 3 }, // Calf Press Machine

  // Full Body Template
  { exerciseId: 7, templateId: 4 }, // Barbell Back Squat
  { exerciseId: 5, templateId: 4 }, // Barbell Bench Press
  { exerciseId: 8, templateId: 4 }, // Barbell Row
  { exerciseId: 10, templateId: 4 }, // Overhead Press
  { exerciseId: 6, templateId: 4 }, // Barbell Deadlift

  // Upper Body Template
  { exerciseId: 5, templateId: 5 }, // Barbell Bench Press
  { exerciseId: 8, templateId: 5 }, // Barbell Row
  { exerciseId: 10, templateId: 5 }, // Overhead Press
  { exerciseId: 12, templateId: 5 }, // Dumbbell Bicep Curl
  { exerciseId: 15, templateId: 5 }, // Cable Tricep Extension

  // Core Focus Template
  { exerciseId: 30, templateId: 6 }, // Plank
  { exerciseId: 31, templateId: 6 }, // Russian Twist
  { exerciseId: 20, templateId: 6 }, // Cable Crunch
];

// Template Sets (sets for each template exercise)
const templateSets = [
  // Push Day Template Sets
  {
    templateExerciseId: 1,
    number: 1,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 8, upper: 12 },
    guides: 'Keep core tight, full range of motion',
  },
  {
    templateExerciseId: 1,
    number: 2,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 8, upper: 12 },
    guides: 'Keep core tight, full range of motion',
  },
  {
    templateExerciseId: 1,
    number: 3,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 8, upper: 12 },
    guides: 'Keep core tight, full range of motion',
  },

  {
    templateExerciseId: 2,
    number: 1,
    expectedRIR: 2,
    rest: 120,
    repRange: { lower: 5, upper: 8 },
    guides: 'Control the weight, touch chest lightly',
  },
  {
    templateExerciseId: 2,
    number: 2,
    expectedRIR: 2,
    rest: 120,
    repRange: { lower: 5, upper: 8 },
    guides: 'Control the weight, touch chest lightly',
  },
  {
    templateExerciseId: 2,
    number: 3,
    expectedRIR: 2,
    rest: 120,
    repRange: { lower: 5, upper: 8 },
    guides: 'Control the weight, touch chest lightly',
  },

  {
    templateExerciseId: 3,
    number: 1,
    expectedRIR: 2,
    rest: 90,
    repRange: { lower: 8, upper: 12 },
    guides: 'Squeeze chest at top, control descent',
  },
  {
    templateExerciseId: 3,
    number: 2,
    expectedRIR: 2,
    rest: 90,
    repRange: { lower: 8, upper: 12 },
    guides: 'Squeeze chest at top, control descent',
  },
  {
    templateExerciseId: 3,
    number: 3,
    expectedRIR: 2,
    rest: 90,
    repRange: { lower: 8, upper: 12 },
    guides: 'Squeeze chest at top, control descent',
  },

  {
    templateExerciseId: 4,
    number: 1,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 10, upper: 15 },
    guides: 'Lead with pinkies, slight forward lean',
  },
  {
    templateExerciseId: 4,
    number: 2,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 10, upper: 15 },
    guides: 'Lead with pinkies, slight forward lean',
  },
  {
    templateExerciseId: 4,
    number: 3,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 10, upper: 15 },
    guides: 'Lead with pinkies, slight forward lean',
  },

  {
    templateExerciseId: 5,
    number: 1,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 10, upper: 15 },
    guides: 'Keep elbows stationary, full extension',
  },
  {
    templateExerciseId: 5,
    number: 2,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 10, upper: 15 },
    guides: 'Keep elbows stationary, full extension',
  },
  {
    templateExerciseId: 5,
    number: 3,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 10, upper: 15 },
    guides: 'Keep elbows stationary, full extension',
  },

  // Pull Day Template Sets
  {
    templateExerciseId: 6,
    number: 1,
    expectedRIR: 2,
    rest: 90,
    repRange: { lower: 6, upper: 10 },
    guides: 'Full range of motion, controlled descent',
  },
  {
    templateExerciseId: 6,
    number: 2,
    expectedRIR: 2,
    rest: 90,
    repRange: { lower: 6, upper: 10 },
    guides: 'Full range of motion, controlled descent',
  },
  {
    templateExerciseId: 6,
    number: 3,
    expectedRIR: 2,
    rest: 90,
    repRange: { lower: 6, upper: 10 },
    guides: 'Full range of motion, controlled descent',
  },

  {
    templateExerciseId: 7,
    number: 1,
    expectedRIR: 2,
    rest: 120,
    repRange: { lower: 6, upper: 8 },
    guides: 'Pull to lower chest, squeeze shoulder blades',
  },
  {
    templateExerciseId: 7,
    number: 2,
    expectedRIR: 2,
    rest: 120,
    repRange: { lower: 6, upper: 8 },
    guides: 'Pull to lower chest, squeeze shoulder blades',
  },
  {
    templateExerciseId: 7,
    number: 3,
    expectedRIR: 2,
    rest: 120,
    repRange: { lower: 6, upper: 8 },
    guides: 'Pull to lower chest, squeeze shoulder blades',
  },

  {
    templateExerciseId: 8,
    number: 1,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 10, upper: 15 },
    guides: 'Control the weight, squeeze biceps at top',
  },
  {
    templateExerciseId: 8,
    number: 2,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 10, upper: 15 },
    guides: 'Control the weight, squeeze biceps at top',
  },
  {
    templateExerciseId: 8,
    number: 3,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 10, upper: 15 },
    guides: 'Control the weight, squeeze biceps at top',
  },

  {
    templateExerciseId: 9,
    number: 1,
    expectedRIR: 2,
    rest: 90,
    repRange: { lower: 8, upper: 12 },
    guides: 'Pull to upper chest, wide grip',
  },
  {
    templateExerciseId: 9,
    number: 2,
    expectedRIR: 2,
    rest: 90,
    repRange: { lower: 8, upper: 12 },
    guides: 'Pull to upper chest, wide grip',
  },
  {
    templateExerciseId: 9,
    number: 3,
    expectedRIR: 2,
    rest: 90,
    repRange: { lower: 8, upper: 12 },
    guides: 'Pull to upper chest, wide grip',
  },

  {
    templateExerciseId: 10,
    number: 1,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 12, upper: 15 },
    guides: 'Pull to face, external rotation',
  },
  {
    templateExerciseId: 10,
    number: 2,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 12, upper: 15 },
    guides: 'Pull to face, external rotation',
  },
  {
    templateExerciseId: 10,
    number: 3,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 12, upper: 15 },
    guides: 'Pull to face, external rotation',
  },

  // Leg Day Template Sets
  {
    templateExerciseId: 11,
    number: 1,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 15, upper: 20 },
    guides: 'Deep squat, full range of motion',
  },
  {
    templateExerciseId: 11,
    number: 2,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 15, upper: 20 },
    guides: 'Deep squat, full range of motion',
  },
  {
    templateExerciseId: 11,
    number: 3,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 15, upper: 20 },
    guides: 'Deep squat, full range of motion',
  },

  {
    templateExerciseId: 12,
    number: 1,
    expectedRIR: 2,
    rest: 180,
    repRange: { lower: 5, upper: 8 },
    guides: 'Deep squat, knees out, chest up',
  },
  {
    templateExerciseId: 12,
    number: 2,
    expectedRIR: 2,
    rest: 180,
    repRange: { lower: 5, upper: 8 },
    guides: 'Deep squat, knees out, chest up',
  },
  {
    templateExerciseId: 12,
    number: 3,
    expectedRIR: 2,
    rest: 180,
    repRange: { lower: 5, upper: 8 },
    guides: 'Deep squat, knees out, chest up',
  },

  {
    templateExerciseId: 13,
    number: 1,
    expectedRIR: 2,
    rest: 180,
    repRange: { lower: 5, upper: 8 },
    guides: 'Hip hinge movement, keep bar close',
  },
  {
    templateExerciseId: 13,
    number: 2,
    expectedRIR: 2,
    rest: 180,
    repRange: { lower: 5, upper: 8 },
    guides: 'Hip hinge movement, keep bar close',
  },
  {
    templateExerciseId: 13,
    number: 3,
    expectedRIR: 2,
    rest: 180,
    repRange: { lower: 5, upper: 8 },
    guides: 'Hip hinge movement, keep bar close',
  },

  {
    templateExerciseId: 14,
    number: 1,
    expectedRIR: 2,
    rest: 90,
    repRange: { lower: 12, upper: 15 },
    guides: 'Full range of motion, controlled movement',
  },
  {
    templateExerciseId: 14,
    number: 2,
    expectedRIR: 2,
    rest: 90,
    repRange: { lower: 12, upper: 15 },
    guides: 'Full range of motion, controlled movement',
  },
  {
    templateExerciseId: 14,
    number: 3,
    expectedRIR: 2,
    rest: 90,
    repRange: { lower: 12, upper: 15 },
    guides: 'Full range of motion, controlled movement',
  },

  {
    templateExerciseId: 15,
    number: 1,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 12, upper: 15 },
    guides: 'Squeeze hamstrings, controlled tempo',
  },
  {
    templateExerciseId: 15,
    number: 2,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 12, upper: 15 },
    guides: 'Squeeze hamstrings, controlled tempo',
  },
  {
    templateExerciseId: 15,
    number: 3,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 12, upper: 15 },
    guides: 'Squeeze hamstrings, controlled tempo',
  },

  {
    templateExerciseId: 16,
    number: 1,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 15, upper: 20 },
    guides: 'Full range of motion, squeeze calves',
  },
  {
    templateExerciseId: 16,
    number: 2,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 15, upper: 20 },
    guides: 'Full range of motion, squeeze calves',
  },
  {
    templateExerciseId: 16,
    number: 3,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 15, upper: 20 },
    guides: 'Full range of motion, squeeze calves',
  },

  // Full Body Template Sets
  {
    templateExerciseId: 17,
    number: 1,
    expectedRIR: 2,
    rest: 180,
    repRange: { lower: 5, upper: 8 },
    guides: 'Deep squat, knees out, chest up',
  },
  {
    templateExerciseId: 17,
    number: 2,
    expectedRIR: 2,
    rest: 180,
    repRange: { lower: 5, upper: 8 },
    guides: 'Deep squat, knees out, chest up',
  },
  {
    templateExerciseId: 17,
    number: 3,
    expectedRIR: 2,
    rest: 180,
    repRange: { lower: 5, upper: 8 },
    guides: 'Deep squat, knees out, chest up',
  },

  {
    templateExerciseId: 18,
    number: 1,
    expectedRIR: 2,
    rest: 120,
    repRange: { lower: 5, upper: 8 },
    guides: 'Control the weight, touch chest lightly',
  },
  {
    templateExerciseId: 18,
    number: 2,
    expectedRIR: 2,
    rest: 120,
    repRange: { lower: 5, upper: 8 },
    guides: 'Control the weight, touch chest lightly',
  },
  {
    templateExerciseId: 18,
    number: 3,
    expectedRIR: 2,
    rest: 120,
    repRange: { lower: 5, upper: 8 },
    guides: 'Control the weight, touch chest lightly',
  },

  {
    templateExerciseId: 19,
    number: 1,
    expectedRIR: 2,
    rest: 120,
    repRange: { lower: 6, upper: 8 },
    guides: 'Pull to lower chest, squeeze shoulder blades',
  },
  {
    templateExerciseId: 19,
    number: 2,
    expectedRIR: 2,
    rest: 120,
    repRange: { lower: 6, upper: 8 },
    guides: 'Pull to lower chest, squeeze shoulder blades',
  },
  {
    templateExerciseId: 19,
    number: 3,
    expectedRIR: 2,
    rest: 120,
    repRange: { lower: 6, upper: 8 },
    guides: 'Pull to lower chest, squeeze shoulder blades',
  },

  {
    templateExerciseId: 20,
    number: 1,
    expectedRIR: 2,
    rest: 90,
    repRange: { lower: 6, upper: 8 },
    guides: 'Press overhead, core tight',
  },
  {
    templateExerciseId: 20,
    number: 2,
    expectedRIR: 2,
    rest: 90,
    repRange: { lower: 6, upper: 8 },
    guides: 'Press overhead, core tight',
  },
  {
    templateExerciseId: 20,
    number: 3,
    expectedRIR: 2,
    rest: 90,
    repRange: { lower: 6, upper: 8 },
    guides: 'Press overhead, core tight',
  },

  {
    templateExerciseId: 21,
    number: 1,
    expectedRIR: 2,
    rest: 180,
    repRange: { lower: 5, upper: 8 },
    guides: 'Hip hinge movement, keep bar close',
  },
  {
    templateExerciseId: 21,
    number: 2,
    expectedRIR: 2,
    rest: 180,
    repRange: { lower: 5, upper: 8 },
    guides: 'Hip hinge movement, keep bar close',
  },
  {
    templateExerciseId: 21,
    number: 3,
    expectedRIR: 2,
    rest: 180,
    repRange: { lower: 5, upper: 8 },
    guides: 'Hip hinge movement, keep bar close',
  },

  // Upper Body Template Sets
  {
    templateExerciseId: 22,
    number: 1,
    expectedRIR: 2,
    rest: 120,
    repRange: { lower: 5, upper: 8 },
    guides: 'Control the weight, touch chest lightly',
  },
  {
    templateExerciseId: 22,
    number: 2,
    expectedRIR: 2,
    rest: 120,
    repRange: { lower: 5, upper: 8 },
    guides: 'Control the weight, touch chest lightly',
  },
  {
    templateExerciseId: 22,
    number: 3,
    expectedRIR: 2,
    rest: 120,
    repRange: { lower: 5, upper: 8 },
    guides: 'Control the weight, touch chest lightly',
  },

  {
    templateExerciseId: 23,
    number: 1,
    expectedRIR: 2,
    rest: 120,
    repRange: { lower: 6, upper: 8 },
    guides: 'Pull to lower chest, squeeze shoulder blades',
  },
  {
    templateExerciseId: 23,
    number: 2,
    expectedRIR: 2,
    rest: 120,
    repRange: { lower: 6, upper: 8 },
    guides: 'Pull to lower chest, squeeze shoulder blades',
  },
  {
    templateExerciseId: 23,
    number: 3,
    expectedRIR: 2,
    rest: 120,
    repRange: { lower: 6, upper: 8 },
    guides: 'Pull to lower chest, squeeze shoulder blades',
  },

  {
    templateExerciseId: 24,
    number: 1,
    expectedRIR: 2,
    rest: 90,
    repRange: { lower: 6, upper: 8 },
    guides: 'Press overhead, core tight',
  },
  {
    templateExerciseId: 24,
    number: 2,
    expectedRIR: 2,
    rest: 90,
    repRange: { lower: 6, upper: 8 },
    guides: 'Press overhead, core tight',
  },
  {
    templateExerciseId: 24,
    number: 3,
    expectedRIR: 2,
    rest: 90,
    repRange: { lower: 6, upper: 8 },
    guides: 'Press overhead, core tight',
  },

  {
    templateExerciseId: 25,
    number: 1,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 10, upper: 15 },
    guides: 'Control the weight, squeeze biceps at top',
  },
  {
    templateExerciseId: 25,
    number: 2,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 10, upper: 15 },
    guides: 'Control the weight, squeeze biceps at top',
  },
  {
    templateExerciseId: 25,
    number: 3,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 10, upper: 15 },
    guides: 'Control the weight, squeeze biceps at top',
  },

  {
    templateExerciseId: 26,
    number: 1,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 10, upper: 15 },
    guides: 'Keep elbows stationary, full extension',
  },
  {
    templateExerciseId: 26,
    number: 2,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 10, upper: 15 },
    guides: 'Keep elbows stationary, full extension',
  },
  {
    templateExerciseId: 26,
    number: 3,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 10, upper: 15 },
    guides: 'Keep elbows stationary, full extension',
  },

  // Core Focus Template Sets
  {
    templateExerciseId: 27,
    number: 1,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 30, upper: 60 },
    guides: 'Hold position, keep core tight',
  },
  {
    templateExerciseId: 27,
    number: 2,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 30, upper: 60 },
    guides: 'Hold position, keep core tight',
  },
  {
    templateExerciseId: 27,
    number: 3,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 30, upper: 60 },
    guides: 'Hold position, keep core tight',
  },

  {
    templateExerciseId: 28,
    number: 1,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 20, upper: 30 },
    guides: 'Rotate torso, keep core engaged',
  },
  {
    templateExerciseId: 28,
    number: 2,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 20, upper: 30 },
    guides: 'Rotate torso, keep core engaged',
  },
  {
    templateExerciseId: 28,
    number: 3,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 20, upper: 30 },
    guides: 'Rotate torso, keep core engaged',
  },

  {
    templateExerciseId: 29,
    number: 1,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 15, upper: 20 },
    guides: 'Crunch down, squeeze abs',
  },
  {
    templateExerciseId: 29,
    number: 2,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 15, upper: 20 },
    guides: 'Crunch down, squeeze abs',
  },
  {
    templateExerciseId: 29,
    number: 3,
    expectedRIR: 2,
    rest: 60,
    repRange: { lower: 15, upper: 20 },
    guides: 'Crunch down, squeeze abs',
  },
];

// Workout Instances (actual workouts performed)
const workouts = [
  {
    name: 'Push Day - Week 1',
    description: 'First push day workout of the program',
    date: '2024-01-15T10:00:00Z',
    templateId: 1,
  },
  {
    name: 'Pull Day - Week 1',
    description: 'First pull day workout of the program',
    date: '2024-01-16T10:00:00Z',
    templateId: 2,
  },
  {
    name: 'Leg Day - Week 1',
    description: 'First leg day workout of the program',
    date: '2024-01-17T10:00:00Z',
    templateId: 3,
  },
  {
    name: 'Full Body - Week 1',
    description: 'First full body workout of the program',
    date: '2024-01-18T10:00:00Z',
    templateId: 4,
  },
  {
    name: 'Push Day - Week 2',
    description: 'Second push day workout with increased weights',
    date: '2024-01-22T10:00:00Z',
    templateId: 1,
  },
];

// Workout Exercises (linking exercises to actual workouts)
const workoutExercises = [
  // Push Day - Week 1
  { exerciseId: 1, workoutId: 1 }, // Push-up
  { exerciseId: 5, workoutId: 1 }, // Barbell Bench Press
  { exerciseId: 9, workoutId: 1 }, // Dumbbell Chest Press
  { exerciseId: 11, workoutId: 1 }, // Dumbbell Lateral Raise
  { exerciseId: 15, workoutId: 1 }, // Cable Tricep Extension

  // Pull Day - Week 1
  { exerciseId: 2, workoutId: 2 }, // Pull-up
  { exerciseId: 8, workoutId: 2 }, // Barbell Row
  { exerciseId: 12, workoutId: 2 }, // Dumbbell Bicep Curl
  { exerciseId: 16, workoutId: 2 }, // Lat Pulldown
  { exerciseId: 18, workoutId: 2 }, // Cable Face Pull

  // Leg Day - Week 1
  { exerciseId: 3, workoutId: 3 }, // Bodyweight Squat
  { exerciseId: 7, workoutId: 3 }, // Barbell Back Squat
  { exerciseId: 6, workoutId: 3 }, // Barbell Deadlift
  { exerciseId: 25, workoutId: 3 }, // Leg Press
  { exerciseId: 28, workoutId: 3 }, // Leg Curl Machine

  // Full Body - Week 1
  { exerciseId: 7, workoutId: 4 }, // Barbell Back Squat
  { exerciseId: 5, workoutId: 4 }, // Barbell Bench Press
  { exerciseId: 8, workoutId: 4 }, // Barbell Row
  { exerciseId: 10, workoutId: 4 }, // Overhead Press
  { exerciseId: 6, workoutId: 4 }, // Barbell Deadlift

  // Push Day - Week 2
  { exerciseId: 1, workoutId: 5 }, // Push-up
  { exerciseId: 5, workoutId: 5 }, // Barbell Bench Press
  { exerciseId: 9, workoutId: 5 }, // Dumbbell Chest Press
  { exerciseId: 11, workoutId: 5 }, // Dumbbell Lateral Raise
  { exerciseId: 15, workoutId: 5 }, // Cable Tricep Extension
];

// Workout Sets (actual sets performed in workouts)
const workoutSets = [
  // Push Day - Week 1 Sets
  {
    workoutExerciseId: 1,
    number: 1,
    actualRIR: 2,
    rest: 60,
    reps: 10,
    load: 0,
    notes: 'Good form, felt strong',
  },
  {
    workoutExerciseId: 1,
    number: 2,
    actualRIR: 1,
    rest: 60,
    reps: 8,
    load: 0,
    notes: 'Last few reps were tough',
  },
  {
    workoutExerciseId: 1,
    number: 3,
    actualRIR: 3,
    rest: 60,
    reps: 12,
    load: 0,
    notes: 'Felt easier than expected',
  },

  {
    workoutExerciseId: 2,
    number: 1,
    actualRIR: 2,
    rest: 120,
    reps: 6,
    load: 135,
    notes: 'Good warm-up set',
  },
  {
    workoutExerciseId: 2,
    number: 2,
    actualRIR: 1,
    rest: 120,
    reps: 5,
    load: 155,
    notes: 'Challenging but completed',
  },
  {
    workoutExerciseId: 2,
    number: 3,
    actualRIR: 2,
    rest: 120,
    reps: 6,
    load: 145,
    notes: 'Dropped weight for better form',
  },

  {
    workoutExerciseId: 3,
    number: 1,
    actualRIR: 2,
    rest: 90,
    reps: 10,
    load: 50,
    notes: 'Good pump',
  },
  {
    workoutExerciseId: 3,
    number: 2,
    actualRIR: 1,
    rest: 90,
    reps: 8,
    load: 60,
    notes: 'Increased weight',
  },
  {
    workoutExerciseId: 3,
    number: 3,
    actualRIR: 2,
    rest: 90,
    reps: 9,
    load: 55,
    notes: 'Solid set',
  },

  {
    workoutExerciseId: 4,
    number: 1,
    actualRIR: 2,
    rest: 60,
    reps: 12,
    load: 15,
    notes: 'Good shoulder pump',
  },
  {
    workoutExerciseId: 4,
    number: 2,
    actualRIR: 1,
    rest: 60,
    reps: 10,
    load: 20,
    notes: 'Increased weight',
  },
  {
    workoutExerciseId: 4,
    number: 3,
    actualRIR: 2,
    rest: 60,
    reps: 11,
    load: 17.5,
    notes: 'Good middle ground',
  },

  {
    workoutExerciseId: 5,
    number: 1,
    actualRIR: 2,
    rest: 60,
    reps: 12,
    load: 40,
    notes: 'Tricep burn',
  },
  {
    workoutExerciseId: 5,
    number: 2,
    actualRIR: 1,
    rest: 60,
    reps: 10,
    load: 50,
    notes: 'Increased weight',
  },
  {
    workoutExerciseId: 5,
    number: 3,
    actualRIR: 2,
    rest: 60,
    reps: 11,
    load: 45,
    notes: 'Good finish',
  },
];

// Comprehensive seeding function
export const seedAllData = async () => {
  try {
    // Seed exercises first (base entities)
    const savedExercises = await AppDataSource.getRepository(ModelExercise).save(exercises);
    console.log('✅ Database seeded with exercises');

    // Seed workout templates
    const savedTemplates =
      await AppDataSource.getRepository(ModelWorkoutTemplate).save(workoutTemplates);
    console.log('✅ Database seeded with workout templates');

    // Seed template exercises (linking exercises to templates)
    const templateExerciseEntities = templateExercises.map(te => {
      const templateExercise = new ModelTemplateExercise();
      templateExercise.exerciseId = te.exerciseId;
      templateExercise.templateId = te.templateId;
      templateExercise.exercise = savedExercises.find(e => e.id === te.exerciseId)!;
      templateExercise.template = savedTemplates.find(t => t.id === te.templateId)!;
      return templateExercise;
    });
    const savedTemplateExercises =
      await AppDataSource.getRepository(ModelTemplateExercise).save(templateExerciseEntities);
    console.log('✅ Database seeded with template exercises');

    // Seed template sets
    const templateSetEntities = templateSets.map(ts => {
      const templateSet = new ModelTemplateSet();
      templateSet.number = ts.number;
      templateSet.expectedRIR = ts.expectedRIR;
      templateSet.rest = ts.rest;
      templateSet.repRange = ts.repRange;
      templateSet.guides = ts.guides;
      templateSet.templateExercise = savedTemplateExercises.find(
        te => te.id === ts.templateExerciseId
      )!;
      return templateSet;
    });
    await AppDataSource.getRepository(ModelTemplateSet).save(templateSetEntities);
    console.log('✅ Database seeded with template sets');

    // Seed workouts
    const workoutEntities = workouts.map(w => {
      const workout = new ModelWorkout();
      workout.name = w.name;
      workout.description = w.description;
      workout.date = w.date;
      workout.template = savedTemplates.find(t => t.id === w.templateId)!;
      return workout;
    });
    const savedWorkouts = await AppDataSource.getRepository(ModelWorkout).save(workoutEntities);
    console.log('✅ Database seeded with workouts');

    // Seed workout exercises
    const workoutExerciseEntities = workoutExercises.map(we => {
      const workoutExercise = new ModelWorkoutExercise();
      workoutExercise.exercise = savedExercises.find(e => e.id === we.exerciseId)!;
      workoutExercise.workout = savedWorkouts.find(w => w.id === we.workoutId)!;
      return workoutExercise;
    });
    const savedWorkoutExercises =
      await AppDataSource.getRepository(ModelWorkoutExercise).save(workoutExerciseEntities);
    console.log('✅ Database seeded with workout exercises');

    // Seed workout sets
    const workoutSetEntities = workoutSets.map(ws => {
      const workoutSet = new ModelWorkoutSet();
      workoutSet.number = ws.number;
      workoutSet.actualRIR = ws.actualRIR;
      workoutSet.rest = ws.rest;
      workoutSet.reps = ws.reps;
      workoutSet.load = ws.load;
      workoutSet.notes = ws.notes;
      workoutSet.workoutExercise = savedWorkoutExercises.find(
        we => we.id === ws.workoutExerciseId
      )!;
      return workoutSet;
    });
    await AppDataSource.getRepository(ModelWorkoutSet).save(workoutSetEntities);
    console.log('✅ Database seeded with workout sets');

    console.log('🎉 All seed data has been successfully added to the database!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

// Individual seeding functions for specific entities
export const seedExercises = async () => {
  await AppDataSource.getRepository(ModelExercise).save(exercises);
  console.log('✅ Database seeded with exercises');
};

export const seedWorkoutTemplates = async () => {
  await AppDataSource.getRepository(ModelWorkoutTemplate).save(workoutTemplates);
  console.log('✅ Database seeded with workout templates');
};

export const seedWorkouts = async () => {
  const savedTemplates = await AppDataSource.getRepository(ModelWorkoutTemplate).find();
  const workoutEntities = workouts.map(w => {
    const workout = new ModelWorkout();
    workout.name = w.name;
    workout.description = w.description;
    workout.date = w.date;
    workout.template = savedTemplates.find(t => t.id === w.templateId)!;
    return workout;
  });
  await AppDataSource.getRepository(ModelWorkout).save(workoutEntities);
  console.log('✅ Database seeded with workouts');
};
