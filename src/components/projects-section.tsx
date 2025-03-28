"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  category: string
  liveUrl: string
  githubUrl: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured online store with cart functionality, user authentication, and payment processing.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "fullstack",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A productivity application for organizing tasks with drag-and-drop functionality and team collaboration features.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Firebase", "Tailwind CSS"],
    category: "frontend",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Real-time Chat Application",
    description:
      "A messaging platform with real-time updates, user presence indicators, and file sharing capabilities.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Socket.io", "Express", "MongoDB"],
    category: "fullstack",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Content Management System",
    description: "A custom CMS for managing digital content with role-based access control and a WYSIWYG editor.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "GraphQL", "PostgreSQL"],
    category: "fullstack",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description: "A weather visualization tool that displays current conditions and forecasts using external API data.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["JavaScript", "Chart.js", "Weather API"],
    category: "frontend",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "RESTful API Service",
    description:
      "A backend service providing data endpoints with authentication, rate limiting, and comprehensive documentation.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Node.js", "Express", "MongoDB", "Swagger"],
    category: "backend",
    liveUrl: "#",
    githubUrl: "#",
  },
]

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredProjects = activeTab === "all" ? projects : projects.filter((project) => project.category === activeTab)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="projects" className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A collection of my recent work showcasing my skills and experience in building digital products.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full max-w-3xl mx-auto mb-12">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
              All
            </TabsTrigger>
            <TabsTrigger value="frontend" onClick={() => setActiveTab("frontend")}>
              Frontend
            </TabsTrigger>
            <TabsTrigger value="backend" onClick={() => setActiveTab("backend")}>
              Backend
            </TabsTrigger>
            <TabsTrigger value="fullstack" onClick={() => setActiveTab("fullstack")}>
              Full Stack
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-16">
          <Button size="lg" variant="outline" className="group">
            View All Projects
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden group h-full flex flex-col">
      <div className="relative overflow-hidden aspect-video">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardContent className="flex-1 flex flex-col p-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mt-auto pt-4 border-t">
          <Button variant="ghost" size="sm" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              Code
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Demo
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

