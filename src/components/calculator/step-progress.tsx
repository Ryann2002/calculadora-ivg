interface StepProgressProps {
    currentStep: number;
  }
  
  export function StepProgress({ currentStep }: StepProgressProps) {
    const steps = [
      { number: 1, label: "Cultura" },
      { number: 2, label: "Repetições" },
      { number: 3, label: "Dados" },
      { number: 4, label: "Resultado" },
    ];
  
    return (
      <div className="text-center">
        <div className="text-sm font-medium mb-1">
          Passo {currentStep} de 4
        </div>
        <div className="flex gap-1">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`
                h-1 flex-1 rounded-full transition-all duration-300
                ${currentStep >= step.number ? 'bg-primary' : 'bg-muted'}
              `}
            />
          ))}
        </div>
      </div>
    );
  }