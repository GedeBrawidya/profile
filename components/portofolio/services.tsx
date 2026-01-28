"use client"

import { motion } from "framer-motion"
import { Code2, Palette, Rocket, Sparkles } from "lucide-react"

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
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function Services() {
  return (
    <section id="services" className="py-32 px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
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
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              className="group relative p-8 rounded-2xl border border-[#E5E1D8] dark:border-zinc-700/50 bg-card hover:bg-secondary/20 hover:border-accent/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl border border-[#E5E1D8] dark:border-zinc-700/50 bg-secondary/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-accent/50 transition-all">
                <service.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
