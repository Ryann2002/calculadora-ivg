// components/calculator/repetitions-input.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import React from "react";

interface RepetitionsInputProps {
  value: number;
  onSubmit  : (value: number) => void;
  onReturn: () => void;
}

export function RepetitionsInput({ value, onSubmit, onReturn }: RepetitionsInputProps) {
  const [currentValue, setCurrentValue] = React.useState(value);
  const MIN_REPETICOES = 2;
  const MAX_REPETICOES = 6;

  const handleIncrement = () => {
    if (currentValue < MAX_REPETICOES) {
      setCurrentValue((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (currentValue > MIN_REPETICOES) {
      setCurrentValue((prev) => prev - 1);
    }
  };

  return (
    <>
      <Card className="p-6">
        <div className="space-y-6">
          {/* Number Input */}
          <div className="flex flex-col items-center gap-4">
            <div className="text-5xl font-bold text-primary">
              {currentValue || MIN_REPETICOES}
            </div>
            <div className="flex items-center gap-6">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecrement}
                disabled={currentValue <= MIN_REPETICOES}
                className="h-10 w-10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-base text-muted-foreground">
                repetições
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleIncrement}
                disabled={currentValue >= MAX_REPETICOES}
                className="h-10 w-10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Visual Representation */}
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: MAX_REPETICOES }).map((_, index) => (
              <div
                key={index}
                className={`
              aspect-square rounded-lg transition-all duration-200
              ${
                index < currentValue
                  ? "bg-primary/20 border-2 border-primary/30"
                  : "bg-muted border-2 border-transparent"
              }
            `}
              />
            ))}
          </div>

          {/* Helper Text */}
          {currentValue !== 4 && (
            <p className="text-sm text-muted-foreground text-center">
              Recomendamos 4 repetições para maior precisão
            </p>
          )}
        </div>
      </Card>
      <div className="flex gap-4">
        <Button variant="outline" className="flex-1" onClick={() => onReturn()}>
          Voltar
        </Button>
        <Button
          className="flex-1 group"
          onClick={() => onSubmit(currentValue)}
          disabled={currentValue < MIN_REPETICOES || currentValue > MAX_REPETICOES}
        >
          Continuar
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </>
  );
}
