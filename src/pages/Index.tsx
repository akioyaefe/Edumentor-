import { useState } from "react";
import { UserTypeSelector } from "@/components/UserTypeSelector";
import { ChatMessage } from "@/components/ChatMessage";
import { ChallengeSelector } from "@/components/ChallengeSelector";
import { QuizComponent } from "@/components/QuizComponent";
import { ActionPlanInput } from "@/components/ActionPlanInput";
import { CRRReport } from "@/components/CRRReport";
import { Button } from "@/components/ui/button";

type ConversationStep = 'userSelect' | 'challenge' | 'action' | 'crr';

const quizData: Record<string, { question: string; options: string[]; correctAnswer: number }> = {
  'Insecurity in Learning Environment': {
    question: 'What is one effective way to make learning environments safe for students?',
    options: [
      'A) Ignoring bullying and hoping it stops',
      'B) Establishing anti-bullying policies and providing secure school conditions',
      'C) Offering online/virtual learning options where students can learn safely from home',
      'D) Creating awareness programs where students are trained on safety and respect'
    ],
    correctAnswer: 2
  },
  'Lack of Qualified Teachers': {
    question: 'Why is it important for teachers to have updated knowledge, especially in STEM areas?',
    options: [
      'A) So they can pass exams easily',
      'B) To inspire students with relevant and modern skills',
      'C) To avoid giving homework',
      'D) To reduce the cost of teaching'
    ],
    correctAnswer: 1
  },
  'Boring Teaching Methods': {
    question: 'Which of these makes learning more engaging than traditional rote memorization?',
    options: [
      'A) Group projects and discussions',
      'B) Only repeating notes',
      'C) Punishment and strict silence',
      'D) Copying textbooks word-for-word'
    ],
    correctAnswer: 0
  },
  'Lack of Mentorship': {
    question: 'What is one key role of a mentor in learning?',
    options: [
      'A) To give constructive feedback and guidance',
      'B) To force students to memorize',
      'C) To replace parents',
      'D) To give out punishments'
    ],
    correctAnswer: 0
  },
  'Lack of Understanding of My Personal Needs, Interests, Learning Style & Language': {
    question: 'Why is it important for teachers to understand different learning styles and student interests?',
    options: [
      'A) So all students feel supported and can learn effectively',
      'B) So teachers don\'t have to work hard',
      'C) To make students all learn in the same way',
      'D) To reduce study hours'
    ],
    correctAnswer: 0
  },
  'Lack of Adequate Foundation and Understanding of Subject': {
    question: 'If a student misses the basics of a subject, what is the best step forward?',
    options: [
      'A) Ignore it and move on',
      'B) Go back to review the foundation with help',
      'C) Drop the subject completely',
      'D) Only cram for exams'
    ],
    correctAnswer: 1
  },
  'Other Challenges': {
    question: 'Why is it important for learners to express other challenges not listed?',
    options: [
      'A) Because every student\'s learning journey is unique',
      'B) To waste time',
      'C) To avoid responsibility',
      'D) To confuse teachers'
    ],
    correctAnswer: 0
  }
};

const Index = () => {
  const [step, setStep] = useState<ConversationStep>('userSelect');
  const [userType, setUserType] = useState<'student' | 'teacher' | 'parent' | null>(null);
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
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
    setCurrentChallenge(challenge);
    setShowQuiz(true);
    setMessages(prev => [...prev, 
      { content: `I selected: ${challenge}`, isBot: false },
    ]);
  };

  const handleQuizAnswer = (isCorrect: boolean) => {
    const response = isCorrect 
      ? "✅ Correct! Well done!"
      : "❌ That's not quite right, but great effort!";
    
    setMessages(prev => [...prev, { content: response, isBot: true }]);
  };

  const handleBackToChallenges = () => {
    setShowQuiz(false);
    setCurrentChallenge(null);
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
          {step === 'challenge' && userType && !showQuiz && (
            <ChallengeSelector 
              userType={userType} 
              onSelectChallenge={handleChallengeSelect} 
            />
          )}
          
          {step === 'challenge' && showQuiz && currentChallenge && (() => {
            const quiz = quizData[currentChallenge];
            
            return quiz ? (
              <div className="space-y-4">
                <QuizComponent
                  question={quiz.question}
                  options={quiz.options}
                  correctAnswer={quiz.correctAnswer}
                  onAnswer={handleQuizAnswer}
                />
                <Button 
                  onClick={handleBackToChallenges}
                  className="w-full"
                  variant="outline"
                >
                  ← Back to Challenges
                </Button>
              </div>
            ) : null;
          })()}
          
          {step === 'action' && (
            <ActionPlanInput onSubmit={handleActionPlanSubmit} />
          )}
          
          {step === 'crr' && userType && currentChallenge && (
            <CRRReport 
              userType={userType}
              challenge={currentChallenge}
              actionPlan={actionPlan}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
