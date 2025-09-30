import { useState } from "react";
import { UserTypeSelector } from "@/components/UserTypeSelector";
import { ChatMessage } from "@/components/ChatMessage";
import { ChallengeSelector } from "@/components/ChallengeSelector";
import { QuizComponent } from "@/components/QuizComponent";
import { ActionPlanInput } from "@/components/ActionPlanInput";
import { CRRReport } from "@/components/CRRReport";

type ConversationStep = 'userSelect' | 'challenge' | 'quiz' | 'action' | 'crr';

const Index = () => {
  const [step, setStep] = useState<ConversationStep>('userSelect');
  const [userType, setUserType] = useState<'student' | 'teacher' | 'parent' | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<string>('');
  const [actionPlan, setActionPlan] = useState<string>('');
  const [messages, setMessages] = useState<Array<{content: string, isBot: boolean, type?: string}>>([]);

  const handleUserTypeSelect = (type: 'student' | 'teacher' | 'parent') => {
    setUserType(type);
    setMessages([
      {
        content: "👋 Hello! Welcome to the Rethinking SDG 4 Chatbot.\nI'm here to explore how we can build a safe, inclusive, personalized, and lifelong learning system for you.\n\n✨ My personal belief is that education should not just be about exams and certification, but about lifelong growth — so that you can measure how much you have learned and how you can continually increase and develop it, including how you can dualize your targets in impact and entrepreneurship.\n\n🌱 Great!\nWhat is the biggest challenge you face in your learning journey?\n\n💭 Remember, no challenge means you are failing — challenges are simply signs of where learning is still in progress.",
        isBot: true
      }
    ]);
    setStep('challenge');
  };

  const handleChallengeSelect = (challenge: string) => {
    setSelectedChallenge(challenge);
    setMessages(prev => [...prev, 
      { content: `I selected: ${challenge}`, isBot: false },
    ]);
    setTimeout(() => {
      setStep('quiz');
    }, 1000);
  };

  const handleQuizAnswer = (isCorrect: boolean) => {
    const response = isCorrect 
      ? "✅ Correct! SDG 4 is about education, while healthcare belongs to SDG 3.\n\n💡 My mindset: Education is not only about schools, but about systems that connect safety, mentorship, and lifelong growth."
      : "That's not quite right, but learning is a process! SDG 4 focuses on quality education. Let's continue exploring how education connects to safety, mentorship, and lifelong growth.";
    
    setMessages(prev => [...prev, { content: response, isBot: true }]);
    setTimeout(() => {
      setStep('action');
    }, 2000);
  };

  const handleActionPlanSubmit = (action: string) => {
    setActionPlan(action);
    setMessages(prev => [...prev, { content: action, isBot: false }]);
    setTimeout(() => {
      setStep('crr');
    }, 1000);
  };

  if (step === 'userSelect') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto py-8">
          <UserTypeSelector onSelectType={handleUserTypeSelect} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <div className="space-y-4">
          {/* Chat Messages */}
          {messages.map((message, index) => (
            <ChatMessage 
              key={index} 
              message={message.content} 
              isBot={message.isBot}
              type={message.type as any}
            />
          ))}
          
          {/* Interactive Components */}
          {step === 'challenge' && userType && (
            <ChallengeSelector 
              userType={userType} 
              onSelectChallenge={handleChallengeSelect} 
            />
          )}
          
          {step === 'quiz' && (
            <QuizComponent
              question="SDG 4 is about education. Which of these is NOT part of SDG 4?"
              options={[
                "A) Safe schools",
                "B) Quality teachers", 
                "C) Affordable healthcare",
                "D) Lifelong learning"
              ]}
              correctAnswer={2}
              onAnswer={handleQuizAnswer}
            />
          )}
          
          {step === 'action' && (
            <ActionPlanInput onSubmit={handleActionPlanSubmit} />
          )}
          
          {step === 'crr' && userType && (
            <CRRReport 
              userType={userType}
              challenge={selectedChallenge}
              actionPlan={actionPlan}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
