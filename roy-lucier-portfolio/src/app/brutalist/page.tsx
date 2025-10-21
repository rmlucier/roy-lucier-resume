'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Square, Circle, Triangle } from "lucide-react";

export default function BrutalistDesign() {
  const [clickedMetric, setClickedMetric] = useState<string>('');

  const metrics = [
    { id: 'growth', value: '150%', label: 'CONGREGATIONAL GROWTH', description: 'DOUBLED ATTENDANCE FROM 30 TO 75 MEMBERS' },
    { id: 'budget', value: '$2M+', label: 'ANNUAL BUDGET OVERSIGHT', description: 'MULTI-MILLION DOLLAR OPERATIONS MANAGEMENT' },
    { id: 'staff', value: '15', label: 'STAFF LEADERSHIP', description: '95% RETENTION RATE ACHIEVED' },
    { id: 'years', value: '20+', label: 'YEARS EXPERIENCE', description: 'PROGRESSIVE MINISTRY LEADERSHIP' }
  ];

  const competencies = [
    { id: 'preaching', title: 'BIBLICAL PREACHING', icon: <Square className="w-6 h-6" />, level: 95 },
    { id: 'leadership', title: 'TEAM LEADERSHIP', icon: <Circle className="w-6 h-6" />, level: 90 },
    { id: 'coaching', title: 'COACHING SYSTEMS', icon: <Triangle className="w-6 h-6" />, level: 85 },
    { id: 'operations', title: 'OPERATIONS', icon: <Square className="w-6 h-6" />, level: 88 },
    { id: 'counseling', title: 'PASTORAL CARE', icon: <Circle className="w-6 h-6" />, level: 92 },
    { id: 'innovation', title: 'INNOVATION', icon: <Triangle className="w-6 h-6" />, level: 80 }
  ];

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      
      {/* Header Block */}
      <div className="border-b-4 border-black p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Name Block */}
            <div className="bg-black text-white p-6">
              <h1 className="text-4xl font-black tracking-tighter mb-2">
                ROY M. LUCIER
              </h1>
              <div className="text-sm font-bold tracking-widest">
                EXECUTIVE MINISTRY LEADER
              </div>
            </div>

            {/* Status Block */}
            <div className="border-4 border-black p-6">
              <div className="text-xs font-black tracking-widest mb-2 text-red-600">
                STATUS: AVAILABLE
              </div>
              <div className="text-sm font-bold">
                SEEKING LEAD PASTOR POSITION
              </div>
              <div className="text-xs mt-2">
                MICHIGAN • NORTHERN OHIO
              </div>
            </div>

            {/* Contact Block */}
            <div className="bg-gray-100 border-2 border-black p-6">
              <div className="space-y-2">
                <div className="text-xs font-black tracking-widest">CONTACT</div>
                <div className="text-sm font-bold">313.820.5831</div>
                <div className="text-sm font-bold break-all">RMLUCIER@GMAIL.COM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="border-b-4 border-black p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-black tracking-tighter mb-6 text-center">
            PERFORMANCE METRICS
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <motion.div
                key={metric.id}
                className={`border-4 border-black p-6 cursor-pointer transition-colors ${
                  clickedMetric === metric.id ? 'bg-black text-white' : 'bg-white hover:bg-yellow-200'
                }`}
                onClick={() => setClickedMetric(clickedMetric === metric.id ? '' : metric.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-3xl font-black mb-2">{metric.value}</div>
                <div className="text-xs font-black tracking-widest mb-2">{metric.label}</div>
                {clickedMetric === metric.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-xs mt-2 font-bold"
                  >
                    {metric.description}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Competencies Section */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Skills Grid */}
            <div>
              <h2 className="text-2xl font-black tracking-tighter mb-6 border-b-2 border-black pb-2">
                CORE COMPETENCIES
              </h2>
              
              <div className="space-y-4">
                {competencies.map((comp) => (
                  <div key={comp.id} className="border-2 border-black p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {comp.icon}
                        <span className="text-sm font-black tracking-widest">{comp.title}</span>
                      </div>
                      <span className="text-lg font-black">{comp.level}%</span>
                    </div>
                    
                    {/* Raw Progress Bar */}
                    <div className="w-full bg-gray-200 border border-black">
                      <motion.div
                        className="bg-black h-2"
                        initial={{ width: 0 }}
                        animate={{ width: `${comp.level}%` }}
                        transition={{ duration: 1, delay: 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Blocks */}
            <div className="space-y-6">
              <div className="border-4 border-black p-6 bg-black text-white">
                <h3 className="text-lg font-black tracking-tighter mb-4">OBJECTIVE</h3>
                <p className="text-sm font-bold leading-relaxed">
                  SEEKING LONG-TERM LEAD PASTOR POSITION WHERE I CAN INVEST THE NEXT 20 YEARS 
                  BUILDING A GENERATIONALLY DIVERSE CHURCH AND LEADING IT TO MAKE LASTING 
                  COMMUNITY IMPACT.
                </p>
              </div>

              <div className="border-4 border-black p-6">
                <h3 className="text-lg font-black tracking-tighter mb-4">TRACK RECORD</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-black pb-2">
                    <span className="text-xs font-black tracking-widest">CHURCH GROWTH</span>
                    <Badge className="bg-green-200 text-green-800 font-black border border-black">
                      PROVEN
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center border-b border-black pb-2">
                    <span className="text-xs font-black tracking-widest">BUDGET MANAGEMENT</span>
                    <Badge className="bg-blue-200 text-blue-800 font-black border border-black">
                      EXPERT
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center border-b border-black pb-2">
                    <span className="text-xs font-black tracking-widest">STAFF RETENTION</span>
                    <Badge className="bg-purple-200 text-purple-800 font-black border border-black">
                      95%
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="border-4 border-black p-6 bg-yellow-200">
                <h3 className="text-lg font-black tracking-tighter mb-4">PREPARATION</h3>
                <p className="text-sm font-bold">
                  EXPERIENCE IN 800-MEMBER CHURCH HAS PREPARED ME TO PROVIDE ROBUST, 
                  VISION-DRIVEN LEADERSHIP FOR CONGREGATIONS OF 800-1200.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="border-t-4 border-black p-8 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-black tracking-tighter mb-6">
            READY TO LEAD
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button 
              className="bg-white text-black font-black text-lg py-6 border-4 border-white hover:bg-gray-100 transition-colors"
              asChild
            >
              <a href="/experience" className="flex items-center justify-center space-x-2">
                <span>VIEW EXPERIENCE</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            
            <Button 
              className="bg-red-600 text-white font-black text-lg py-6 border-4 border-red-600 hover:bg-red-700 transition-colors"
              asChild
            >
              <a href="tel:313.820.5831" className="flex items-center justify-center space-x-2">
                <span>CALL NOW</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            
            <Button 
              className="bg-yellow-400 text-black font-black text-lg py-6 border-4 border-yellow-400 hover:bg-yellow-500 transition-colors"
              asChild
            >
              <Link href="/" className="flex items-center justify-center space-x-2">
                <span>FULL PORTFOLIO</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 text-xs font-black tracking-widest opacity-60">
            © 2024 ROY M. LUCIER • EXECUTIVE MINISTRY LEADER • ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </div>
  );
}