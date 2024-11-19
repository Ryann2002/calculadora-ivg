import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface StepCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    children: React.ReactNode;
  }
  
  export function StepCard({ icon, title, description, children }: StepCardProps) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden">
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                {icon}
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  {title}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
              </div>
            </div>
            <div className="space-y-6">
              {children}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }
  