import {
  ExerciseDominance,
  ExerciseEquipment,
  ExerciseHandle,
  ExerciseMachine,
  ExerciseMuscleGroup,
  ExerciseStyle,
  ExerciseTier,
  ExerciseType,
} from "@/models/enums";
import { Exercise } from "@/models/exercise";
import { AppDataSource } from "./local-db";

const exercises = [
  {
    name: "Push-up",
    description: "Standard push-up exercise for chest, shoulders, and triceps",
    type: ExerciseType.Bodyweight,
    muscleGroup: ExerciseMuscleGroup.Chest,
    dominance: ExerciseDominance.MiddleChest,
    machine: ExerciseMachine.Bodyweight,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Pull-up",
    description: "Bodyweight pulling exercise for back and biceps",
    type: ExerciseType.Bodyweight,
    muscleGroup: ExerciseMuscleGroup.Back,
    dominance: ExerciseDominance.BicepsLongHead,
    machine: ExerciseMachine.Bodyweight,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Bodyweight Squat",
    description: "Basic bodyweight squat for legs and glutes",
    type: ExerciseType.Bodyweight,
    muscleGroup: ExerciseMuscleGroup.Legs,
    dominance: ExerciseDominance.Quadriceps,
    machine: ExerciseMachine.Bodyweight,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Handstand Push-up",
    description: "Advanced inverted push-up for shoulders",
    type: ExerciseType.Bodyweight,
    muscleGroup: ExerciseMuscleGroup.Shoulders,
    dominance: ExerciseDominance.AnteriorDeltoid,
    machine: ExerciseMachine.Bodyweight,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },

  // Barbell Exercises
  {
    name: "Barbell Bench Press",
    description: "Classic chest exercise with barbell",
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.Chest,
    dominance: ExerciseDominance.MiddleChest,
    machine: ExerciseMachine.Barbell,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Barbell Deadlift",
    description: "Compound pulling exercise for posterior chain",
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.FullBody,
    dominance: ExerciseDominance.Glutes,
    machine: ExerciseMachine.Barbell,
    equipment: ExerciseEquipment.Straps,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Barbell Back Squat",
    description: "Compound leg exercise with barbell on back",
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.Legs,
    dominance: ExerciseDominance.Quadriceps,
    machine: ExerciseMachine.Barbell,
    equipment: ExerciseEquipment.KneeSleeves,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Barbell Row",
    description: "Bent over row for back muscles",
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.Back,
    dominance: ExerciseDominance.BicepsLongHead,
    machine: ExerciseMachine.Barbell,
    equipment: ExerciseEquipment.Straps,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Overhead Press",
    description: "Standing barbell press for shoulders",
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.Shoulders,
    dominance: ExerciseDominance.AnteriorDeltoid,
    machine: ExerciseMachine.Barbell,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },

  // Dumbbell Exercises
  {
    name: "Dumbbell Chest Press",
    description: "Chest exercise using dumbbells",
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.Chest,
    dominance: ExerciseDominance.MiddleChest,
    machine: ExerciseMachine.Dumbbell,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Dumbbell Bicep Curl",
    description: "Isolation exercise for biceps",
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.Biceps,
    dominance: ExerciseDominance.BicepsLongHead,
    machine: ExerciseMachine.Dumbbell,
    equipment: ExerciseEquipment.ElbowSleeves,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Dumbbell Lateral Raise",
    description: "Shoulder isolation exercise",
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.Shoulders,
    dominance: ExerciseDominance.LateralDeltoid,
    machine: ExerciseMachine.Dumbbell,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Hammer Curl",
    description: "Bicep exercise with neutral grip",
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.Biceps,
    dominance: ExerciseDominance.Brachioradialis,
    machine: ExerciseMachine.Dumbbell,
    equipment: ExerciseEquipment.WristSleeves,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },

  // Cable Exercises
  {
    name: "Cable Crossover",
    description: "Chest isolation using cable machine",
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Chest,
    dominance: ExerciseDominance.MiddleChest,
    machine: ExerciseMachine.Cable,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.DHandle,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Lat Pulldown",
    description: "Back exercise using cable machine",
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Back,
    dominance: ExerciseDominance.BicepsLongHead,
    machine: ExerciseMachine.Cable,
    equipment: ExerciseEquipment.Straps,
    handle: ExerciseHandle.LongStraightBar,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Cable Face Pull",
    description: "Posterior deltoid exercise",
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Shoulders,
    dominance: ExerciseDominance.PosteriorDeltoid,
    machine: ExerciseMachine.Cable,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.DoubleRope,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Cable Tricep Extension",
    description: "Tricep isolation using cable",
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Triceps,
    dominance: ExerciseDominance.TricepsLongHead,
    machine: ExerciseMachine.Cable,
    equipment: ExerciseEquipment.ElbowSleeves,
    handle: ExerciseHandle.ShortStraightBar,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Cable Crunch",
    description: "Abdominal exercise using cable",
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Core,
    dominance: ExerciseDominance.Quadriceps,
    machine: ExerciseMachine.Cable,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.SingleRope,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },

  // Machine Exercises
  {
    name: "Leg Press",
    description: "Compound leg exercise on machine",
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Legs,
    dominance: ExerciseDominance.Quadriceps,
    machine: ExerciseMachine.Machine,
    equipment: ExerciseEquipment.KneeSleeves,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Chest Press Machine",
    description: "Seated chest press on machine",
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Chest,
    dominance: ExerciseDominance.MiddleChest,
    machine: ExerciseMachine.Machine,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Seated Row Machine",
    description: "Back exercise on seated row machine",
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Back,
    dominance: ExerciseDominance.BicepsLongHead,
    machine: ExerciseMachine.Machine,
    equipment: ExerciseEquipment.Straps,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Leg Curl Machine",
    description: "Hamstring isolation on machine",
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Hamstrings,
    dominance: ExerciseDominance.Glutes,
    machine: ExerciseMachine.Machine,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Calf Press Machine",
    description: "Calf exercise on leg press machine",
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Calves,
    dominance: ExerciseDominance.Quadriceps,
    machine: ExerciseMachine.Machine,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },

  // Specialty Bar Exercises
  {
    name: "Trap Bar Deadlift",
    description: "Deadlift variation using trap bar",
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.FullBody,
    dominance: ExerciseDominance.Quadriceps,
    machine: ExerciseMachine.TrapBar,
    equipment: ExerciseEquipment.Straps,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "EZ Bar Curl",
    description: "Bicep curl with EZ bar",
    type: ExerciseType.FreeWeight,
    muscleGroup: ExerciseMuscleGroup.Biceps,
    dominance: ExerciseDominance.BicepsLongHead,
    machine: ExerciseMachine.Barbell,
    equipment: ExerciseEquipment.ElbowSleeves,
    handle: ExerciseHandle.EzBar,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },

  // Smith Machine Exercises
  {
    name: "Smith Machine Squat",
    description: "Squat performed on Smith machine",
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Legs,
    dominance: ExerciseDominance.Quadriceps,
    machine: ExerciseMachine.SmithMachine,
    equipment: ExerciseEquipment.KneeSleeves,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Smith Machine Bench Press",
    description: "Bench press on Smith machine",
    type: ExerciseType.Machine,
    muscleGroup: ExerciseMuscleGroup.Chest,
    dominance: ExerciseDominance.MiddleChest,
    machine: ExerciseMachine.SmithMachine,
    equipment: ExerciseEquipment.WristSleeves,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },

  // Core Exercises
  {
    name: "Plank",
    description: "Isometric core exercise",
    type: ExerciseType.Bodyweight,
    muscleGroup: ExerciseMuscleGroup.Core,
    dominance: ExerciseDominance.Quadriceps,
    machine: ExerciseMachine.Bodyweight,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Russian Twist",
    description: "Rotational core exercise",
    type: ExerciseType.Bodyweight,
    muscleGroup: ExerciseMuscleGroup.Core,
    dominance: ExerciseDominance.Quadriceps,
    machine: ExerciseMachine.Bodyweight,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },

  // Cardio Exercises
  {
    name: "Treadmill Running",
    description: "Cardiovascular exercise on treadmill",
    type: ExerciseType.Cardio,
    muscleGroup: ExerciseMuscleGroup.FullBody,
    dominance: ExerciseDominance.Quadriceps,
    machine: ExerciseMachine.Machine,
    equipment: ExerciseEquipment.Belt,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  },
  {
    name: "Rowing Machine",
    description: "Full body cardio exercise",
    type: ExerciseType.Cardio,
    muscleGroup: ExerciseMuscleGroup.FullBody,
    dominance: ExerciseDominance.BicepsLongHead,
    machine: ExerciseMachine.Machine,
    equipment: ExerciseEquipment.Straps,
    handle: ExerciseHandle.Other,
    tier: ExerciseTier.A,
    style: ExerciseStyle.Compound
  }
]

export const seedExercises = async () => {
  await AppDataSource.getRepository(Exercise).deleteAll();
  await AppDataSource.getRepository(Exercise).save(exercises);
  console.log("✅ Database seeded with exercises");
}
