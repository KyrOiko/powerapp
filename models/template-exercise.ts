import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exercise } from "./exercise";
import { TemplateSet } from "./template-set";
import { WorkoutTemplate } from "./workout-template";

@Entity("template_exercises")
export class TemplateExercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Exercise, { eager: true })
  exercise!: Exercise;

  @ManyToOne(() => WorkoutTemplate, (wt) => wt.exercises, { onDelete: "CASCADE" })
  template!: WorkoutTemplate;

  @OneToMany(() => TemplateSet, (ts) => ts.templateExercise, { cascade: true })
  sets!: TemplateSet[];
}
