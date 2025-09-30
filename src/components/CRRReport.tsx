import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, User, Target, Lightbulb } from "lucide-react";

interface CRRReportProps {
  userType: 'student' | 'teacher' | 'parent';
  challenge: string;
  actionPlan: string;
}

export const CRRReport = ({ userType, challenge, actionPlan }: CRRReportProps) => {
  return (
    <Card className="p-6 bg-gradient-to-r from-education-primary to-education-secondary text-white">
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="w-6 h-6" />
          <h3 className="text-xl font-bold">Contribution Reflection Report (CRR)</h3>
        </div>
        
        <div className="grid gap-4">
          <div className="flex items-start space-x-3">
            <User className="w-5 h-5 mt-1 opacity-80" />
            <div>
              <p className="font-semibold">Your Role:</p>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {userType === 'student' ? 'Student' : userType === 'teacher' ? 'Teacher/Mentor' : 'Parent'}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Target className="w-5 h-5 mt-1 opacity-80" />
            <div>
              <p className="font-semibold">Your Challenge:</p>
              <p className="text-sm opacity-90">{challenge}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Lightbulb className="w-5 h-5 mt-1 opacity-80" />
            <div>
              <p className="font-semibold">Your Action Plan:</p>
              <p className="text-sm opacity-90">{actionPlan}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 p-4 rounded-lg">
          <p className="text-sm font-semibold mb-2">✨ Personal Reflection (from Efemena Preye Akioya):</p>
          <p className="text-xs opacity-90 leading-relaxed">
            Every small action contributes to a larger change. Education reform in Nigeria will not only come from government — 
            it will come from students, teachers, and mentors who refuse to accept failure as final.
            <br /><br />
            Keep reflecting, because lifelong learning starts with awareness. 🌍
          </p>
        </div>
      </div>
    </Card>
  );
};