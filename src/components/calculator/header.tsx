import { ArrowLeft, Sprout } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b fixed w-full bg-background z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </Link>
            <div className="h-4 w-px bg-muted-foreground/20" />
            <div className="flex items-center space-x-2">
              <Sprout className="w-5 h-5" />
              <span className="font-medium">Calculadora IVG</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
