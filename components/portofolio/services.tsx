"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Code2, Palette, Rocket, Sparkles } from "lucide-react"
import { useRef } from "react"

const services = [
  {
    icon: Code2,
    title: "Frontend Development",
    description: "Building scalable React applications with modern frameworks and best practices.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Crafting beautiful, intuitive interfaces that users love to interact with.",
  },
  {
    icon: Rocket,
    title: "Performance Optimization",
    description: "Ensuring lightning-fast load times and smooth user experiences.",
  },
  {
    icon: Sparkles,
    title: "Motion Design",
    description: "Adding delightful micro-interactions and animations that bring sites to life.",
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

  return (
    <section id="services" className="py-32 px-6 lg:px-8 relative overflow-hidden" ref={sectionRef}>
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"
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
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              className="group relative p-8 rounded-2xl border-2 border-accent/20 bg-card hover:bg-gradient-to-br hover:from-secondary/30 hover:to-secondary/10 hover:border-accent/60 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl hover:shadow-accent/20"
              style={{ transformStyle: "preserve-3d" }}
              whileHover={{
                y: -10,
              }}
            >
              {/* Shine effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
                style={{ pointerEvents: "none" }}
              />

              <motion.div
                className="w-12 h-12 rounded-xl border-2 border-accent/30 bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-6 group-hover:border-accent/70 group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-300"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <service.icon className="w-6 h-6 text-accent" />
              </motion.div>

              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
