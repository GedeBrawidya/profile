"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Palette, Rocket, Sparkles, Database, Smartphone, Globe, Zap, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFigma, SiFramer, SiLaravel, SiNodedotjs, SiPostgresql, SiSupabase } from "react-icons/si"

const services = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Crafting beautiful, intuitive interfaces that users love. Converting Figma designs to pixel-perfect implementations with accessibility in mind.",
    tech: [
      { name: "Figma", icon: SiFigma },
      { name: "Framer Motion", icon: SiFramer },
      { name: "CSS3", icon: null },
      { name: "Design Systems", icon: null }
    ],
    projects: ["Raihan Gold", "Karang Taruna"]
  },
  {
    icon: Sparkles,
    title: "Motion Design",
    description: "Adding delightful micro-interactions and smooth animations that enhance user experience and bring interfaces to life.",
    tech: [
      { name: "Framer Motion", icon: SiFramer },
      { name: "GSAP", icon: null },
      { name: "CSS Animations", icon: null },
      { name: "Three.js", icon: null }
    ],
    projects: ["Raihan Gold", "Movera"]
  },
  {
    icon: Database,
    title: "Backend Integration",
    description: "Seamless API integration with REST and GraphQL. Experience with modern backend frameworks and database management.",
    tech: [
      { name: "Laravel", icon: SiLaravel },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Supabase", icon: SiSupabase },
      { name: "PostgreSQL", icon: SiPostgresql }
    ],
    projects: ["Pantauin", "Convertin"]
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Creating mobile-first, fully responsive applications that work flawlessly across all devices and screen sizes.",
    tech: [
      { name: "Mobile-First", icon: null },
      { name: "Progressive Web Apps", icon: null },
      { name: "Cross-Browser", icon: null },
      { name: "Adaptive UI", icon: null }
    ],
    projects: ["Karang Taruna", "Raihan Gold"]
  },
  {
    icon: Globe,
    title: "Full-Stack Development",
    description: "End-to-end application development from database design to deployment, handling both frontend and backend architecture.",
    tech: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "Laravel", icon: SiLaravel },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "PostgreSQL", icon: SiPostgresql }
    ],
    projects: ["Raihan Gold", "Pantauin"]
  },
  {
    icon: Rocket,
    title: "Performance Optimization",
    description: "Ensuring lightning-fast load times through code splitting, lazy loading, image optimization, and efficient rendering strategies.",
    tech: [
      { name: "Lighthouse", icon: null },
      { name: "Web Vitals", icon: null },
      { name: "Bundle Analysis", icon: null },
      { name: "SSR/SSG", icon: null }
    ],
    projects: ["Movera", "Karang Taruna"]
  },
  {
    icon: Zap,
    title: "Rapid Prototyping",
    description: "Quick turnaround on MVP development and proof-of-concepts. Transforming ideas into working prototypes efficiently.",
    tech: [
      { name: "Rapid Development", icon: null },
      { name: "Agile", icon: null },
      { name: "CI/CD", icon: null },
      { name: "Git Workflow", icon: null }
    ],
    projects: ["Convertin", "Movera"]
  },
]

export function Services() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      nextSlide()
    }, 4000)
  }

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
  }

  useEffect(() => {
    startTimer()
    return () => stopTimer()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length)
    startTimer()
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length)
    startTimer()
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    startTimer()
  }

  const handleProjectClick = (projectName: string) => {
    const projectId = `project-${projectName.toLowerCase().replace(/\s+/g, '-')}`
    const projectElement = document.getElementById(projectId)

    if (projectElement) {
      projectElement.scrollIntoView({ behavior: "smooth", block: "center" })
      // Add a temporary highlight effect
      projectElement.style.transition = "transform 0.5s ease"
      projectElement.style.transform = "scale(1.02)"
      setTimeout(() => {
        projectElement.style.transform = ""
      }, 1000)
    } else {
      const projectsSection = document.getElementById("projects")
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <section id="services" className="py-32 px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">What I Do</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
            Specialized services to bring your digital vision to life
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto px-4 md:px-12">
          {/* Main Slide */}
          <div
            className="relative h-[600px] md:h-[500px] overflow-hidden rounded-3xl bg-card border border-border/50 shadow-sm"
            onMouseEnter={stopTimer}
            onMouseLeave={startTimer}
          >
            <AnimatePresence mode="wait">
              {(() => {
                const currentService = services[currentSlide]
                const ServiceIcon = currentService.icon

                return (
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 p-8 md:p-12"
                  >
                    <div className="relative z-10 h-full flex flex-col">
                      {/* Icon and Title */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl border border-border bg-secondary/30 flex items-center justify-center">
                          <ServiceIcon className="w-7 h-7 text-foreground" />
                        </div>
                        <h3 className="text-2xl md:text-4xl font-bold tracking-tight">
                          {currentService.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-lg mb-8 max-w-2xl leading-relaxed">
                        {currentService.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="mb-8">
                        <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2.5">
                          {currentService.tech.map((tech, i) => {
                            const TechIcon = tech.icon
                            return (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 + i * 0.05 }}
                                className="flex items-center gap-2 px-3 py-1.5 bg-secondary/30 border border-border/50 rounded-md hover:border-accent/40 hover:bg-secondary/50 transition-all"
                              >
                                {TechIcon && <TechIcon className="w-4 h-4 text-foreground/70" />}
                                <span className="text-sm text-foreground/80">{tech.name}</span>
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Related Projects */}
                      <div className="mt-auto">
                        <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                          Related Projects
                        </h4>
                        <div className="flex flex-wrap gap-4">
                          {currentService.projects.map((project, i) => (
                            <button
                              key={i}
                              onClick={() => handleProjectClick(project)}
                              className="group flex items-center gap-1.5 text-sm font-medium text-accent hover:text-foreground transition-colors cursor-pointer"
                            >
                              <span>{project}</span>
                              <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })()}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows (Desktop Outside) */}
          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground shadow-lg items-center justify-center transition-colors z-20 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground shadow-lg items-center justify-center transition-colors z-20 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Mobile Navigation (Inside) */}
          <div className="flex md:hidden justify-between absolute top-1/2 left-6 right-6 -translate-y-1/2 pointer-events-none z-20">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-card/90 backdrop-blur border border-border text-foreground flex items-center justify-center shadow-sm pointer-events-auto active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-card/90 backdrop-blur border border-border text-foreground flex items-center justify-center shadow-sm pointer-events-auto active:scale-95 transition-transform"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide
                  ? "w-8 bg-foreground"
                  : "w-1.5 bg-border hover:bg-accent/50"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
