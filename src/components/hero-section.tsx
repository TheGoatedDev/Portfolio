"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Code, Terminal, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

export function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Full Stack Developer"
  const typingSpeed = 100

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, typingSpeed)
      return () => clearTimeout(timeout)
    }
  }, [typedText])

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
    <section className="relative min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center">
        <div className="container max-w-6xl">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 md:py-24"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-background">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                <span>Available for new projects</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Hi, I'm <span className="text-primary">Thomas Burridge</span>
              </h1>

              <div className="h-8 md:h-10">
                <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">
                  {typedText}
                  <span className="animate-blink">|</span>
                </h2>
              </div>

              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                I build exceptional digital experiences that combine elegant design with robust functionality.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="group">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline">
                  Contact Me
                </Button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative hidden lg:block">
              <div className="relative h-[450px] w-full">
                <div className="absolute top-0 right-0 h-80 w-80 bg-primary/10 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 left-0 h-60 w-60 bg-secondary/10 rounded-full filter blur-3xl"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[350px] h-[350px] rounded-xl bg-background/50 backdrop-blur-sm border shadow-lg p-6 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-muted flex items-center px-3 gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-destructive"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>

                    <div className="mt-4 font-mono text-sm">
                      <div className="text-primary">
                        const <span className="text-blue-500">developer</span> = {"{"}
                      </div>
                      <div className="pl-4">
                        name: <span className="text-green-500">'Thomas Burridge'</span>,
                      </div>
                      <div className="pl-4">
                        role: <span className="text-green-500">'Full Stack Developer'</span>,
                      </div>
                      <div className="pl-4">
                        skills: [<span className="text-green-500">'React'</span>,{" "}
                        <span className="text-green-500">'Node.js'</span>,{" "}
                        <span className="text-green-500">'TypeScript'</span>],
                      </div>
                      <div className="pl-4">
                        passion: <span className="text-green-500">'Building amazing web experiences'</span>,
                      </div>
                      <div className="pl-4">
                        status: <span className="text-green-500">'Ready to create something awesome'</span>
                      </div>
                      <div>{"}"}</div>
                    </div>

                    <div className="absolute bottom-6 right-6 flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Code className="h-5 w-5 text-primary" />
                      </div>
                      <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                        <Terminal className="h-5 w-5 text-secondary" />
                      </div>
                      <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-accent" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="flex flex-col items-center"
        >
          <div className="text-sm font-medium mb-2">Scroll Down</div>
          <div className="h-10 w-6 rounded-full border-2 flex justify-center pt-1">
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="h-2 w-2 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

