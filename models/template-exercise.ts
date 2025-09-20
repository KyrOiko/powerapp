import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ModelExercise } from "./exercise";
import { ModelTemplateSet } from "./template-set";
import { ModelWorkoutTemplate } from "./template";

@Entity("template_exercises")
export class ModelTemplateExercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ModelExercise, { eager: true })
  exercise!: ModelExercise;

  @ManyToOne(() => ModelWorkoutTemplate, (wt) => wt.exercises, { onDelete: "CASCADE" })
  template!: ModelWorkoutTemplate;

  @OneToMany(() => ModelTemplateSet, (ts) => ts.templateExercise, { cascade: true })
  sets!: ModelTemplateSet[];
}
