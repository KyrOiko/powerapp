import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ModelTemplateExercise } from "./template-exercise";

@Entity("workout_templates")
export class ModelWorkoutTemplate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text") name!: string;
  @Column("text") description!: string;

  @OneToMany(() => ModelTemplateExercise, (te) => te.template, { cascade: true })
  exercises!: ModelTemplateExercise[];
}
