import { useState } from 'react';
import { User } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Heart, Eye, MessageSquare, FileText, 
  Bell, CheckCircle, Users, TrendingUp
} from 'lucide-react';

interface ParentDashboardProps {
  user: User;
}

const parentChallenges = [
  { id: 1, title: 'Learning is still in progress', description: 'Child is not fully grasping concepts', color: 'bg-primary/10 border-primary/30' },
  { id: 2, title: 'Finding good schools', description: 'Quality education options', color: 'bg-accent/10 border-accent/30' },
  { id: 3, title: 'Affording education costs', description: 'Financial challenges', color: 'bg-[hsl(var(--education-accent))]/10 border-[hsl(var(--education-accent))]/30' },
  { id: 4, title: 'School safety concerns', description: 'Worries about child safety', color: 'bg-destructive/10 border-destructive/30' },
  { id: 5, title: 'Supporting learning at home', description: 'How to help effectively', color: 'bg-[hsl(var(--education-warm))]/10 border-[hsl(var(--education-warm))]/30' },
  { id: 6, title: 'Other challenges', description: 'Related to your child\'s education', color: 'bg-muted border-border' },
];

export const ParentDashboard = ({ user }: ParentDashboardProps) => {
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
          Welcome, {user.name}!
        </h2>
        <p className="text-muted-foreground">Monitor and support your child's education</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-lg">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="challenges">My Challenges</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Child's Progress</CardTitle>
                <TrendingUp className="w-4 h-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">--</div>
                <p className="text-xs text-muted-foreground">Link your child's account</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Mentorship Sessions</CardTitle>
                <Users className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Sessions this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                <Bell className="w-4 h-4 text-[hsl(var(--education-accent))]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">New updates</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[hsl(var(--education-parent))]" />
                  Your Role as Parent
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>✓ Monitor your child's progress and milestones</p>
                <p>✓ Collaborate with mentors on learning goals</p>
                <p>✓ View reports and summaries</p>
                <p>✓ Track mentorship sessions</p>
                <p>✓ Receive notifications and updates</p>
                <p>✓ Support learning at home</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Connect with Your Child
                </CardTitle>
                <CardDescription>
                  Link your account to monitor their progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Ask your child for their Edumentor name to connect
                  </p>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Child's Learning Progress</CardTitle>
              <CardDescription>
                Track milestones, reflections, and achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Eye className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Connect with your child's account to see progress</p>
                <Badge variant="outline" className="mt-2">Coming Soon</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <Card className="bg-[hsl(var(--education-parent))]/10 border-[hsl(var(--education-parent))]/30">
            <CardContent className="pt-6">
              <p className="text-lg">
                <span className="font-semibold text-[hsl(var(--education-parent))]">Self-Assessment:</span> Select the challenges you face as a parent. 
                This helps us provide guidance, notifications, and resources to better support you and your child.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            {parentChallenges.map((challenge) => (
              <Card 
                key={challenge.id}
                className={`cursor-pointer transition-all hover:shadow-md ${challenge.color} ${
                  selectedChallenges.includes(challenge.id) ? 'ring-2 ring-[hsl(var(--education-parent))]' : ''
                }`}
                onClick={() => toggleChallenge(challenge.id)}
              >
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    {selectedChallenges.includes(challenge.id) && (
                      <CheckCircle className="w-4 h-4 text-[hsl(var(--education-parent))]" />
                    )}
                    {challenge.title}
                  </CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {selectedChallenges.length > 0 && (
            <Card className="bg-[hsl(var(--education-parent))]/5">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  You've identified {selectedChallenges.length} challenge(s). 
                  We'll use this to provide tailored guidance and resources.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Learning Reports
              </CardTitle>
              <CardDescription>
                View summaries of learning outcomes and achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No reports available yet</p>
                <Badge variant="outline" className="mt-2">Coming Soon</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
