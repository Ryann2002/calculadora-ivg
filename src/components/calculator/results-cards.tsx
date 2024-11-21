"use client";

import { Button } from "@/components/ui/button";
import { BarChart, Percent, RotateCcw, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import { ExperimentData } from "@/types";
import { CULTURAS } from "@/constants/constants";

interface ResultsProps {
  experimentData: ExperimentData;
  onReset: () => void;
}

export function Results({ experimentData, onReset }: ResultsProps) {
  const { culture, repetitions, germinationData } = experimentData;

  const totalDays = culture.days;
  const totalSeeds = culture.totalSeeds;
  const data = germinationData;
  const cultura = culture.name;

  // Calculate IVG
  const calculateIVG = () => {
    let ivg = 0;
    for (let day = 1; day <= totalDays; day++) {
      const dayData = data[day] || [];
      // Get the sum of germinated seeds for this day across all repetitions
      const daySum = dayData.reduce((acc, val) => acc + val, 0);
      // Divide by the day number and add to total IVG
      ivg += daySum / day;
    }
    // Get average IVG across repetitions
    return (ivg / repetitions).toFixed(2);
  };

  // Calculate Germination Rate
  const calculateGerminationRate = () => {
    // Get the last day's data (total viable seedlings)
    const lastDayData = data[totalDays] || [];
    const totalGerminatedSeeds = lastDayData.reduce((acc, val) => acc + val, 0);

    // Total possible seeds (seeds per repetition * number of repetitions)
    const totalPossibleSeeds = totalSeeds * repetitions;

    // Calculate percentage
    return ((totalGerminatedSeeds / totalPossibleSeeds) * 100).toFixed(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Culture Info */}
      <div className="bg-muted/50 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Sprout className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="font-medium">
              {CULTURAS[cultura].name}
              {CULTURAS[cultura].scientific_name && (
                <span className="text-sm text-muted-foreground ml-1">
                  ({CULTURAS[cultura].scientific_name})
                </span>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              Temperatura ideal: 25°C
            </div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {totalDays} dias de avaliação
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            Sementes por Repetição
          </div>
          <div className="text-2xl font-bold text-primary">{totalSeeds}</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Dias</div>
          <div className="text-2xl font-bold">{totalDays}</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Repetições</div>
          <div className="text-2xl font-bold">{repetitions}</div>
        </div>
      </div>

      {/* Results Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-primary/5 backdrop-blur-sm rounded-2xl p-4 border border-primary/10">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">IVG</div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <BarChart className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="text-3xl font-bold">{calculateIVG()}</div>
          <div className="text-xs text-muted-foreground mt-2">
            Índice de Velocidade de Germinação
          </div>
        </div>

        <div className="bg-primary/5 backdrop-blur-sm rounded-2xl p-4 border border-primary/10">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">Germinação</div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Percent className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="text-3xl font-bold">
            {calculateGerminationRate()}%
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Taxa de Germinação
          </div>
        </div>
      </div>

      {/* Day by Day Data */}
      <div className="space-y-4">
        <div className="text-sm font-medium">Dados por Dia</div>
        <div className="space-y-4">
          {Object.entries(data).map(([day, values]) => {
            // Calculate percentage for this day
            const dayTotal = values.reduce((acc, val) => acc + val, 0);
            const dayPercentage = (
              (dayTotal / (totalSeeds * repetitions)) *
              100
            ).toFixed(1);

            return (
              <div key={day} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Dia {day}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{dayTotal} sementes</span>
                    <span className="text-sm text-muted-foreground">
                      ({dayPercentage}%)
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{
                      width: `${dayPercentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset Button */}
      <Button variant="outline" onClick={onReset} className="w-full group">
        <RotateCcw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
        Calcular Novamente
      </Button>
    </motion.div>
  );
}
