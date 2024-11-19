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
import { Cultura } from "./calculator";


interface CultureSelectProps {
  initialData: Cultura;
  onSubmit: (data: Cultura) => void;
}

export function CultureSelect({ onSubmit, initialData }: CultureSelectProps) {
  const [selectedCulture, setSelectedCulture] = React.useState(initialData.name);
  const [seeds, setSeeds] = React.useState(initialData.totalSeeds.toString());

  const culturas = {
    soja: { name: "Soja (Glycine max)", days: 2 },
    milho: { name: "Milho (Zea mays)", days: 7 },
    feijao: { name: "Feijão (Phaseolus vulgaris)", days: 9 },
    arroz: { name: "Arroz (Oryza sativa)", days: 14 },
    trigo: { name: "Trigo (Triticum aestivum)", days: 8 },
  };

  const handleSubmit = () => {
    if (selectedCulture && seeds) {
      onSubmit({
        name: selectedCulture,
        days: culturas[selectedCulture as keyof typeof culturas].days,
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
                {Object.entries(culturas).map(([key, { name }]) => (
                  <SelectItem key={key} value={key}>
                    {name}
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
                    {culturas[selectedCulture as keyof typeof culturas].days}{" "}
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
