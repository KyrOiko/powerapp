import { DataSource, Repository } from 'typeorm';

import Template from '@/domain/template';
import CreateWorkoutTemplate from '@/models/dto/create_workout_template';
import { ModelWorkoutTemplate } from '@/models/template';
import { BaseMapper } from '@/utils/base_mapper';

export default class TemplateService {
  private localDb: DataSource;
  private mapper: BaseMapper<ModelWorkoutTemplate, Template>;
  private createMapper: BaseMapper<CreateWorkoutTemplate, Object>;
  private localRepository: Repository<ModelWorkoutTemplate>;

  constructor(
    localDb: DataSource,
    mapper: BaseMapper<ModelWorkoutTemplate, Template>,
    createMapper: BaseMapper<CreateWorkoutTemplate, Object>
  ) {
    this.localDb = localDb;
    this.mapper = mapper;
    this.createMapper = createMapper;
    this.localRepository = this.localDb.getRepository(ModelWorkoutTemplate);
  }

  async getMany(): Promise<Template[]> {
    try {
      console.log('getting templates');
      const templates = await this.localRepository.find({
        relations: ['exercises', 'exercises.exercise', 'exercises.sets'],
      });

      console.log('templates');
      console.log(templates);

      return templates.map(template => this.mapper.map(template));
    } catch (error) {
      console.log('error', error);
      console.error(error);
      throw error;
    }
  }

  async getById(id: number): Promise<Template> {
    const template = await this.localRepository.findOne({
      where: { id },
      relations: ['exercises', 'exercises.exercise', 'exercises.sets'],
    });
    if (!template) {
      throw new Error('Template not found');
    }
    return this.mapper.map(template);
  }

  async create(template: CreateWorkoutTemplate): Promise<Template> {
    try {
      // Create the template entity with all its relationships
      // TypeORM will handle the cascading inserts automatically
      const templateEntity = this.localRepository.create({
        name: template.name,
        description: template.description,
        exercises: template.exercises.map(exerciseTemplate => ({
          exercise: exerciseTemplate.exercise,
          sets: exerciseTemplate.sets.map(setTemplate => ({
            number: setTemplate.number,
            expectedRIR: setTemplate.expectedRIR,
            rest: setTemplate.rest,
            repRange: {
              lower: setTemplate.repRange.lower,
              upper: setTemplate.repRange.upper,
            },
            guides: setTemplate.guides,
          })),
        })),
      });

      // Save the complete template with all relationships
      const savedTemplate = await this.localRepository.save(templateEntity);

      // Fetch the complete saved template with all relations
      const completeTemplate = await this.localRepository.findOne({
        where: { id: savedTemplate.id },
        relations: ['exercises', 'exercises.exercise', 'exercises.sets'],
      });

      if (!completeTemplate) {
        throw new Error('Failed to retrieve saved template');
      }

      return this.mapper.map(completeTemplate);
    } catch (error) {
      console.error('Error creating template:', error);
      throw error;
    }
  }
}
