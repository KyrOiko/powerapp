import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ModelWorkoutTemplate } from "./template";
import { ModelWorkoutExercise } from "./workout-exercise";

@Entity("workouts")
export class ModelWorkout {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text") name!: string;
  @Column("text") description!: string;
  @Column("datetime") date!: string;


  @ManyToOne(() => ModelWorkoutTemplate, (wt) => wt.workouts, {onDelete:"CASCADE"} )
  template!: ModelWorkoutTemplate;

  @OneToMany(() => ModelWorkoutExercise, (we) => we.workout, { cascade: true })
  exercises!: ModelWorkoutExercise[];
}
