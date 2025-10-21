'use client';

import { useState, useRef } from 'react';
import { motion, useTransform, useScroll, useSpring } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Church, 
  Users, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Target,
  Phone,
  Mail,
  Calendar,
  Star,
  Layers,
  Orbit,
  Zap
} from "lucide-react";

interface FloatingNode {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: { x: number; y: number; z: number };
  category: 'personal' | 'experience' | 'skills' | 'contact' | 'achievements';
  connections: string[];
  data?: Record<string, string | number>;
}

export default function SpatialDesign() {
  const [activeNode, setActiveNode] = useState<string>('center');
  const [hoveredNode, setHoveredNode] = useState<string>('');
  const [viewMode, setViewMode] = useState<'explore' | 'timeline' | 'network'>('explore');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ target: containerRef });
  
  const rotationY = useTransform(scrollY, [0, 1000], [0, 360]);
  const floatingY = useSpring(useTransform(scrollY, [0, 500], [0, -100]), { stiffness: 100, damping: 30 });

  const nodes: Record<string, FloatingNode> = {
    center: {
      id: 'center',
      title: 'Roy M. Lucier',
      description: 'Executive Ministry Leader ready for next chapter',
      icon: <Church className="w-8 h-8" />,
      position: { x: 0, y: 0, z: 0 },
      category: 'personal',
      connections: ['leadership', 'preaching', 'coaching', 'growth', 'contact'],
      data: {
        status: 'Available for Lead Pastor roles',
        location: 'Michigan & Northern Ohio',
        experience: '20+ years'
      }
    },
    leadership: {
      id: 'leadership',
      title: 'Team Leadership',
      description: '15-person staff with 95% retention rate',
      icon: <Users className="w-6 h-6" />,
      position: { x: -300, y: -200, z: 50 },
      category: 'skills',
      connections: ['center', 'coaching', 'operations'],
      data: {
        metric: '95%',
        label: 'Staff Retention Rate',
        details: 'Led 15-person ministry team using coaching frameworks'
      }
    },
    preaching: {
      id: 'preaching',
      title: 'Biblical Preaching',
      description: 'Compelling, expository preaching that transforms lives',
      icon: <BookOpen className="w-6 h-6" />,
      position: { x: 300, y: -250, z: 30 },
      category: 'skills',
      connections: ['center', 'growth'],
      data: {
        metric: '150%',
        label: 'Congregational Growth',
        details: 'Doubled attendance through strategic preaching'
      }
    },
    coaching: {
      id: 'coaching',
      title: 'Coaching Systems',
      description: 'Systematic approach to developing leaders',
      icon: <Target className="w-6 h-6" />,
      position: { x: -250, y: 200, z: 80 },
      category: 'skills',
      connections: ['center', 'leadership'],
      data: {
        metric: '40%',
        label: 'Team Effectiveness Increase',
        details: 'Coaching frameworks improved team performance'
      }
    },
    growth: {
      id: 'growth',
      title: 'Church Growth',
      description: 'Proven track record of sustainable growth',
      icon: <TrendingUp className="w-6 h-6" />,
      position: { x: 280, y: 250, z: 60 },
      category: 'achievements',
      connections: ['center', 'preaching', 'operations'],
      data: {
        metric: '150%',
        label: 'Growth Achievement',
        details: 'From 30 to 75 members at Freeway Church'
      }
    },
    operations: {
      id: 'operations',
      title: 'Operations Excellence',
      description: 'Multi-million dollar budget management',
      icon: <Award className="w-6 h-6" />,
      position: { x: 0, y: -350, z: 40 },
      category: 'experience',
      connections: ['center', 'leadership', 'growth'],
      data: {
        metric: '$2M+',
        label: 'Annual Budget Oversight',
        details: 'Strategic financial management with surplus performance'
      }
    },
    contact: {
      id: 'contact',
      title: 'Get In Touch',
      description: 'Ready to discuss ministry opportunities',
      icon: <Phone className="w-6 h-6" />,
      position: { x: 0, y: 300, z: 70 },
      category: 'contact',
      connections: ['center'],
      data: {
        phone: '313.820.5831',
        email: 'Rmlucier@gmail.com',
        linkedin: 'linkedin.com/in/roy-l-18a88964/'
      }
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'personal': return 'from-blue-500 to-indigo-600';
      case 'experience': return 'from-green-500 to-emerald-600';
      case 'skills': return 'from-purple-500 to-violet-600';
      case 'contact': return 'from-orange-500 to-red-600';
      case 'achievements': return 'from-yellow-500 to-amber-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getNodeScale = (nodeId: string) => {
    if (nodeId === 'center') return 1.5;
    if (nodeId === activeNode) return 1.3;
    if (hoveredNode === nodeId) return 1.1;
    return 1;
  };

  const getConnectionOpacity = (nodeId: string) => {
    if (activeNode === 'center') return 0.3;
    if (nodes[activeNode]?.connections.includes(nodeId) || nodeId === activeNode) return 0.6;
    return 0.1;
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-hidden relative"
      style={{ perspective: '1000px' }}
    >
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Control Panel */}
      <div className="absolute top-6 left-6 z-50 space-y-4">
        <Card className="bg-white/10 border-white/20 backdrop-blur-md">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5" />
              <span className="font-semibold">Spatial Portfolio</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col space-y-2">
              <Button
                variant={viewMode === 'explore' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('explore')}
                className="justify-start"
              >
                <Orbit className="w-4 h-4 mr-2" />
                Explore View
              </Button>
              <Button
                variant={viewMode === 'timeline' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('timeline')}
                className="justify-start"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Timeline View
              </Button>
              <Button
                variant={viewMode === 'network' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('network')}
                className="justify-start"
              >
                <Zap className="w-4 h-4 mr-2" />
                Network View
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-md">
          <CardContent className="p-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-blue-500"></div>
                <span>Personal</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-purple-500"></div>
                <span>Skills</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-green-500"></div>
                <span>Experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-yellow-500"></div>
                <span>Achievements</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main 3D Space */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          rotateY: rotationY,
          y: floatingY
        }}
      >
        
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          {Object.values(nodes).map(node => (
            node.connections.map(connectionId => {
              const connectedNode = nodes[connectionId];
              if (!connectedNode) return null;
              
              const startX = window.innerWidth / 2 + node.position.x;
              const startY = window.innerHeight / 2 + node.position.y;
              const endX = window.innerWidth / 2 + connectedNode.position.x;
              const endY = window.innerHeight / 2 + connectedNode.position.y;
              
              return (
                <motion.line
                  key={`${node.id}-${connectionId}`}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: 1,
                    opacity: getConnectionOpacity(node.id)
                  }}
                  transition={{ duration: 0.5 }}
                />
              );
            })
          ))}
        </svg>

        {/* Floating Nodes */}
        {Object.values(nodes).map(node => (
          <motion.div
            key={node.id}
            className="absolute cursor-pointer"
            style={{
              left: `calc(50% + ${node.position.x}px)`,
              top: `calc(50% + ${node.position.y}px)`,
              transform: `translateZ(${node.position.z}px)`,
              zIndex: node.id === 'center' ? 10 : 5,
            }}
            animate={{
              scale: getNodeScale(node.id),
              rotateY: node.id === 'center' ? [0, 360] : 0,
            }}
            transition={{
              scale: { type: "spring", stiffness: 300, damping: 30 },
              rotateY: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
            onHoverStart={() => setHoveredNode(node.id)}
            onHoverEnd={() => setHoveredNode('')}
            onClick={() => setActiveNode(node.id)}
          >
            
            {/* Node Card */}
            <Card className={`bg-gradient-to-br ${getCategoryColor(node.category)} border-white/30 shadow-2xl`}>
              <CardContent className="p-6 text-center min-w-[200px]">
                
                {/* Avatar for center node */}
                {node.id === 'center' && (
                  <Avatar className="w-16 h-16 mx-auto mb-4 ring-4 ring-white/50">
                    <AvatarImage src="/roy-avatar.jpg" alt="Roy M. Lucier" />
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-lg font-bold">RL</AvatarFallback>
                  </Avatar>
                )}
                
                {/* Icon for other nodes */}
                {node.id !== 'center' && (
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-white/20 rounded-full">
                      {node.icon}
                    </div>
                  </div>
                )}
                
                <h3 className="font-bold text-lg mb-2">{node.title}</h3>
                <p className="text-sm opacity-90 mb-4">{node.description}</p>
                
                {/* Node-specific data */}
                {node.data && (
                  <div className="space-y-2">
                    {node.data.metric && (
                      <div>
                        <div className="text-2xl font-bold text-yellow-300">
                          {node.data.metric}
                        </div>
                        <div className="text-xs opacity-80">
                          {node.data.label}
                        </div>
                      </div>
                    )}
                    
                    {node.data.phone && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span className="text-sm">{node.data.phone}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span className="text-xs break-all">{node.data.email}</span>
                        </div>
                      </div>
                    )}
                    
                    {node.data.status && (
                      <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                        {node.data.status}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Floating indicators */}
            {node.id === activeNode && (
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Info Panel */}
      {activeNode && nodes[activeNode] && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-40"
        >
          <Card className="bg-white/10 border-white/20 backdrop-blur-md max-w-md">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold">Active: {nodes[activeNode].title}</span>
              </div>
              
              {nodes[activeNode].data?.details && (
                <p className="text-sm text-white/80 mb-4">
                  {nodes[activeNode].data.details}
                </p>
              )}
              
              <div className="flex justify-center space-x-2">
                <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <a href="/experience">View Details</a>
                </Button>
                {activeNode === 'contact' && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <a href="tel:313.820.5831">Call Now</a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-6 right-6 z-40">
        <Card className="bg-white/10 border-white/20 backdrop-blur-md">
          <CardContent className="p-4">
            <div className="text-xs space-y-1 text-white/60">
              <div>• Click nodes to explore</div>
              <div>• Scroll to rotate view</div>
              <div>• Hover for details</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}