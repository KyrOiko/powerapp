import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TemplateExercise } from "./template-exercise";

@Entity("workout_templates")
export class WorkoutTemplate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text") name!: string;
  @Column("text") description!: string;

  @OneToMany(() => TemplateExercise, (te) => te.template, { cascade: true })
  exercises!: TemplateExercise[];
}
