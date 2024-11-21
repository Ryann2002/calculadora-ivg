// components/calculator/germination-table.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ExperimentData } from "@/types";

interface GerminationTableProps {
  experimentData: ExperimentData;
  onSubmit: (data: Record<number, number[]>) => void;
  onReturn: () => void;
}

export function GerminationTable({
  experimentData,
  onSubmit,
  onReturn,
}: GerminationTableProps) {
  const [progress, setProgress] = useState(0);

  const { repetitions, culture } = experimentData;
  const totalDays = culture.days;
  const totalSeeds = culture.totalSeeds;

  const [currentDay, setCurrentDay] = useState(1);
  const [data, setData] = useState<Record<number, (number | undefined)[]>>(
    () => {
      // Initialize data with empty arrays for each day
      return Array.from({ length: totalDays }, (_, i) => i + 1).reduce(
        (acc, day) => ({
          ...acc,
          [day]: Array(repetitions).fill(undefined),
        }),
        {}
      );
    }
  );

  const isDayComplete = () => {
    return data[currentDay]?.every((value) => value !== undefined);
  };

  useEffect(() => {
    const totalFields = totalDays * repetitions;
    const filledFields = Object.values(data)
      .flat()
      .filter((v) => v !== undefined).length;
    const newProgress = (filledFields / totalFields) * 100;
    setProgress(newProgress);
  }, [data, repetitions, totalDays]);

  const handleInputChange = (repetition: number, value: string) => {
    console.log("value", value);
    
    if (value === "") {
      setData((prev) => ({
        ...prev,
        [currentDay]: prev[currentDay].map((val, idx) =>
          idx === repetition ? undefined : val
        ),
      }));
    }else {
      const numValue = parseInt(value) || 0;
      if (numValue >= 0 && numValue <= totalSeeds) {
        setData((prev) => ({
          ...prev,
          [currentDay]: prev[currentDay].map((val, idx) =>
            idx === repetition ? numValue : val
          ),
        }));
      }
    }

  };

  const handleNext = () => {
    if (currentDay < totalDays) {
      setCurrentDay((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Progress Header */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Progresso Geral
            </span>
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
            onClick={handleNext}
            disabled={!isDayComplete()}
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
              {Array.from({ length: repetitions }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium w-24">
                      Repetição {index + 1}
                    </label>
                    <div className="flex-1 relative">
                      <Input
                        type="number"
                        value={data[currentDay]?.[index] ?? ""}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        className="w-full pr-12"
                        placeholder="0"
                        min="0"
                        max={totalSeeds}
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
                  (data[currentDay].filter((v) => v !== undefined && v > 0)
                    .length /
                    repetitions) *
                  100
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
      <div className="flex gap-4">
        <Button variant="outline" className="flex-1" onClick={() => onReturn()}>
          Voltar
        </Button>
        <Button
          className="flex-1 group"
          onClick={() => onSubmit(
            Object.fromEntries(
              Object.entries(data).map(([day, values]) => [
                day,
                values.map((v) => v ?? 0),
              ])
            )
          )}
          disabled={!(currentDay === totalDays && isDayComplete())}
        >
          Continuar
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </>
  );
}
