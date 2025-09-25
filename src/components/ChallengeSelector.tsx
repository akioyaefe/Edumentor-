import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ChallengeSelectorProps {
  userType: 'student' | 'teacher';
  onSelectChallenge: (challenge: string) => void;
}

export const ChallengeSelector = ({ userType, onSelectChallenge }: ChallengeSelectorProps) => {
  const challenges = userType === 'student' 
    ? [
        'Insecurity in learning environment',
        'Lack of qualified teachers',
        'Boring teaching methods',
        'Lack of mentorship',
        'Other challenges'
      ]
    : [
        'Large class sizes',
        'Lack of training and resources',
        'Insecurity in schools',
        'Bureaucratic barriers',
        'Other challenges'
      ];

  const title = userType === 'student' 
    ? "What is the biggest challenge you face in your learning journey?"
    : "What is the biggest barrier you face in supporting students effectively?";

  const subtitle = userType === 'student'
    ? "💭 Remember, no challenge means you are failing — challenges are simply signs of where learning is still 'in progress.'"
    : "🌍 My mindset: A teacher is not only an authority, but also a mentor and facilitator. Nigeria's future depends on mentors, not just instructors.";

  return (
    <Card className="p-6 bg-chat-bot text-white">
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">
            {userType === 'student' ? '🌱 Great!' : '📚 Excellent!'} 
          </h3>
          <p className="text-sm">{title}</p>
          <p className="text-xs opacity-80">{subtitle}</p>
        </div>
        
        <div className="space-y-2">
          {challenges.map((challenge, index) => (
            <Button
              key={index}
              onClick={() => onSelectChallenge(challenge)}
              variant="secondary"
              className="w-full text-left justify-start bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              {challenge}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};