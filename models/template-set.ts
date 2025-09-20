import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ModelTemplateExercise } from "./template-exercise";

@Entity("template_sets")
export class ModelTemplateSet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("int") number!: number;
  @Column("int") expectedRIR!: number;
  @Column("int") rest!: number;
  @Column("json") repRange!: { lower: number; upper: number };
  @Column("text") guides!: string;

  @ManyToOne(() => ModelTemplateExercise, (te) => te.sets, { onDelete: "CASCADE" })
  templateExercise!: ModelTemplateExercise;
}
