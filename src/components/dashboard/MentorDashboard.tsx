import { useState } from 'react';
import { User } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, CheckCircle, MessageSquare, Target, 
  AlertCircle, BookOpen, Award
} from 'lucide-react';

interface MentorDashboardProps {
  user: User;
}

const mentorChallenges = [
  { id: 1, title: 'Learning is still in progress', description: 'Students are not fully grasping concepts', color: 'bg-primary/10 border-primary/30' },
  { id: 2, title: 'Large class sizes', description: 'Too many students to help individually', color: 'bg-accent/10 border-accent/30' },
  { id: 3, title: 'Lack of training and resources', description: 'Need better tools and support', color: 'bg-[hsl(var(--education-accent))]/10 border-[hsl(var(--education-accent))]/30' },
  { id: 4, title: 'Insecurity in schools', description: 'Safety concerns for everyone', color: 'bg-destructive/10 border-destructive/30' },
  { id: 5, title: 'Bureaucratic barriers', description: 'Too much administrative work', color: 'bg-[hsl(var(--education-warm))]/10 border-[hsl(var(--education-warm))]/30' },
  { id: 6, title: 'Other challenges', description: 'Specific to your learning environment', color: 'bg-muted border-border' },
];

export const MentorDashboard = ({ user }: MentorDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedChallenges, setSelectedChallenges] = useState<number[]>([]);

  const toggleChallenge = (id: number) => {
    setSelectedChallenges(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Welcome, Mentor {user.name}!
        </h2>
        <p className="text-muted-foreground">Guide and support your students</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-lg">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="challenges">My Challenges</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Students Mentored</CardTitle>
                <Users className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Start mentoring students</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Milestones Verified</CardTitle>
                <CheckCircle className="w-4 h-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Verify student progress</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Feedback Given</CardTitle>
                <MessageSquare className="w-4 h-4 text-[hsl(var(--education-accent))]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Help students improve</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Your Role as Mentor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>✓ Verify student milestones and award points</p>
                <p>✓ Review reflections and provide guidance</p>
                <p>✓ Track progress of mentored students</p>
                <p>✓ Support youth mentors in training</p>
                <p>✓ Monitor SDG and entrepreneurship projects</p>
                <p>✓ Provide endorsements for student ranks</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  Impact Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-muted-foreground">
                    Start mentoring to see your impact
                  </p>
                  <Button className="mt-4" onClick={() => setActiveTab('students')}>
                    View Students
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Students</CardTitle>
              <CardDescription>
                Students assigned to you for mentorship
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No students assigned yet</p>
                <Badge variant="outline" className="mt-2">Coming Soon</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="pt-6">
              <p className="text-lg">
                <span className="font-semibold text-accent">Self-Assessment:</span> Select the challenges you face as a mentor. 
                This helps us provide better support and resources.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            {mentorChallenges.map((challenge) => (
              <Card 
                key={challenge.id}
                className={`cursor-pointer transition-all hover:shadow-md ${challenge.color} ${
                  selectedChallenges.includes(challenge.id) ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => toggleChallenge(challenge.id)}
              >
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    {selectedChallenges.includes(challenge.id) && (
                      <CheckCircle className="w-4 h-4 text-primary" />
                    )}
                    {challenge.title}
                  </CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {selectedChallenges.length > 0 && (
            <Card className="bg-primary/5">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  You've identified {selectedChallenges.length} challenge(s). 
                  We'll use this to provide tailored resources and support.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Review Reflections
                </CardTitle>
                <CardDescription>
                  Read and provide feedback on student reflections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">Coming Soon</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  Verify Milestones
                </CardTitle>
                <CardDescription>
                  Approve completed tasks and award points
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">Coming Soon</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
