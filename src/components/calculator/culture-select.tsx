import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import React from "react";
import { Card } from "../ui/card";
import { ArrowRight } from "lucide-react";
import { Label } from "../ui/label";
import { CulturaWithTotalSeeds } from "@/types";
import { CULTURAS } from "@/constants/constants";

interface CultureSelectProps {
  initialData: CulturaWithTotalSeeds;
  onSubmit: (data: CulturaWithTotalSeeds) => void;
}

export function CultureSelect({ onSubmit, initialData }: CultureSelectProps) {
  const [selectedCulture, setSelectedCulture] = React.useState(
    initialData.name
  );
  const [seeds, setSeeds] = React.useState(initialData.totalSeeds.toString());

  const handleSubmit = () => {
    if (selectedCulture && seeds) {
      onSubmit({
        name: selectedCulture,
        days: CULTURAS[selectedCulture as keyof typeof CULTURAS].days,
        totalSeeds: parseInt(seeds),
      });
    }
  };

  return (
    <>
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Selecione a cultura que você está analisando
            </p>
            <Select value={selectedCulture} onValueChange={setSelectedCulture}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha a cultura" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CULTURAS).map(([key, cultura]) => (
                  <SelectItem key={key} value={key}>
                    {cultura.name}
                    {cultura.scientific_name && (
                      <span className="text-muted-foreground ml-1">
                        ({cultura.scientific_name})
                      </span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCulture && (
            <>
              <div className="space-y-2">
                <Label>Número Total de Sementes</Label>
                <Input
                  type="number"
                  placeholder="Ex: 100"
                  min="1"
                  value={seeds}
                  onChange={(e) => setSeeds(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Insira o número total de sementes utilizadas
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-sm space-y-2">
                  <p>
                    <strong>Temperatura Ideal:</strong> 25°C
                  </p>
                  <p>
                    <strong>Período de Avaliação:</strong>{" "}
                    {CULTURAS[selectedCulture as keyof typeof CULTURAS].days}{" "}
                    dias
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
      <Button
        className="w-full group"
        onClick={handleSubmit}
        disabled={!selectedCulture || !seeds}
      >
        Continuar
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </>
  );
}
