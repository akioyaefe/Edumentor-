import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizComponentProps {
  question: string;
  options: string[];
  correctAnswer: number;
  onAnswer: (isCorrect: boolean) => void;
}

export const QuizComponent = ({ question, options, correctAnswer, onAnswer }: QuizComponentProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      const isCorrect = selectedAnswer === correctAnswer;
      setShowResult(true);
      setTimeout(() => onAnswer(isCorrect), 2000);
    }
  };

  return (
    <Card className="p-6 bg-education-accent text-white">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">📝 Quick Quiz Time!</h3>
        <p className="text-sm opacity-90">{question}</p>
        
        <div className="space-y-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && setSelectedAnswer(index)}
              disabled={showResult}
              className={`w-full p-3 text-left rounded-lg border transition-colors ${
                showResult
                  ? index === correctAnswer
                    ? "bg-green-500 border-green-600"
                    : index === selectedAnswer && selectedAnswer !== correctAnswer
                    ? "bg-red-500 border-red-600"
                    : "bg-white/10 border-white/20"
                  : selectedAnswer === index
                  ? "bg-white/20 border-white/40"
                  : "bg-white/10 border-white/20 hover:bg-white/15"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && index === correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-green-200" />
                )}
                {showResult && index === selectedAnswer && selectedAnswer !== correctAnswer && (
                  <XCircle className="w-5 h-5 text-red-200" />
                )}
              </div>
            </button>
          ))}
        </div>
        
        {!showResult && (
          <Button 
            onClick={handleSubmit} 
            disabled={selectedAnswer === null}
            className="w-full bg-white text-education-accent hover:bg-white/90"
          >
            Submit Answer
          </Button>
        )}
        
        {showResult && (
          <div className="text-center">
            {selectedAnswer === correctAnswer ? (
              <p className="text-green-200">✅ Correct! Well done!</p>
            ) : (
              <p className="text-red-200">❌ That's not quite right, but great effort!</p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};