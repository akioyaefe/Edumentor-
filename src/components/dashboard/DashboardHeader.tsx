import { Button } from '@/components/ui/button';
import { User } from '@/hooks/useAuth';
import { LogOut, GraduationCap, Users, Heart } from 'lucide-react';

interface DashboardHeaderProps {
  user: User;
  onLogout: () => void;
}

export const DashboardHeader = ({ user, onLogout }: DashboardHeaderProps) => {
  const getRoleIcon = () => {
    switch (user.role) {
      case 'student': return <GraduationCap className="w-5 h-5" />;
      case 'mentor': return <Users className="w-5 h-5" />;
      case 'parent': return <Heart className="w-5 h-5" />;
    }
  };

  const getRoleColor = () => {
    switch (user.role) {
      case 'student': return 'bg-primary';
      case 'mentor': return 'bg-accent';
      case 'parent': return 'bg-[hsl(var(--education-parent))]';
    }
  };

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-primary">Edumentor</h1>
          <span className="text-sm text-muted-foreground hidden sm:inline">
            powered by ESGMC
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-full ${getRoleColor()} text-primary-foreground`}>
              {getRoleIcon()}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
