"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Code2, Palette, Rocket, Sparkles, Database, Smartphone, Globe, Zap } from "lucide-react"
import { useRef } from "react"

const services = [
  {
    icon: Code2,
    title: "Frontend Development",
    description: "Building scalable React, Next.js, and TypeScript applications with modern architecture. Focus on component reusability, state management, and clean code principles.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Crafting beautiful, intuitive interfaces that users love. Converting Figma designs to pixel-perfect implementations with accessibility in mind.",
    tools: ["Figma", "Framer Motion", "CSS3", "Design Systems"]
  },
  {
    icon: Rocket,
    title: "Performance Optimization",
    description: "Ensuring lightning-fast load times through code splitting, lazy loading, image optimization, and efficient rendering strategies.",
    tools: ["Lighthouse", "Web Vitals", "Bundle Analysis", "SSR/SSG"]
  },
  {
    icon: Sparkles,
    title: "Motion Design",
    description: "Adding delightful micro-interactions and smooth animations that enhance user experience and bring interfaces to life.",
    tools: ["Framer Motion", "GSAP", "CSS Animations", "Three.js"]
  },
  {
    icon: Database,
    title: "Backend Integration",
    description: "Seamless API integration with REST and GraphQL. Experience with modern backend frameworks and database management.",
    tools: ["Laravel", "Node.js", "Supabase", "PostgreSQL"]
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Creating mobile-first, fully responsive applications that work flawlessly across all devices and screen sizes.",
    tools: ["Mobile-First", "Progressive Web Apps", "Cross-Browser", "Adaptive UI"]
  },
  {
    icon: Globe,
    title: "Full-Stack Development",
    description: "End-to-end application development from database design to deployment, handling both frontend and backend architecture.",
    tools: ["React + Laravel", "Next.js API", "Vercel", "Docker"]
  },
  {
    icon: Zap,
    title: "Rapid Prototyping",
    description: "Quick turnaround on MVP development and proof-of-concepts. Transforming ideas into working prototypes efficiently.",
    tools: ["Rapid Development", "Agile", "CI/CD", "Git Workflow"]
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 40, rotateX: -20 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    }
  },
} as const

export function Services() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const backgroundX = useTransform(scrollYProgress, [0, 1], [-50, 50])

  return (
    <section id="services" className="py-32 px-6 lg:px-8 relative overflow-hidden" ref={sectionRef}>
      {/* Animated Background with dual movement */}
      <motion.div
        style={{ y: backgroundY, x: backgroundX }}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        className="absolute bottom-0 right-0 w-64 h-64 bg-accent/3 rounded-full blur-3xl pointer-events-none"
      />

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

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 perspective"
          style={{ perspective: "1200px" }}
        >
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              variants={item}
              className="group relative p-6 rounded-2xl border-2 border-accent/20 bg-card hover:bg-gradient-to-br hover:from-secondary/30 hover:to-secondary/10 hover:border-accent/60 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl hover:shadow-accent/20 flex flex-col"
              style={{ transformStyle: "preserve-3d" }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                y: {
                  duration: 3 + idx * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.4,
                },
              }}
              whileHover={{
                y: -15,
                transition: { duration: 0.3 }
              }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ backgroundSize: "200% 200%" }}
              />

              {/* Shine effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
                style={{ pointerEvents: "none" }}
              />

              <motion.div
                className="w-12 h-12 rounded-xl border-2 border-accent/30 bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-4 group-hover:border-accent/70 group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-300 relative z-10"
                whileHover={{ scale: 1.2, rotate: 10 }}
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  rotate: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.5,
                  },
                  scale: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                <service.icon className="w-6 h-6 text-accent" />
              </motion.div>

              <h3 className="text-lg font-bold mb-2 relative z-10">{service.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed relative z-10 mb-4 flex-grow">{service.description}</p>

              {/* Tools/Technologies */}
              <div className="relative z-10 flex flex-wrap gap-1.5 mt-auto">
                {service.tools.map((tool, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + (idx * 0.1) + (i * 0.05) }}
                    className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-medium rounded-md border border-accent/20 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
