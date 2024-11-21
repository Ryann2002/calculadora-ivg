export type Cultura = {
  name: string;
  scientific_name?: string;
  days: number;
};

export type Culturas = {
  [key: string]: Cultura;
};

export interface CulturaWithTotalSeeds extends Cultura {
  totalSeeds: number;
}

export interface ExperimentData {
  culture: CulturaWithTotalSeeds;
  repetitions: number;
  germinationData: Record<number, number[]>;
}
