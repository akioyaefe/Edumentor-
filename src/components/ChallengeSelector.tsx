import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ChallengeSelectorProps {
  userType: 'student' | 'teacher' | 'parent';
  onSelectChallenge: (challenge: string) => void;
}

export const ChallengeSelector = ({ userType, onSelectChallenge }: ChallengeSelectorProps) => {
  const challengesData = userType === 'student' 
    ? [
        { text: 'Insecurity in learning environment', subtitle: '(Safety concerns affecting my focus)', color: 'bg-red-500' },
        { text: 'Lack of qualified teachers', subtitle: '(Not getting proper guidance)', color: 'bg-orange-500' },
        { text: 'Boring teaching methods', subtitle: '(Classes feel unengaging)', color: 'bg-yellow-500' },
        { text: 'Lack of mentorship', subtitle: '(No one to guide my path)', color: 'bg-green-500' },
        { text: 'Other challenges', subtitle: '(Something else)', color: 'bg-blue-500' }
      ]
    : userType === 'teacher' 
    ? [
        { text: 'Large class sizes', subtitle: '(Too many students to help individually)', color: 'bg-purple-500' },
        { text: 'Lack of training and resources', subtitle: '(Need better tools and support)', color: 'bg-pink-500' },
        { text: 'Insecurity in schools', subtitle: '(Safety concerns for everyone)', color: 'bg-red-500' },
        { text: 'Bureaucratic barriers', subtitle: '(Too much admin work)', color: 'bg-indigo-500' },
        { text: 'Other challenges', subtitle: '(Something else)', color: 'bg-blue-500' }
      ]
    : [
        { text: 'Finding good schools', subtitle: '(Quality education options)', color: 'bg-teal-500' },
        { text: 'Affording education costs', subtitle: '(Financial challenges)', color: 'bg-amber-500' },
        { text: 'School safety concerns', subtitle: '(Worried about my child)', color: 'bg-red-500' },
        { text: 'Supporting learning at home', subtitle: '(How to help effectively)', color: 'bg-cyan-500' },
        { text: 'Other challenges', subtitle: '(Something else)', color: 'bg-blue-500' }
      ];

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {challengesData.map((challenge, index) => (
          <Card
            key={index}
            onClick={() => onSelectChallenge(challenge.text)}
            className={`${challenge.color} hover:opacity-90 transition-all cursor-pointer p-6 text-white hover:scale-105 shadow-lg`}
          >
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{challenge.text}</h3>
              <p className="text-sm opacity-90">{challenge.subtitle}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};