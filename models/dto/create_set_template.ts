import { RIR } from '../enums';

interface CreateTemplateSetRepRange {
  lower: number;
  upper: number;
}

export interface CreateTemplateSet {
  number: number;
  expectedRIR: RIR;
  rest: number;
  repRange: CreateTemplateSetRepRange;
  guides: string;
}
