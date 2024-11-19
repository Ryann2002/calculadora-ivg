// components/calculator/repetitions-input.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface RepetitionsInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function RepetitionsInput({ value, onChange }: RepetitionsInputProps) {
  const MIN_REPETICOES = 2;
  const MAX_REPETICOES = 6;

  const handleIncrement = () => {
    if (value < MAX_REPETICOES) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > MIN_REPETICOES) {
      onChange(value - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Number Input */}
      <div className="flex flex-col items-center gap-4">
        <div className="text-5xl font-bold text-primary">
          {value || MIN_REPETICOES}
        </div>
        <div className="flex items-center gap-6">
          <Button
            variant="outline"
            size="icon"
            onClick={handleDecrement}
            disabled={value <= MIN_REPETICOES}
            className="h-10 w-10"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-base text-muted-foreground">repetições</span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleIncrement}
            disabled={value >= MAX_REPETICOES}
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
              ${index < value 
                ? 'bg-primary/20 border-2 border-primary/30' 
                : 'bg-muted border-2 border-transparent'}
            `}
          />
        ))}
      </div>

      {/* Helper Text */}
      {value !== 4 && (
        <p className="text-sm text-muted-foreground text-center">
          Recomendamos 4 repetições para maior precisão
        </p>
      )}
    </div>
  );
}