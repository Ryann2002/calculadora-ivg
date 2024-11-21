import { Culturas } from "@/types";

export const CULTURAS: Culturas = {
  soja: {
    name: "Soja",
    scientific_name: "Glycine max",
    days: 8,
  },
  alface: {
    name: "Alface", 
    scientific_name: "Lactuca sativa",
    days: 7,
  },
  brocolis: {
    name: "Brócolis",
    scientific_name: "Brassica oleracea var. italica",
    days: 10,
  },
  feijao: {
    name: "Feijão",
    scientific_name: "Phaseolus vulgaris",
    days: 9,
  },
  arroz: {
    name: "Arroz",
    scientific_name: "Oryza sativa",
    days: 14,
  },
  trigo: {
    name: "Trigo",
    scientific_name: "Triticum aestivum",
    days: 8,
  },
  milho: {
    name: "Milho",
    scientific_name: "Zea mays",
    days: 7,
  },
  cenoura: {
    name: "Cenoura",
    scientific_name: "Daucus carota",
    days: 14,
  },
  batata: {
    name: "Batata",
    scientific_name: "Solanum tuberosum",
    days: 14,
  },
  cebola: {
    name: "Cebola",
    scientific_name: "Allium cepa",
    days: 12,
  }
} as const;