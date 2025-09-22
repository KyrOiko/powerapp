import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ModelExercise } from "./exercise";
import { ModelWorkoutTemplate } from "./template";
import { ModelTemplateSet } from "./template-set";

@Entity("template_exercises")
export class ModelTemplateExercise {
  @PrimaryGeneratedColumn()
  id!: number;
  exerciseId!: number;
  templateId!: number;

  @ManyToOne(() => ModelExercise, { eager: true })
  exercise!: ModelExercise;

  @ManyToOne(() => ModelWorkoutTemplate, (wt) => wt.exercises, { onDelete: "CASCADE" })
  template!: ModelWorkoutTemplate;

  @OneToMany(() => ModelTemplateSet, (ts) => ts.templateExercise, { cascade: true })
  sets!: ModelTemplateSet[];
}
