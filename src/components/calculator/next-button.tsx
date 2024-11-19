import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NextButtonProps {
  onNext: () => void;
  disabled?: boolean;
}

export function NextButton({ onNext, disabled }: NextButtonProps) {
  return (
    <Button
      className="w-full group relative overflow-hidden"
      size="lg"
      onClick={onNext}
      disabled={disabled}
    >
      <span className="relative z-10">Continuar</span>
      <div className="absolute inset-0 translate-x-[100%] group-hover:translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000" />
      <ArrowRight className="relative z-10 ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Button>
  );
}
