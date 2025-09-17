import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exercise } from "./exercise";
import { Workout } from "./workout";
import { WorkoutSet } from "./workout-set";

@Entity("workout_exercises")
export class WorkoutExercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Exercise, { eager: true })
  exercise!: Exercise;

  @ManyToOne(() => Workout, (w) => w.exercises, { onDelete: "CASCADE" })
  workout!: Workout;

  @OneToMany(() => WorkoutSet, (ws) => ws.workoutExercise, { cascade: true })
  sets!: WorkoutSet[];
}
