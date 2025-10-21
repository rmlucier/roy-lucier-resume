'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Linkedin, MapPin } from "lucide-react";
import FluidCard from "@/components/interactive/FluidCard";
import detailedContent from "@/data/detailed-content.json";

export default function Home() {
  const [expandedCard, setExpandedCard] = useState<string>('');
  const [hoveredMetric, setHoveredMetric] = useState<string>('');

  const handleCardExpand = (cardId: string) => {
    setExpandedCard(cardId === expandedCard ? '' : cardId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      {/* Fluid Grid Layout */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-min gap-4 max-w-7xl mx-auto"
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        
        {/* Hero Name Card */}
        <FluidCard
          id="hero-name"
          title="Roy M. Lucier"
          description="Executive Ministry Leader | Lead Pastor | Coach"
          content="Executive-level ministry leader with 20+ years building generationally diverse churches and leading multi-million dollar operations."
          cardType="header"
          size="hero"
          onExpand={handleCardExpand}
          isExpanded={expandedCard === 'hero-name'}
        >
          <div className="flex flex-col items-center space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "tween", duration: 0.2 }}
              className="relative"
            >
              <Avatar className="w-20 h-20 mx-auto ring-4 ring-blue-100 dark:ring-blue-900">
                <AvatarImage src="/roy-avatar.jpg" alt="Roy M. Lucier" />
                <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-700">RL</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
            </motion.div>
            <div className="text-center space-y-2">
              <p className="text-muted-foreground leading-relaxed">
                Proven track record of revitalizing congregations and providing strategic oversight for sustainable growth.
              </p>
              <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                Available for Lead Pastor roles • Michigan & Northern Ohio
              </div>
            </div>
          </div>
        </FluidCard>

        {/* Contact Info Cards */}
        <FluidCard
          id="contact-phone"
          title="Phone"
          content="Direct line for ministry opportunities and consultation"
          cardType="contact"
          size="small"
          onExpand={handleCardExpand}
          isExpanded={expandedCard === 'contact-phone'}
        >
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">Call or Text</div>
            <a href="tel:313.820.5831" className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              313.820.5831
            </a>
          </div>
        </FluidCard>

        <FluidCard
          id="contact-email"
          title="Email"
          content="Primary contact for ministry inquiries and professional correspondence"
          cardType="contact"
          size="small"
          onExpand={handleCardExpand}
          isExpanded={expandedCard === 'contact-email'}
        >
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">Primary Contact</div>
            <a href="mailto:Rmlucier@gmail.com" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors break-all">
              Rmlucier@gmail.com
            </a>
          </div>
        </FluidCard>

        <FluidCard
          id="contact-linkedin"
          title="LinkedIn"
          content="Professional network profile with recommendations and ministry connections"
          cardType="contact"
          size="small"
          onExpand={handleCardExpand}
          isExpanded={expandedCard === 'contact-linkedin'}
        >
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">Professional Network</div>
            <a 
              href="https://www.linkedin.com/in/roy-l-18a88964/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              View Profile
            </a>
          </div>
        </FluidCard>

        <FluidCard
          id="contact-location"
          title="Location"
          content="Open to opportunities in Michigan and Northern Ohio regions"
          cardType="contact"
          size="small"
          onExpand={handleCardExpand}
          isExpanded={expandedCard === 'contact-location'}
        >
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">Preferred Regions</div>
            <div className="text-sm font-semibold">Michigan | Northern Ohio</div>
          </div>
        </FluidCard>

        {/* Navigation Buttons */}
        <FluidCard
          id="nav-experience"
          title="Professional Journey"
          content="Explore my complete professional timeline with detailed experience and achievements"
          cardType="contact"
          size="medium"
          onExpand={handleCardExpand}
          isExpanded={expandedCard === 'nav-experience'}
        >
          <div className="text-center space-y-3">
            <div className="text-sm text-muted-foreground">Detailed Timeline</div>
            <Button size="lg" asChild className="w-full">
              <a href="/experience">View Experience</a>
            </Button>
          </div>
        </FluidCard>

        {/* Key Metrics Cards */}
        <FluidCard
          id="metric-growth"
          title="150%"
          description="Congregational Growth"
          content="Doubled attendance from 30 to 75 at Freeway Church through strategic discipleship pathways and compelling preaching. Implemented clear growth systems resulting in sustained attendance increases over 3+ years."
          cardType="metric"
          size="small"
          onExpand={handleCardExpand}
          isExpanded={expandedCard === 'metric-growth'}
        />

        <FluidCard
          id="metric-budget"
          title="$2M+"
          description="Budget Management"
          content="Strategic oversight of multi-million dollar annual budgets with consistent surplus performance and optimized resource allocation. Managed complex financial operations while maintaining program quality and organizational health."
          cardType="metric"
          size="small"
          onExpand={handleCardExpand}
          isExpanded={expandedCard === 'metric-budget'}
        />

        <FluidCard
          id="metric-staff"
          title="15"
          description="Staff Leadership"
          content="Direct leadership and development of 15-person ministry teams using coaching frameworks and strategic alignment processes. Achieved 95% retention rate while improving team effectiveness by 40%."
          cardType="metric"
          size="small"
          onExpand={handleCardExpand}
          isExpanded={expandedCard === 'metric-staff'}
        />

        <FluidCard
          id="metric-experience"
          title="14+"
          description="Years Experience"
          content="Progressive ministry leadership from Youth Pastor to Executive Pastor to Lead Pastor across multiple states and church contexts. Consistent track record of growth and organizational development."
          cardType="metric"
          size="small"
          onExpand={handleCardExpand}
          isExpanded={expandedCard === 'metric-experience'}
        />

        {/* Core Competency Cards */}
        {Object.entries(detailedContent).map(([key, content]) => (
          <FluidCard
            key={key}
            id={key}
            title={content.title}
            description={content.description}
            icon={content.icon}
            content={content.content}
            skills={content.skills}
            achievements={content.achievements}
            media={content.media}
            cardType="skill"
            size="medium"
            onExpand={handleCardExpand}
            isExpanded={expandedCard === key}
          />
        ))}

        {/* Vision Statement Card */}
        <FluidCard
          id="vision"
          title="🎯 Looking Forward"
          content="I am seeking a long-term Lead Pastor position in Michigan or Northern Ohio where I can invest the next 20 years of my ministry, building a generationally diverse church and leading it to make a lasting impact on its community. My experience in an 800-member church has prepared me to provide the robust, vision-driven leadership required for a congregation of 800-1200."
          cardType="vision"
          size="large"
          onExpand={handleCardExpand}
          isExpanded={expandedCard === 'vision'}
        />

        {/* Status Card */}
        <FluidCard
          id="status"
          title="✨ Interactive Portfolio"
          content="This dynamic showcase demonstrates 14+ years of executive ministry leadership through an engaging, discoverable interface."
          cardType="contact"
          size="small"
          onExpand={handleCardExpand}
          isExpanded={expandedCard === 'status'}
        />

      </motion.div>
    </div>
  );
}
