// components/calculator/calculator.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { StepProgress } from "./step-progress";
import { CultureSelect } from "./culture-select";
import { RepetitionsInput } from "./repetitions-input";
import { GerminationTable } from "./germination-table";
import {
  Sprout,
  FlaskConical,
  Table,
  BarChart,
} from "lucide-react";
import { Results } from "./results-cards";

export interface Cultura {
  name: string;
  days: number;
  totalSeeds: number;
}
export interface ExperimentData {
  culture: Cultura;
  repetitions: number;
  germinationData: Record<number, number[]>;
}

export function Calculator() {
  const [step, setStep] = useState(1);
  const [experimentData, setExperimentData] = useState<ExperimentData>({
    culture: { name: "", days: 0, totalSeeds: 0 },
    repetitions: 4,
    germinationData: {},
  });

  const updateExperimentData = (data: Partial<ExperimentData>) => {
    setExperimentData((prev) => ({ ...prev, ...data }));
  };

  const StepContainer = ({
    children,
    icon,
    title,
    description,
  }: {
    children: React.ReactNode;
    icon: React.ReactNode;
    title: string;
    description: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          {icon}
        </div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed w-full bg-background/80 backdrop-blur-md border-b z-50">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-center">
            <StepProgress currentStep={step} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <StepContainer
                icon={<Sprout className="w-6 h-6 text-primary" />}
                title="Selecione a Cultura"
                description="Escolha a cultura que você está analisando"
              >
                <CultureSelect
                  onSubmit={(data) => {
                    updateExperimentData({ culture: data });
                    setStep(2);
                  }}
                  initialData={experimentData.culture}
                />
              </StepContainer>
            )}

            {step === 2 && (
              <StepContainer
                icon={<FlaskConical className="w-6 h-6 text-primary" />}
                title="Repetições"
                description="Quantas repetições você usou?"
              >
                <RepetitionsInput
                  value={experimentData.repetitions}
                  onReturn={() => setStep(1)}
                  onSubmit={(data) => {
                    updateExperimentData({ repetitions: data });
                    setStep(3);
                  }}
                />
              </StepContainer>
            )}

            {step === 3 && (
              <StepContainer
                icon={<Table className="w-6 h-6 text-primary" />}
                title="Dados de Germinação"
                description="Insira os dados de cada repetição"
              >
                <GerminationTable
                  experimentData={experimentData}
                  onReturn={() => setStep(2)}
                  onSubmit={(data) => {
                    updateExperimentData({ germinationData: data });
                    setStep(4);
                  }}
                />
              </StepContainer>
            )}

            {step === 4 && (
              <StepContainer
                icon={<BarChart className="w-6 h-6 text-primary" />}
                title="Resultados"
                description="Análise completa dos dados"
              >
                <Card className="p-8">
                  <Results
                    experimentData={experimentData}
                    onReset={() => {
                      setStep(1);
                      setExperimentData({
                        culture: { name: "", days: 0, totalSeeds: 0 },
                        repetitions: 4,
                        germinationData: {},
                      });
                    }}
                  />
                </Card>
              </StepContainer>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
