import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {
  ExerciseDominance,
  ExerciseEquipment,
  ExerciseHandle,
  ExerciseMachine,
  ExerciseMuscleGroup,
  ExerciseStyle,
  ExerciseTier,
  ExerciseType
} from "./enums";



@Entity("exercises")
export class Exercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text", {unique: true})
  name!: string;

  @Column("text")
  description!: string;

  @Column("text")
  type!: ExerciseType;

  @Column("text")
  muscleGroup!: ExerciseMuscleGroup;

  @Column("text")
  dominance!: ExerciseDominance;

  @Column("text")
  machine!: ExerciseMachine;

  @Column("text")
  equipment!: ExerciseEquipment;

  @Column("text")
  handle!: ExerciseHandle;

  @Column("text")
  tier!: ExerciseTier;

  @Column("text")
  style!: ExerciseStyle;
}
