"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const certificates = [
  {
    id: 1,
    title: "React Advanced Patterns",
    issuer: "Frontend Masters",
    date: "2024",
    icon: "🏆",
    description: "Mastered advanced React patterns including render props, custom hooks, and compound components for scalable applications.",
  },
  {
    id: 2,
    title: "Next.js Full Stack",
    issuer: "Vercel",
    date: "2024",
    icon: "⚡",
    description: "Comprehensive training on Next.js 14+ covering App Router, Server Components, and full-stack development.",
  },
  {
    id: 3,
    title: "TypeScript Expert",
    issuer: "Scrimba",
    date: "2023",
    icon: "📘",
    description: "Deep dive into TypeScript covering advanced types, generics, and design patterns for enterprise applications.",
  },
  {
    id: 4,
    title: "Web Performance",
    issuer: "Google",
    date: "2023",
    icon: "⚙️",
    description: "Learned optimization techniques for web performance including Core Web Vitals and modern performance metrics.",
  },
  {
    id: 5,
    title: "UI/UX Design",
    issuer: "Interaction Design Foundation",
    date: "2023",
    icon: "🎨",
    description: "Understanding user-centered design principles and creating engaging digital experiences.",
  },
  {
    id: 6,
    title: "Cloud Architecture",
    issuer: "AWS",
    date: "2023",
    icon: "☁️",
    description: "Professional cloud architecture design on AWS with a focus on scalability and security.",
  },
]

export function Certificates() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % certificates.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoPlay])

  const next = () => {
    setCurrent((prev) => (prev + 1) % certificates.length)
    setAutoPlay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + certificates.length) % certificates.length)
    setAutoPlay(false)
  }

  const cert = certificates[current]

  return (
    <section id="certificates" className="py-32 px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Certificates & Achievements</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
            Professional certifications and achievements
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative min-h-[500px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={cert.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full"
            >
              {/* Left Side - Description */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-col justify-center space-y-6"
              >
                <div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="text-7xl mb-4"
                  >
                    {cert.icon}
                  </motion.div>

                  <div className="space-y-2">
                    <p className="text-accent font-semibold tracking-wide uppercase text-sm">
                      {cert.issuer}
                    </p>
                    <h3 className="text-4xl font-bold">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground">{cert.date}</p>
                  </div>
                </div>

                <p className="text-foreground/80 text-lg leading-relaxed">
                  {cert.description}
                </p>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-6 pt-4">
                  <motion.button
                    onClick={prev}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full border-2 border-accent/30 flex items-center justify-center text-accent hover:bg-accent/10 hover:border-accent/70 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
                    title="Previous certificate"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>

                  {/* Progress Indicator */}
                  <div className="flex gap-3 flex-1">
                    {certificates.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => {
                          setCurrent(index)
                          setAutoPlay(false)
                        }}
                        animate={{
                          width: index === current ? 32 : 8,
                          backgroundColor:
                            index === current ? "rgb(var(--accent))" : "rgb(var(--accent) / 0.3)",
                        }}
                        transition={{ duration: 0.3 }}
                        className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                          index === current ? "shadow-md shadow-accent/30" : "hover:bg-accent/50"
                        }`}
                      />
                    ))}
                  </div>

                  <motion.button
                    onClick={next}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full border-2 border-accent/30 flex items-center justify-center text-accent hover:bg-accent/10 hover:border-accent/70 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
                    title="Next certificate"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Right Side - Visual Card */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-sm">
                  <div className="relative group">
                    {/* Glowing background */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

                    {/* Card */}
                    <div className="relative bg-card border-2 border-accent/30 rounded-2xl p-8 min-h-[400px] flex flex-col items-center justify-center space-y-6 hover:border-accent/70 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 shadow-lg">
                      {/* Background Icon */}
                      <motion.div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-10 pointer-events-none"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {cert.icon}
                      </motion.div>

                      {/* Shine effect */}
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Text overlay - Prominent */}
                      <div className="text-center space-y-4 relative z-20">
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                          className="text-7xl"
                        >
                          {cert.icon}
                        </motion.div>
                        <div className="space-y-2">
                          <p className="text-sm text-accent font-semibold tracking-wide uppercase">Certified</p>
                          <p className="text-3xl font-bold text-foreground">{cert.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Auto-play indicator */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent"
            animate={{
              scaleX: [0, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </div>
    </section>
  )
}
