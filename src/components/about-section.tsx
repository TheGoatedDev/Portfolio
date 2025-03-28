"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Download, Calendar, Briefcase, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Learn more about my journey, experience, and the passion that drives me as a developer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="relative h-[450px] w-full rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=900&width=600"
                alt="Profile Photo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 h-48 w-48 bg-primary/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -top-6 -left-6 h-48 w-48 bg-secondary/10 rounded-full filter blur-3xl"></div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-4">My Story</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Hello! I'm Thomas Burridge, a passionate Full Stack Developer with a strong focus on creating elegant,
                  efficient, and user-friendly web applications. With over 5 years of experience in the industry, I've
                  had the opportunity to work on a diverse range of projects that have sharpened my skills and broadened
                  my perspective.
                </p>
                <p>
                  My journey in web development began during my university years when I built my first website. What
                  started as curiosity quickly evolved into a passion, leading me to pursue a career in this
                  ever-evolving field. I'm constantly learning and adapting to new technologies to stay at the forefront
                  of web development.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new hiking trails, experimenting with photography, or
                  contributing to open-source projects. I believe in the power of technology to solve real-world
                  problems and am always excited to take on new challenges.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Tabs defaultValue="experience">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="interests">Interests</TabsTrigger>
                </TabsList>
                <TabsContent value="experience" className="space-y-4 mt-6">
                  <TimelineItem
                    icon={<Briefcase className="h-5 w-5" />}
                    title="Senior Frontend Developer"
                    organization="Tech Company Inc."
                    period="2021 - Present"
                    description="Leading the frontend development team, implementing new features, and optimizing performance for a SaaS platform with over 100,000 users."
                  />
                  <TimelineItem
                    icon={<Briefcase className="h-5 w-5" />}
                    title="Full Stack Developer"
                    organization="Digital Agency Ltd."
                    period="2018 - 2021"
                    description="Developed and maintained multiple client websites and web applications using React, Node.js, and various database technologies."
                  />
                  <TimelineItem
                    icon={<Briefcase className="h-5 w-5" />}
                    title="Junior Web Developer"
                    organization="Startup Hub"
                    period="2016 - 2018"
                    description="Collaborated with the design team to implement responsive web designs and interactive features for client websites."
                  />
                </TabsContent>
                <TabsContent value="education" className="space-y-4 mt-6">
                  <TimelineItem
                    icon={<GraduationCap className="h-5 w-5" />}
                    title="Master's in Computer Science"
                    organization="University Name"
                    period="2014 - 2016"
                    description="Specialized in web technologies and software engineering. Graduated with honors."
                  />
                  <TimelineItem
                    icon={<GraduationCap className="h-5 w-5" />}
                    title="Bachelor's in Information Technology"
                    organization="University Name"
                    period="2010 - 2014"
                    description="Focused on programming fundamentals, data structures, and web development basics."
                  />
                </TabsContent>
                <TabsContent value="interests" className="space-y-4 mt-6">
                  <p className="text-muted-foreground">
                    Beyond coding, I'm passionate about photography, hiking, and exploring new technologies. I enjoy
                    contributing to open-source projects and attending tech conferences to stay connected with the
                    developer community.
                  </p>
                  <p className="text-muted-foreground">
                    I'm also an avid reader of tech blogs and books on software architecture and design patterns.
                    Continuous learning is a core part of who I am, both professionally and personally.
                  </p>
                </TabsContent>
              </Tabs>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button className="group">
                Download Resume
                <Download className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({
  icon,
  title,
  organization,
  period,
  description,
}: {
  icon: React.ReactNode
  title: string
  organization: string
  period: string
  description: string
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            {icon}
          </div>
          <div className="space-y-1">
            <h4 className="font-bold">{title}</h4>
            <div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span>{organization}</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {period}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

