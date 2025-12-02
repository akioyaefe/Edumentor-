import { useAuth } from '@/hooks/useAuth';
import { LoginPage } from '@/components/LoginPage';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StudentDashboard } from '@/components/dashboard/StudentDashboard';
import { MentorDashboard } from '@/components/dashboard/MentorDashboard';
import { ParentDashboard } from '@/components/dashboard/ParentDashboard';

const Index = () => {
  const { user, login, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
        <div className="animate-pulse text-primary text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <DashboardHeader user={user} onLogout={logout} />
      
      {user.role === 'student' && <StudentDashboard user={user} />}
      {user.role === 'mentor' && <MentorDashboard user={user} />}
      {user.role === 'parent' && <ParentDashboard user={user} />}
    </div>
  );
};

export default Index;
