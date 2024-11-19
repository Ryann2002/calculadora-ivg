import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  interface CultureSelectProps {
    value: string;
    onChange: (value: string) => void;
  }
  
  export function CultureSelect({ value, onChange }: CultureSelectProps) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Selecione a cultura que você está analisando
          </p>
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Escolha a cultura" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="soja">Soja (Glycine max)</SelectItem>
              <SelectItem value="milho">Milho (Zea mays)</SelectItem>
              <SelectItem value="feijao">Feijão (Phaseolus vulgaris)</SelectItem>
              <SelectItem value="arroz">Arroz (Oryza sativa)</SelectItem>
              <SelectItem value="trigo">Trigo (Triticum aestivum)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {value && (
          <div className="rounded-lg bg-muted p-4">
            <div className="text-sm space-y-2">
              <p><strong>Temperatura Ideal:</strong> 25°C</p>
              <p><strong>Período de Avaliação:</strong> 8 dias</p>
            </div>
          </div>
        )}
      </div>
    );
  }
  