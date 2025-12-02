import { useState } from 'react';
import { User } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChallengeSelector } from '@/components/ChallengeSelector';
import { QuizComponent } from '@/components/QuizComponent';
import { ActionPlanInput } from '@/components/ActionPlanInput';
import { CRRReport } from '@/components/CRRReport';
import { 
  BookOpen, Target, Trophy, MessageSquare, Users, 
  Lightbulb, Star, ArrowLeft, CheckCircle2 
} from 'lucide-react';

interface StudentDashboardProps {
  user: User;
}

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

type ChallengeStep = 'select' | 'quiz' | 'action' | 'report';

export const StudentDashboard = ({ user }: StudentDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [challengeStep, setChallengeStep] = useState<ChallengeStep>('select');
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [actionPlan, setActionPlan] = useState('');
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [points, setPoints] = useState(0);

  const handleChallengeSelect = (challenge: string) => {
    setCurrentChallenge(challenge);
    setChallengeStep('quiz');
  };

  const handleQuizAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setPoints(prev => prev + 10);
    }
    setChallengeStep('action');
  };

  const handleActionPlanSubmit = (plan: string) => {
    setActionPlan(plan);
    setPoints(prev => prev + 5);
    setChallengeStep('report');
  };

  const handleCompleteChallenge = () => {
    if (currentChallenge && !completedChallenges.includes(currentChallenge)) {
      setCompletedChallenges(prev => [...prev, currentChallenge]);
    }
    setChallengeStep('select');
    setCurrentChallenge(null);
    setActionPlan('');
  };

  const getRank = () => {
    if (points >= 100) return { name: 'SDG Mentor', color: 'bg-accent' };
    if (points >= 50) return { name: 'Impact Fellow', color: 'bg-primary' };
    return { name: 'Beginner', color: 'bg-muted' };
  };

  const rank = getRank();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Welcome back, {user.name}!
        </h2>
        <p className="text-muted-foreground">Continue your learning journey</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-lg">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="pdp">My PDP</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Points Earned</CardTitle>
                <Star className="w-4 h-4 text-[hsl(var(--education-accent))]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{points}</div>
                <p className="text-xs text-muted-foreground">Keep learning to earn more!</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
                <Trophy className="w-4 h-4 text-[hsl(var(--education-accent))]" />
              </CardHeader>
              <CardContent>
                <Badge className={rank.color}>{rank.name}</Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  {points < 50 ? `${50 - points} points to Impact Fellow` : 
                   points < 100 ? `${100 - points} points to SDG Mentor` : 'Max rank achieved!'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Challenges Completed</CardTitle>
                <CheckCircle2 className="w-4 h-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedChallenges.length}</div>
                <Progress value={(completedChallenges.length / 7) * 100} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('challenges')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Identify Challenges
                </CardTitle>
                <CardDescription>
                  Self-assess your learning challenges and get personalized guidance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  Mentorship
                </CardTitle>
                <CardDescription>
                  Connect with mentors and receive guidance on your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">Coming Soon</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          {challengeStep === 'select' && (
            <>
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <p className="text-lg">
                    <span className="font-semibold text-primary">Remember:</span> No challenge means you are failing — 
                    challenges are simply signs of where learning is still in progress.
                  </p>
                </CardContent>
              </Card>
              <ChallengeSelector 
                userType="student" 
                onSelectChallenge={handleChallengeSelect} 
              />
            </>
          )}

          {challengeStep === 'quiz' && currentChallenge && quizData[currentChallenge] && (
            <div className="space-y-4">
              <Button variant="ghost" onClick={() => setChallengeStep('select')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Challenges
              </Button>
              <Card className="bg-muted/30">
                <CardContent className="pt-6">
                  <p className="font-medium">Selected Challenge: {currentChallenge}</p>
                </CardContent>
              </Card>
              <QuizComponent
                question={quizData[currentChallenge].question}
                options={quizData[currentChallenge].options}
                correctAnswer={quizData[currentChallenge].correctAnswer}
                onAnswer={handleQuizAnswer}
              />
            </div>
          )}

          {challengeStep === 'action' && (
            <div className="space-y-4">
              <Card className="bg-accent/10 border-accent/20">
                <CardContent className="pt-6">
                  <p className="text-lg font-medium text-accent-foreground">
                    Great job completing the quiz! Now let's create an action plan.
                  </p>
                </CardContent>
              </Card>
              <ActionPlanInput onSubmit={handleActionPlanSubmit} />
            </div>
          )}

          {challengeStep === 'report' && currentChallenge && (
            <div className="space-y-4">
              <CRRReport 
                userType="student"
                challenge={currentChallenge}
                actionPlan={actionPlan}
              />
              <Button onClick={handleCompleteChallenge} className="w-full">
                Complete & Return to Challenges
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pdp" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Personal Development Plan
              </CardTitle>
              <CardDescription>
                Track your milestones, reflections, and learning goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Start identifying challenges to build your PDP
                </p>
                <Button className="mt-4" onClick={() => setActiveTab('challenges')}>
                  Start Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[hsl(var(--education-accent))]" />
                Your Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className={`p-4 rounded-lg text-center ${points >= 0 ? 'bg-muted' : 'bg-muted/30'}`}>
                  <div className="text-3xl mb-2">🌱</div>
                  <p className="font-medium">Beginner</p>
                  <p className="text-xs text-muted-foreground">Started your journey</p>
                </div>
                <div className={`p-4 rounded-lg text-center ${points >= 50 ? 'bg-primary/20' : 'bg-muted/30 opacity-50'}`}>
                  <div className="text-3xl mb-2">⭐</div>
                  <p className="font-medium">Impact Fellow</p>
                  <p className="text-xs text-muted-foreground">50+ points</p>
                </div>
                <div className={`p-4 rounded-lg text-center ${points >= 100 ? 'bg-accent/20' : 'bg-muted/30 opacity-50'}`}>
                  <div className="text-3xl mb-2">🏆</div>
                  <p className="font-medium">SDG Mentor</p>
                  <p className="text-xs text-muted-foreground">100+ points</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
