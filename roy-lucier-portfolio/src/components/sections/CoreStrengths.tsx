'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Target, 
  Award, 
  DollarSign, 
  Settings, 
  UserCheck 
} from "lucide-react";
import resumeData from "@/data/resume.json";

const strengthIcons = {
  "Executive Leadership & Strategic Planning": Target,
  "High-Impact Preaching & Communication": MessageSquare,
  "Generational Bridge-Building & Outreach": Users,
  "Team Building & Leadership Development": UserCheck,
  "Executive & Leadership Coaching": Award,
  "Financial Acumen & Budget Stewardship": DollarSign,
  "Organizational Systems & Health": Settings,
  "Small Group Discipleship Strategy": TrendingUp,
};

const strengthDescriptions = {
  "Executive Leadership & Strategic Planning": "Proven ability to lead large organizations with strategic vision, managing 800+ member congregations and multi-million dollar budgets.",
  "High-Impact Preaching & Communication": "Compelling biblical communication that drives engagement and growth, evidenced by doubling congregation attendance.",
  "Generational Bridge-Building & Outreach": "Successfully building diverse, multi-generational communities with 20%+ minority representation in rural settings.",
  "Team Building & Leadership Development": "Expert in developing and coaching teams, utilizing frameworks like 4DX and 1:1s to foster growth and alignment.",
  "Executive & Leadership Coaching": "Certified ACC coach with ICF, specializing in ministry leadership development and organizational effectiveness.",
  "Financial Acumen & Budget Stewardship": "Strategic financial management of $2M+ budgets, optimizing resources for maximum ministry impact and sustainability.",
  "Organizational Systems & Health": "Champion of operational excellence, implementing systems like PCO to scale operations and improve decision-making.",
  "Small Group Discipleship Strategy": "Designer of effective discipleship pathways, including the Academy of Urban Ministry leadership development program.",
};

const strengthLevels = {
  "Executive Leadership & Strategic Planning": 95,
  "High-Impact Preaching & Communication": 90,
  "Generational Bridge-Building & Outreach": 85,
  "Team Building & Leadership Development": 92,
  "Executive & Leadership Coaching": 88,
  "Financial Acumen & Budget Stewardship": 90,
  "Organizational Systems & Health": 87,
  "Small Group Discipleship Strategy": 89,
};

export default function CoreStrengths() {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Core Strengths & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Eight key areas of proven excellence, developed through 14+ years of progressive ministry leadership 
            and validated by measurable results in congregational growth, team development, and operational success.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {resumeData.coreStrengths.map((strength, index) => {
              const IconComponent = strengthIcons[strength as keyof typeof strengthIcons] || Target;
              const description = strengthDescriptions[strength as keyof typeof strengthDescriptions];
              const level = strengthLevels[strength as keyof typeof strengthLevels] || 80;
              
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight mb-2">
                          {strength}
                        </CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Progress value={level} className="flex-1 h-2" />
                          <Badge variant="secondary" className="text-xs">
                            Expert
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Key Metrics Highlight */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">Proven Results</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {resumeData.keyMetrics.map((metric, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {metric.value}
                    </div>
                    <h4 className="font-semibold mb-1">{metric.metric}</h4>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {metric.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Leadership Philosophy */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-200 dark:border-blue-800">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Leadership Philosophy</h3>
                <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  I believe in empowering others to discover and develop their God-given potential. Through coaching, 
                  strategic planning, and authentic relationship-building, I create environments where individuals and 
                  communities thrive. My approach combines proven business principles with biblical wisdom to achieve 
                  sustainable growth and lasting impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}