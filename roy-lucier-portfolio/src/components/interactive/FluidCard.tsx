'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Play, Image, FileText, Award } from 'lucide-react';

interface MediaContent {
  type: 'video' | 'image' | 'document';
  url: string;
  title: string;
  description?: string;
}

interface FluidCardProps {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  content: string;
  skills?: string[];
  achievements?: string[];
  media?: MediaContent[];
  className?: string;
  onExpand?: (id: string) => void;
  isExpanded?: boolean;
  cardType?: 'skill' | 'header' | 'metric' | 'contact' | 'vision';
  size?: 'small' | 'medium' | 'large' | 'hero';
  children?: React.ReactNode;
}

export default function FluidCard({
  id,
  title,
  description,
  icon,
  content,
  skills = [],
  achievements = [],
  media = [],
  className = "",
  onExpand,
  isExpanded = false,
  cardType = 'skill',
  size = 'medium',
  children
}: FluidCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onExpand?.(id);
  };

  const getCardSize = () => {
    if (isExpanded) {
      switch (cardType) {
        case 'skill': return 'col-span-full row-span-6';
        case 'header': return 'col-span-full row-span-4';
        case 'metric': return 'col-span-2 row-span-3';
        case 'vision': return 'col-span-full row-span-3';
        default: return 'col-span-full row-span-4';
      }
    }
    
    switch (size) {
      case 'hero': return 'col-span-full row-span-2';
      case 'large': return 'col-span-2 row-span-2';
      case 'medium': return 'col-span-2 row-span-2';
      case 'small': return 'col-span-1 row-span-1';
      default: return 'col-span-1 row-span-1';
    }
  };

  const MediaIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      default: return <Award className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      layout
      className={`${getCardSize()} ${className}`}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30,
        duration: 0.6
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ 
          y: isExpanded ? 0 : -1,
        }}
        className="h-full cursor-pointer"
        onClick={handleClick}
        transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
      >
        <Card className={`h-full overflow-hidden transition-all duration-300 relative group
          ${cardType === 'header' ? 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800' :
            cardType === 'skill' ? 'bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900 hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950/30 dark:hover:to-indigo-950/30' :
            cardType === 'metric' ? 'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50 border-green-200 dark:border-green-800' :
            cardType === 'vision' ? 'bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/50 dark:to-violet-950/50 border-purple-200 dark:border-purple-800' :
            'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900'
          }
          ${isHovered ? 'shadow-lg border-blue-300 dark:border-blue-700' : 'shadow-sm'}
          ${isExpanded ? 'shadow-xl border-blue-400 dark:border-blue-600' : ''}
        `}>
          {/* Expand/Collapse Indicator */}
          {(isHovered || isExpanded) && cardType === 'skill' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute top-4 right-4 z-10 bg-blue-600 text-white rounded-full p-1.5 shadow-sm"
            >
              {isExpanded ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </motion.div>
          )}

          <CardHeader className={`${isExpanded ? "pb-3" : "pb-4"} relative`}>
            <motion.div
              layout
              transition={{ type: "tween", duration: 0.3 }}
            >
              <CardTitle className={`font-semibold tracking-tight ${
                size === 'hero' ? 'text-2xl md:text-4xl leading-tight' : 
                size === 'large' ? 'text-xl' : 
                cardType === 'metric' ? 'text-2xl font-bold' :
                'text-lg'
              } ${cardType === 'metric' ? 'text-center' : ''}`}>
                {title}
              </CardTitle>
              {description && (
                <CardDescription className={`mt-2 font-medium ${
                  size === 'hero' ? 'text-base' : 
                  cardType === 'metric' ? 'text-sm text-center' :
                  'text-sm'
                } ${cardType === 'header' ? 'text-blue-700 dark:text-blue-300' : ''}`}>
                  {description}
                </CardDescription>
              )}
            </motion.div>
          </CardHeader>

          <CardContent className="flex-1">
            {children ? (
              <motion.div layout>
                {children}
              </motion.div>
            ) : (
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className={`text-muted-foreground leading-relaxed ${
                  isExpanded ? 'mb-6' : 'mb-4'
                } ${size === 'hero' ? 'text-lg' : 'text-sm'}`}>
                  {content}
                </p>

                {/* Expanded Content */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="space-y-6"
                  >
                    {/* Achievements */}
                    {achievements.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Key Achievements</h4>
                        <motion.ul 
                          className="space-y-3"
                          variants={{
                            hidden: {},
                            visible: {
                              transition: {
                                staggerChildren: 0.1
                              }
                            }
                          }}
                          initial="hidden"
                          animate="visible"
                        >
                          {achievements.map((achievement, index) => (
                            <motion.li
                              key={index}
                              variants={{
                                hidden: { opacity: 0, x: -20 },
                                visible: { opacity: 1, x: 0 }
                              }}
                              className="flex items-start gap-3"
                            >
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground leading-relaxed">
                                {achievement}
                              </span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Core Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, index) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.05 }}
                            >
                              <Badge variant="secondary" className="text-sm">
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Media Content */}
                    {media.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Related Content</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {media.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 + index * 0.1 }}
                              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <MediaIcon type={item.type} />
                                <h5 className="font-medium text-sm">{item.title}</h5>
                              </div>
                              {item.description && (
                                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                              <Button size="sm" variant="outline" className="text-xs">
                                {item.type === 'video' ? 'Watch' : 
                                 item.type === 'image' ? 'View' : 'Read'} →
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Skills Preview (when collapsed) */}
                {!isExpanded && skills.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {skills.slice(0, 3).map((skill, index) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          <Badge variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                      {skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                {cardType === 'skill' && !isExpanded && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      Click to expand →
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}