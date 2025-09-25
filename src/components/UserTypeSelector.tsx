import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users } from "lucide-react";

interface UserTypeSelectorProps {
  onSelectType: (type: 'student' | 'teacher') => void;
}

export const UserTypeSelector = ({ onSelectType }: UserTypeSelectorProps) => {
  return (
    <div className="flex flex-col items-center space-y-6 p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-education-primary to-education-secondary bg-clip-text text-transparent mb-4">
          Welcome to EduMentor
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Rethinking SDG 4: Building safe, inclusive, personalized, and lifelong learning systems in Nigeria and Africa
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-education-primary"
              onClick={() => onSelectType('student')}>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-education-primary rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold">I'm a Student</h3>
            <p className="text-muted-foreground">
              Explore your learning journey, overcome challenges, and discover personalized mentorship opportunities
            </p>
            <Button className="w-full bg-education-primary hover:bg-education-primary/90">
              Start as Student
            </Button>
          </div>
        </Card>
        
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-education-secondary"
              onClick={() => onSelectType('teacher')}>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-education-secondary rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold">I'm a Mentor</h3>
            <p className="text-muted-foreground">
              Share your experience, learn new approaches, and explore effective mentorship strategies
            </p>
            <Button className="w-full bg-education-secondary hover:bg-education-secondary/90">
              Start as Mentor
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};