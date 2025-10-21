'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Play, Image, FileText, Award } from 'lucide-react';

interface MediaContent {
  type: 'video' | 'image' | 'document';
  url: string;
  title: string;
  description?: string;
}

interface AnimatedCardProps {
  id: string;
  title: string;
  description: string;
  icon?: string;
  content: string;
  skills?: string[];
  achievements?: string[];
  media?: MediaContent[];
  expandedContent?: React.ReactNode;
  className?: string;
  onExpand?: (id: string) => void;
  isExpanded?: boolean;
  layoutId?: string;
}

export default function AnimatedCard({
  id,
  title,
  description,
  icon,
  content,
  skills = [],
  achievements = [],
  media = [],
  expandedContent,
  className = "",
  onExpand,
  isExpanded = false,
  layoutId
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onExpand?.(id);
  };

  const cardVariants = {
    initial: { 
      scale: 1, 
      y: 0,
      zIndex: 1
    },
    hover: { 
      scale: 1.03, 
      y: -8,
      zIndex: 10,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    },
    expanded: {
      scale: 1.05,
      zIndex: 50,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 25 
      }
    }
  };

  const contentVariants = {
    collapsed: {
      height: "auto",
      opacity: 1
    },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3 },
        opacity: { delay: 0.1, duration: 0.3 }
      }
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
    <>
      <motion.div
        layoutId={layoutId}
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        animate={isExpanded ? "expanded" : "initial"}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`cursor-pointer relative ${className}`}
        onClick={handleClick}
      >
        <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="relative">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <CardTitle className="flex items-center gap-3 text-lg">
                {icon && <span className="text-2xl">{icon}</span>}
                {title}
              </CardTitle>
              <CardDescription className="mt-2">
                {description}
              </CardDescription>
            </motion.div>
            
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-2 text-xs"
              >
                Click to explore
              </motion.div>
            )}
          </CardHeader>

          <CardContent>
            <motion.div
              variants={contentVariants}
              animate={isExpanded ? "expanded" : "collapsed"}
            >
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {content}
              </p>

              {/* Skills */}
              {skills.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4"
                >
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
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
                  </div>
                </motion.div>
              )}

              {/* Media Preview */}
              {media.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-4"
                >
                  <div className="flex gap-2 flex-wrap">
                    {media.slice(0, 3).map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-1 text-xs text-muted-foreground bg-muted rounded px-2 py-1"
                      >
                        <MediaIcon type={item.type} />
                        <span>{item.title}</span>
                      </motion.div>
                    ))}
                    {media.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{media.length - 3} more
                      </Badge>
                    )}
                  </div>
                </motion.div>
              )}

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" size="sm" className="w-full">
                  {isExpanded ? "View Details" : "Learn More"} →
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Expanded Modal Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4"
            onClick={() => onExpand?.('')}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      {icon && <span className="text-3xl">{icon}</span>}
                      {title}
                    </h2>
                    <p className="text-muted-foreground mt-2">{description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onExpand?.('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-muted-foreground leading-relaxed">
                      {content}
                    </p>
                  </div>

                  {/* Achievements */}
                  {achievements.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Key Achievements</h3>
                      <ul className="space-y-2">
                        {achievements.map((achievement, index) => (
                          <motion.li
                            key={index}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 * index }}
                            className="flex items-start gap-2"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {achievement}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills */}
                  {skills.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Core Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * index }}
                          >
                            <Badge variant="secondary">{skill}</Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Media Content */}
                  {media.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Related Content</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {media.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * index }}
                            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <MediaIcon type={item.type} />
                              <h4 className="font-medium">{item.title}</h4>
                            </div>
                            {item.description && (
                              <p className="text-sm text-muted-foreground mb-3">
                                {item.description}
                              </p>
                            )}
                            <Button size="sm" variant="outline">
                              {item.type === 'video' ? 'Watch' : 
                               item.type === 'image' ? 'View' : 'Read'} →
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Custom Expanded Content */}
                  {expandedContent && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {expandedContent}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}