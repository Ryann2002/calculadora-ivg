// components/calculator/germination-table.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GerminationTableProps {
  repeticoes: number;
  onComplete: (data: Record<number, number[]>) => void;
}

export function GerminationTable({
  repeticoes,
  onComplete,
}: GerminationTableProps) {
  const [currentDay, setCurrentDay] = useState(1);
  const [totalDays] = useState(7);
  const [data, setData] = useState<Record<number, number[]>>(() => {
    // Initialize data structure for all days and repetitions
    const initialData: Record<number, number[]> = {};
    for (let day = 1; day <= totalDays; day++) {
      initialData[day] = Array(repeticoes).fill(0);
    }
    return initialData;
  });
  const [progress, setProgress] = useState(0);

  // Verify if current day is complete
  const isDayComplete = () => {
    return data[currentDay]?.every((value) => value > 0);
  };

  // Calculate overall progress
  useEffect(() => {
    const totalFields = totalDays * repeticoes;
    const filledFields = Object.values(data)
      .flat()
      .filter((v) => v > 0).length;
    const newProgress = (filledFields / totalFields) * 100;
    setProgress(newProgress);

    if (newProgress === 100) {
      onComplete(data);
    }
  }, [data, repeticoes, totalDays, onComplete]);

  // Update data for a repetition
  const handleInputChange = (repetition: number, value: string) => {
    const numValue = parseInt(value) || 0;
    setData((prev) => ({
      ...prev,
      [currentDay]: prev[currentDay].map((val, idx) =>
        idx === repetition ? numValue : val
      ),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Progresso Geral</span>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} />
      </div>

      {/* Day Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentDay((prev) => prev - 1)}
          disabled={currentDay === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>
        <span className="font-medium">Dia {currentDay}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentDay((prev) => prev + 1)}
          disabled={!isDayComplete() || currentDay === totalDays}
        >
          Próximo
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Input Fields */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDay}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-4"
        >
          <div className="bg-muted/50 rounded-lg p-4 space-y-4">
            {data[currentDay].map((value, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium w-24">
                    Repetição {index + 1}
                  </label>
                  <div className="flex-1 relative">
                    <Input
                      type="number"
                      value={value || ""}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="w-full pr-12"
                      placeholder="0"
                      min="0"
                      max="100"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      sementes
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Day Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Progresso do Dia {currentDay}
              </span>
              <span className="text-sm font-medium">
                {isDayComplete() ? "100%" : "0%"}
              </span>
            </div>
            <Progress 
              value={
                (data[currentDay].filter(v => v > 0).length / repeticoes) * 100
              } 
              className="h-1" 
            />
          </div>

          {/* Helper Text */}
          <p className="text-sm text-muted-foreground text-center">
            {isDayComplete()
              ? currentDay === totalDays
                ? "Todos os dados foram preenchidos!"
                : "Clique em 'Próximo' para continuar"
              : "Preencha os dados de todas as repetições para continuar"}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}