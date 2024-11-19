"use client";

import { Button } from "@/components/ui/button";
import { BarChart, Percent, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

interface ResultsProps {
  data: Record<number, number[]>;
  totalDays: number;
  onReset: () => void;
}

export function Results({ data, totalDays, onReset }: ResultsProps) {
  // Calculate IVG
  const calculateIVG = () => {
    let ivg = 0;
    for (let day = 1; day <= totalDays; day++) {
      const dayData = data[day] || [];
      const daySum = dayData.reduce((acc, val) => acc + val, 0);
      ivg += daySum / day;
    }
    return (ivg / Object.values(data)[0]?.length || 1).toFixed(2);
  };

  // Calculate Germination Rate
  const calculateGerminationRate = () => {
    const firstDay = data[1] || [];
    const totalSeeds = firstDay.reduce((acc, val) => acc + val, 0);
    const germinatedSeeds = Object.values(data)
      .flat()
      .reduce((acc, val) => acc + val, 0);
    return ((germinatedSeeds / (totalSeeds * totalDays)) * 100).toFixed(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Total Sementes</div>
          <div className="text-2xl font-bold text-primary">
            {data[1]?.reduce((acc, val) => acc + val, 0) || 0}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Dias</div>
          <div className="text-2xl font-bold">{totalDays}</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Repetições</div>
          <div className="text-2xl font-bold">
            {Object.values(data)[0]?.length || 0}
          </div>
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
          <div className="text-3xl font-bold">{calculateGerminationRate()}%</div>
          <div className="text-xs text-muted-foreground mt-2">
            Taxa de Germinação
          </div>
        </div>
      </div>

      {/* Day by Day Data */}
      <div className="space-y-4">
        <div className="text-sm font-medium">Dados por Dia</div>
        <div className="space-y-4">
          {Object.entries(data).map(([day, values]) => (
            <div key={day} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Dia {day}</span>
                <span className="font-medium">
                  {values.reduce((acc, val) => acc + val, 0)} sementes
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    width: `${(values.reduce((acc, val) => acc + val, 0) / 
                      (data[1]?.reduce((acc, val) => acc + val, 0) || 1)) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        onClick={onReset}
        className="w-full group"
      >
        <RotateCcw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
        Calcular Novamente
      </Button>
    </motion.div>
  );
}