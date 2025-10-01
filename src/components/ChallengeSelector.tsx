import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ChallengeSelectorProps {
  userType: 'student' | 'teacher' | 'parent';
  onConfirm: (challenges: string[]) => void;
}

export const ChallengeSelector = ({ userType, onConfirm }: ChallengeSelectorProps) => {
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const challengesData = userType === 'student' 
    ? [
        { text: 'Insecurity in Learning Environment', subtitle: '(such as bullying, terrorism, harassment, unsafe school conditions)', color: 'bg-red-500' },
        { text: 'Lack of Qualified Teachers', subtitle: '(inexperienced teachers hired cheaply, or teachers without updated knowledge especially in STEM)', color: 'bg-orange-500' },
        { text: 'Boring Teaching Methods', subtitle: '(clinging to traditional methods, memorization, lack of creativity)', color: 'bg-yellow-500' },
        { text: 'Lack of Mentorship', subtitle: '(no guidance, lack of follow-up, no constructive feedback)', color: 'bg-green-500' },
        { text: 'Lack of Understanding of My Personal Needs, Interests, Learning Style & Language', subtitle: '(teachers ignore individuality, interests, or language differences)', color: 'bg-pink-500' },
        { text: 'Lack of Adequate Foundation and Understanding of Subject', subtitle: '(basic concepts not well taught, no one to guide my path)', color: 'bg-gray-500' },
        { text: 'Other Challenges', subtitle: '(something else not listed above)', color: 'bg-blue-500' }
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

  const toggleChallenge = (challengeText: string) => {
    setSelectedChallenges(prev => 
      prev.includes(challengeText)
        ? prev.filter(c => c !== challengeText)
        : [...prev, challengeText]
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {challengesData.map((challenge, index) => {
          const isSelected = selectedChallenges.includes(challenge.text);
          return (
            <Card
              key={index}
              onClick={() => toggleChallenge(challenge.text)}
              className={`${challenge.color} hover:opacity-90 transition-all cursor-pointer p-6 text-white hover:scale-105 shadow-lg ${
                isSelected ? 'ring-4 ring-white' : ''
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold flex-1">{challenge.text}</h3>
                  {isSelected && <span className="text-2xl">✓</span>}
                </div>
                <p className="text-sm opacity-90">{challenge.subtitle}</p>
              </div>
            </Card>
          );
        })}
      </div>
      {selectedChallenges.length > 0 && (
        <Button 
          onClick={() => onConfirm(selectedChallenges)}
          className="w-full bg-education-primary text-white hover:bg-education-primary/90 text-lg py-6"
        >
          Continue to Quiz ({selectedChallenges.length} challenge{selectedChallenges.length > 1 ? 's' : ''} selected)
        </Button>
      )}
    </div>
  );
};