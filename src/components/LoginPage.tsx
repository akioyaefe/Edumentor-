import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, Users, Heart } from 'lucide-react';
import { UserRole } from '@/hooks/useAuth';
import mentorCharacter from '@/assets/mentor-character.png';

interface LoginPageProps {
  onLogin: (name: string, role: UserRole) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      setError('Please enter your name');
      return;
    }
    if (trimmedName.length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }
    if (trimmedName.length > 50) {
      setError('Name must be less than 50 characters');
      return;
    }
    if (!selectedRole) {
      setError('Please select your role');
      return;
    }
    
    onLogin(trimmedName, selectedRole);
  };

  const roles = [
    { 
      id: 'student' as UserRole, 
      label: "I'm a Student", 
      icon: GraduationCap, 
      color: 'bg-primary hover:bg-primary/90',
      description: 'Track your learning journey and earn badges'
    },
    { 
      id: 'mentor' as UserRole, 
      label: "I'm a Mentor", 
      icon: Users, 
      color: 'bg-accent hover:bg-accent/90',
      description: 'Guide students and verify their progress'
    },
    { 
      id: 'parent' as UserRole, 
      label: "I'm a Parent", 
      icon: Heart, 
      color: 'bg-[hsl(var(--education-parent))] hover:bg-[hsl(var(--education-parent))]/90',
      description: "Monitor your child's educational journey"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <img 
            src={mentorCharacter} 
            alt="Edumentor Mascot" 
            className="w-24 h-24 mx-auto mb-4 rounded-full shadow-lg"
          />
          <h1 className="text-3xl font-bold text-primary mb-2">
            Welcome to Edumentor
          </h1>
          <p className="text-muted-foreground">
            Powered by Efeiconic Shadow Global Mentoring Company
          </p>
        </div>

        <Card className="shadow-xl border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Get Started</CardTitle>
            <CardDescription>
              Enter your name and select your role to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium">
                  Your Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError('');
                  }}
                  className="h-12 text-lg"
                  maxLength={50}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium">Select Your Role</Label>
                <div className="grid gap-3">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    const isSelected = selectedRole === role.id;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => {
                          setSelectedRole(role.id);
                          setError('');
                        }}
                        className={`p-4 rounded-lg border-2 transition-all text-left flex items-center gap-4 ${
                          isSelected 
                            ? 'border-primary bg-primary/10 shadow-md' 
                            : 'border-border hover:border-primary/50 hover:bg-muted/50'
                        }`}
                      >
                        <div className={`p-2 rounded-full ${role.color} text-primary-foreground`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold">{role.label}</div>
                          <div className="text-sm text-muted-foreground">{role.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {error && (
                <p className="text-destructive text-sm text-center">{error}</p>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-semibold"
                disabled={!name.trim() || !selectedRole}
              >
                Continue to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Your data is stored locally on this device only
        </p>
      </div>
    </div>
  );
};
