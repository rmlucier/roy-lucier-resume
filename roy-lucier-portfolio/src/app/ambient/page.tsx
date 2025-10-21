'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Star, Sparkles } from "lucide-react";

export default function AmbientDesign() {
  const [activeZone, setActiveZone] = useState<string>('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [visitCount, setVisitCount] = useState(1);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 17) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');

    const visits = localStorage.getItem('roy-portfolio-visits');
    if (visits) {
      const count = parseInt(visits) + 1;
      setVisitCount(count);
      localStorage.setItem('roy-portfolio-visits', count.toString());
    } else {
      localStorage.setItem('roy-portfolio-visits', '1');
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getGreeting = () => {
    const greetings = {
      morning: visitCount === 1 ? "Good morning! Welcome to Roy's world." : `Good morning! Welcome back for your ${visitCount}${getOrdinalSuffix(visitCount)} visit.`,
      afternoon: visitCount === 1 ? "Good afternoon! Great to meet you." : `Good afternoon! Nice to see you again.`,
      evening: visitCount === 1 ? "Good evening! Thanks for stopping by." : `Good evening! Welcome back.`
    };
    return greetings[timeOfDay];
  };

  const getOrdinalSuffix = (num: number) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  };

  const breathingVariants = {
    initial: { scale: 1, opacity: 0.8 },
    breathing: {
      scale: [1, 1.02, 1],
      opacity: [0.8, 0.9, 0.8],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const proximityVariants = {
    initial: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const floatingElements = [
    { id: 'ministry', label: 'Ministry', icon: '⛪', x: 20, y: 30, delay: 0 },
    { id: 'leadership', label: 'Leadership', icon: '👥', x: 80, y: 20, delay: 1 },
    { id: 'innovation', label: 'Innovation', icon: '💡', x: 15, y: 70, delay: 2 },
    { id: 'coaching', label: 'Coaching', icon: '🎯', x: 75, y: 75, delay: 3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900/20 overflow-hidden relative">
      
      {/* Ambient Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-300/40 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Mouse Follower Glow */}
      <motion.div
        className="fixed w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none z-10"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Floating Navigation Elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="fixed z-20 cursor-pointer"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          initial="initial"
          animate="visible"
          variants={proximityVariants}
          transition={{ delay: element.delay * 0.2 }}
          whileHover={{ scale: 1.2 }}
          onHoverStart={() => setActiveZone(element.id)}
          onHoverEnd={() => setActiveZone('')}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="text-2xl">{element.icon}</div>
            <AnimatePresence>
              {activeZone === element.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-xs font-medium text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 px-2 py-1 rounded backdrop-blur-sm"
                >
                  {element.label}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}

      {/* Main Content Container */}
      <div className="flex flex-col items-center justify-center min-h-screen px-8 relative z-30">
        
        {/* Central Profile Area */}
        <motion.div
          className="text-center space-y-8 max-w-2xl"
          initial="initial"
          animate="breathing"
          variants={breathingVariants}
        >
          {/* Avatar with Ambient Glow */}
          <motion.div className="relative mx-auto w-32 h-32">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <Avatar className="w-32 h-32 relative z-10 ring-4 ring-white/50 dark:ring-slate-800/50">
              <AvatarImage src="/roy-avatar.jpg" alt="Roy M. Lucier" />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700">RL</AvatarFallback>
            </Avatar>
          </motion.div>

          {/* Adaptive Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <p className="text-lg text-slate-600 dark:text-slate-400">{getGreeting()}</p>
            <h1 className="text-4xl font-light text-slate-800 dark:text-slate-200 tracking-wide">
              Roy M. Lucier
            </h1>
            <div className="flex items-center justify-center space-x-2 text-slate-500">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Executive Ministry Leader</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Context-Aware Information */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="space-y-4"
          >
            <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-white/50 dark:border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Available for new opportunities</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>Michigan & Northern Ohio</span>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    20+ years of executive ministry leadership • Building generationally diverse churches • Leading multi-million dollar operations
                  </p>
                </div>

                <div className="mt-6 flex justify-center space-x-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300">
                    <Star className="w-3 h-3 mr-1" />
                    Lead Pastor Ready
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300">
                    150% Growth
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Gentle Call-to-Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="space-y-4"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Explore my journey by hovering around the interface
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                variant="outline" 
                className="bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50"
                asChild
              >
                <a href="/">View Portfolio</a>
              </Button>
              <Button 
                className="bg-blue-500/90 hover:bg-blue-600 text-white backdrop-blur-sm"
                asChild
              >
                <a href="/experience">Explore Experience</a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient Status Indicators */}
      <div className="fixed bottom-6 right-6 space-y-2 z-40">
        <motion.div
          className="flex items-center space-x-2 text-xs text-slate-500 bg-white/80 dark:bg-slate-800/80 px-3 py-2 rounded-full backdrop-blur-sm"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Available for opportunities</span>
        </motion.div>
      </div>
    </div>
  );
}