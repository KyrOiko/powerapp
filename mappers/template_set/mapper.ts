import TemplateSetData from '@/domain/template_set';
import { ModelTemplateSet } from '@/models/template-set';
import { BaseMapper } from '@/utils/base_mapper';

export const templateSetMapper: BaseMapper<ModelTemplateSet, TemplateSetData> = {
  map(entity: ModelTemplateSet): TemplateSetData {
    return {
      id: entity.id,
      number: entity.number,
      expectedRIR: entity.expectedRIR,
      rest: entity.rest,
      repRange: entity.repRange,
      guides: entity.guides,
    };
  },
};
