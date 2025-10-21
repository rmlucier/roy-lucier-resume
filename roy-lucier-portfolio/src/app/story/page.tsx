'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Star, 
  Trophy, 
  MapPin, 
  Calendar,
  Users,
  Target,
  Lightbulb,
  Heart,
  ArrowRight
} from "lucide-react";

interface StoryChapter {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  achievements: string[];
  keyMetric: { value: string; label: string };
  nextChapters: string[];
  unlocked: boolean;
  completed: boolean;
}

export default function StorytellingDesign() {
  const [currentChapter, setCurrentChapter] = useState<string>('start');
  const [unlockedChapters, setUnlockedChapters] = useState<Set<string>>(new Set(['start']));
  const [completedChapters, setCompletedChapters] = useState<Set<string>>(new Set());
  const [discoveredAchievements, setDiscoveredAchievements] = useState<string[]>([]);
  const [storyProgress, setStoryProgress] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const chapters: Record<string, StoryChapter> = {
    start: {
      id: 'start',
      title: "The Beginning",
      subtitle: "A Call to Ministry",
      icon: <Heart className="w-8 h-8" />,
      description: "Every great story has a beginning. Roy's journey started with a heart for people and a calling to serve. From early leadership roles to discovering his passion for ministry, this is where it all began.",
      achievements: ["First Leadership Role", "Ministry Calling Discovered"],
      keyMetric: { value: "2004", label: "Ministry Journey Began" },
      nextChapters: ['youth-ministry', 'education'],
      unlocked: true,
      completed: false
    },
    'youth-ministry': {
      id: 'youth-ministry',
      title: "Youth Ministry",
      subtitle: "Shaping the Next Generation",
      icon: <Users className="w-8 h-8" />,
      description: "As a Youth Pastor, Roy learned the fundamentals of ministry leadership while working with teenagers and families. This foundational experience taught him the importance of authentic relationships and consistent discipleship.",
      achievements: ["Youth Ministry Certification", "Mentorship Program Launch", "50+ Youth Discipled"],
      keyMetric: { value: "150%", label: "Youth Group Growth" },
      nextChapters: ['associate-pastor', 'coaching-discovery'],
      unlocked: false,
      completed: false
    },
    education: {
      id: 'education',
      title: "Educational Foundation",
      subtitle: "Building Biblical Knowledge",
      icon: <Lightbulb className="w-8 h-8" />,
      description: "Roy pursued formal theological education to deepen his biblical understanding and leadership capabilities. This academic foundation would prove essential for his future executive ministry roles.",
      achievements: ["Bachelor's Degree Completed", "Biblical Languages", "Theology Mastery"],
      keyMetric: { value: "3.8", label: "GPA Achievement" },
      nextChapters: ['associate-pastor'],
      unlocked: false,
      completed: false
    },
    'associate-pastor': {
      id: 'associate-pastor',
      title: "Associate Pastor",
      subtitle: "Learning Executive Leadership",
      icon: <Target className="w-8 h-8" />,
      description: "Serving as Associate Pastor provided Roy with hands-on experience in church operations, staff leadership, and strategic planning. He learned to manage budgets, lead teams, and develop systems.",
      achievements: ["Budget Management", "Staff Development", "Strategic Planning", "Preaching Ministry"],
      keyMetric: { value: "$1M+", label: "Budget Responsibility" },
      nextChapters: ['executive-pastor', 'freeway-church'],
      unlocked: false,
      completed: false
    },
    'coaching-discovery': {
      id: 'coaching-discovery',
      title: "Coaching Systems",
      subtitle: "Unlocking Human Potential",
      icon: <Trophy className="w-8 h-8" />,
      description: "Roy discovered his gift for coaching and developing others. He implemented systematic approaches to leadership development that would become a cornerstone of his ministry philosophy.",
      achievements: ["Coaching Certification", "Leadership Framework", "95% Staff Retention"],
      keyMetric: { value: "95%", label: "Team Retention Rate" },
      nextChapters: ['executive-pastor'],
      unlocked: false,
      completed: false
    },
    'executive-pastor': {
      id: 'executive-pastor',
      title: "Executive Pastor",
      subtitle: "Strategic Operations Leadership",
      icon: <Star className="w-8 h-8" />,
      description: "As Executive Pastor, Roy managed all church operations, including facilities, finances, and staff coordination. This role prepared him for senior leadership by providing comprehensive organizational experience.",
      achievements: ["Operations Excellence", "Multi-Million Budget", "15-Person Team", "Facility Expansion"],
      keyMetric: { value: "15", label: "Staff Members Led" },
      nextChapters: ['freeway-church'],
      unlocked: false,
      completed: false
    },
    'freeway-church': {
      id: 'freeway-church',
      title: "Lead Pastor",
      subtitle: "Freeway Church Transformation",
      icon: <MapPin className="w-8 h-8" />,
      description: "At Freeway Church, Roy demonstrated his ability to turn around struggling congregations. Through strategic preaching, discipleship systems, and community engagement, he doubled attendance and created sustainable growth.",
      achievements: ["Church Revitalization", "150% Growth", "Community Impact", "Financial Surplus"],
      keyMetric: { value: "150%", label: "Attendance Growth" },
      nextChapters: ['future-vision'],
      unlocked: false,
      completed: false
    },
    'future-vision': {
      id: 'future-vision',
      title: "Future Vision",
      subtitle: "Ready for Greater Impact",
      icon: <Calendar className="w-8 h-8" />,
      description: "With proven success across multiple ministry contexts, Roy is prepared to lead a larger congregation. His vision: 20 years of transformational leadership in a generationally diverse church of 800-1200 members.",
      achievements: ["Proven Leadership", "Growth Strategy", "Long-term Vision", "Multi-generational Ministry"],
      keyMetric: { value: "800-1200", label: "Target Church Size" },
      nextChapters: [],
      unlocked: false,
      completed: false
    }
  };

  useEffect(() => {
    const totalChapters = Object.keys(chapters).length;
    const completed = completedChapters.size;
    setStoryProgress((completed / totalChapters) * 100);
  }, [completedChapters]);

  const unlockChapter = (chapterId: string) => {
    setUnlockedChapters(prev => new Set([...prev, chapterId]));
  };

  const completeChapter = (chapterId: string) => {
    const chapter = chapters[chapterId];
    if (chapter && !completedChapters.has(chapterId)) {
      setCompletedChapters(prev => new Set([...prev, chapterId]));
      setDiscoveredAchievements(prev => [...prev, ...chapter.achievements]);
      
      // Unlock next chapters
      chapter.nextChapters.forEach(nextId => {
        unlockChapter(nextId);
      });
    }
  };

  const resetStory = () => {
    setCurrentChapter('start');
    setUnlockedChapters(new Set(['start']));
    setCompletedChapters(new Set());
    setDiscoveredAchievements([]);
    setStoryProgress(0);
  };

  const currentChapterData = chapters[currentChapter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white">
      
      {/* Game Header */}
      <div className="border-b border-white/20 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">The Roy Lucier Story</h1>
            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">
              Interactive Experience
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">{discoveredAchievements.length} Achievements</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoPlay(!autoPlay)}
              className="border-white/30 text-white hover:bg-white/10"
            >
              {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={resetStory}
              className="border-white/30 text-white hover:bg-white/10"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Story Progress</span>
            <span>{Math.round(storyProgress)}% Complete</span>
          </div>
          <Progress value={storyProgress} className="bg-white/20" />
        </div>
      </div>

      <div className="flex">
        {/* Story Map Sidebar */}
        <div className="w-1/3 border-r border-white/20 p-6 max-h-screen overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Story Map</h2>
          
          <div className="space-y-3">
            {Object.values(chapters).map((chapter) => (
              <motion.div
                key={chapter.id}
                className={`relative p-3 rounded-lg border cursor-pointer transition-all ${
                  unlockedChapters.has(chapter.id)
                    ? completedChapters.has(chapter.id)
                      ? 'bg-green-500/20 border-green-400 text-green-100'
                      : currentChapter === chapter.id
                      ? 'bg-blue-500/30 border-blue-400 text-blue-100'
                      : 'bg-white/10 border-white/30 hover:bg-white/20'
                    : 'bg-gray-500/10 border-gray-500/20 text-gray-400 cursor-not-allowed'
                }`}
                onClick={() => unlockedChapters.has(chapter.id) && setCurrentChapter(chapter.id)}
                whileHover={unlockedChapters.has(chapter.id) ? { scale: 1.02 } : {}}
                whileTap={unlockedChapters.has(chapter.id) ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center space-x-3">
                  <div className={`${unlockedChapters.has(chapter.id) ? 'text-current' : 'text-gray-500'}`}>
                    {chapter.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{chapter.title}</div>
                    <div className="text-xs opacity-80">{chapter.subtitle}</div>
                  </div>
                  {completedChapters.has(chapter.id) && (
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  )}
                </div>
                
                {!unlockedChapters.has(chapter.id) && (
                  <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                    <div className="text-xs font-medium">LOCKED</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Achievement Panel */}
          {discoveredAchievements.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-3">Discovered Achievements</h3>
              <div className="space-y-1">
                {discoveredAchievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded flex items-center space-x-1"
                  >
                    <Trophy className="w-3 h-3" />
                    <span>{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <AnimatePresence mode="wait">
            {currentChapterData && (
              <motion.div
                key={currentChapter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                {/* Chapter Header */}
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className="bg-white/10 p-4 rounded-full">
                      {currentChapterData.icon}
                    </div>
                  </div>
                  
                  <h1 className="text-4xl font-bold mb-2">{currentChapterData.title}</h1>
                  <p className="text-xl text-blue-200">{currentChapterData.subtitle}</p>
                  
                  {/* Key Metric */}
                  <div className="mt-6">
                    <Card className="bg-white/10 border-white/20 backdrop-blur-sm inline-block">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-yellow-400">
                          {currentChapterData.keyMetric.value}
                        </div>
                        <div className="text-sm text-white/80">
                          {currentChapterData.keyMetric.label}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Chapter Content */}
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-8">
                  <CardContent className="p-8">
                    <p className="text-lg leading-relaxed mb-6">
                      {currentChapterData.description}
                    </p>
                    
                    {/* Achievements Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {currentChapterData.achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-3 rounded-lg text-center border border-white/20"
                        >
                          <div className="text-xs font-medium">{achievement}</div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation Actions */}
                <div className="flex justify-center space-x-4">
                  {!completedChapters.has(currentChapter) && (
                    <Button
                      onClick={() => completeChapter(currentChapter)}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3"
                    >
                      Complete Chapter
                      <Star className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                  
                  {currentChapterData.nextChapters.length > 0 && (
                    <div className="flex space-x-2">
                      {currentChapterData.nextChapters.map(nextId => (
                        <Button
                          key={nextId}
                          variant="outline"
                          className={`border-white/30 text-white hover:bg-white/10 ${
                            unlockedChapters.has(nextId) ? '' : 'opacity-50 cursor-not-allowed'
                          }`}
                          onClick={() => unlockedChapters.has(nextId) && setCurrentChapter(nextId)}
                          disabled={!unlockedChapters.has(nextId)}
                        >
                          Next: {chapters[nextId]?.title}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  {currentChapter === 'future-vision' && completedChapters.has('future-vision') && (
                    <Button
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3"
                      asChild
                    >
                      <a href="/experience">View Full Resume</a>
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}