import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Target } from "lucide-react";

interface ActionPlanInputProps {
  onSubmit: (action: string) => void;
}

export const ActionPlanInput = ({ onSubmit }: ActionPlanInputProps) => {
  const [action, setAction] = useState("");

  const handleSubmit = () => {
    if (action.trim()) {
      onSubmit(action.trim());
    }
  };

  return (
    <Card className="p-6 bg-education-secondary text-white">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Your Action Plan</h3>
        </div>
        
        <p className="text-sm opacity-90">
          💡 Share <strong>one action you can take this month</strong> to improve education in your community (big or small).
        </p>
        
        <div className="bg-white/10 p-3 rounded-lg">
          <p className="text-xs opacity-80">
            🌟 Example: Mentoring one junior student, starting a reading group, or helping a peer learn digital skills.
          </p>
        </div>
        
        <Textarea
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder="Describe your action plan here..."
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
        />
        
        <Button 
          onClick={handleSubmit} 
          disabled={!action.trim()}
          className="w-full bg-white text-education-secondary hover:bg-white/90"
        >
          Share My Action Plan
        </Button>
      </div>
    </Card>
  );
};