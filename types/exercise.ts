import {
  ExerciseDominance,
  ExerciseEquipment,
  ExerciseHandle,
  ExerciseMachine,
  ExerciseMuscleGroup,
  ExerciseStyle,
  ExerciseTier,
  ExerciseType
} from "@/models/enums"

export default interface ExerciseData {
    id: number
    name: string
    description: string
    type: ExerciseType
    muscleGroup: ExerciseMuscleGroup
    dominance: ExerciseDominance
    machine: ExerciseMachine
    equipment: ExerciseEquipment
    handle: ExerciseHandle
    tier: ExerciseTier
    style: ExerciseStyle
}
