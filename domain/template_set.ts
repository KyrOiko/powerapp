import { RIR } from '@/models/enums';

interface SetRepRange {
  lower: number;
  upper: number;
}

export default interface TemplateSet {
  id: number;
  number: number;
  expectedRIR: RIR;
  rest: number;
  repRange: SetRepRange;
  guides: string;
}
