'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, MapPin, Users, TrendingUp } from "lucide-react";
import resumeData from "@/data/resume.json";

interface ExperienceItemProps {
  experience: {
    position: string;
    company: string;
    duration: string;
    location: string;
    description: string;
    achievements: string[];
  };
  isLast: boolean;
}

function ExperienceItem({ experience, isLast }: ExperienceItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getDateRange = () => {
    const startDate = formatDate(experience.startDate);
    const endDate = experience.current ? 'Present' : formatDate(experience.endDate);
    return `${startDate} – ${endDate}`;
  };

  return (
    <div className="flex gap-6 mb-12 last:mb-0">
      {/* Timeline Indicator */}
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full border-4 ${experience.current ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300'} flex-shrink-0`} />
        {!isLast && <div className="w-0.5 h-full bg-slate-200 mt-2" />}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.01]">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {experience.position}
                </CardTitle>
                <CardDescription className="text-lg font-medium text-blue-600 dark:text-blue-400">
                  {experience.company}
                </CardDescription>
              </div>
              {experience.current && (
                <Badge variant="default" className="self-start">Current Role</Badge>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {getDateRange()}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {experience.location}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {experience.description}
            </p>

            {/* Key Achievements */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Key Achievements
              </h4>
              <ul className="space-y-2">
                {experience.achievements?.map((achievement: string, index: number) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Core Competencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.skills?.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ExperienceTimeline() {
  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            14+ years of progressive leadership in ministry, from Youth Pastor to Executive leadership 
            roles managing multi-million dollar operations and diverse teams.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {resumeData.experience.map((exp, index) => (
            <ExperienceItem 
              key={exp.id} 
              experience={exp} 
              isLast={index === resumeData.experience.length - 1}
            />
          ))}
        </div>

        <Separator className="my-12" />

        {/* Education & Certifications */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">Education & Certifications</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Education</CardTitle>
              </CardHeader>
              <CardContent>
                {resumeData.education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-semibold">{edu.degree}</h4>
                    {edu.minor && <p className="text-sm text-muted-foreground">Minor: {edu.minor}</p>}
                    <p className="text-sm text-muted-foreground">{edu.institution}, {edu.location}</p>
                    <p className="text-sm text-muted-foreground">Graduated: {edu.graduationDate}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Professional Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeData.certifications.map((cert) => (
                  <div key={cert.id} className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">{cert.name}</h4>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      <p className="text-sm text-muted-foreground">{cert.dateRange}</p>
                    </div>
                    {cert.verified && (
                      <Badge variant="outline" className="text-xs">Verified</Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}