"use client"

import type React from "react"
import Image from "next/image"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { useRef, useState } from "react"

const projects = [
  {
    id: 1,
    title: "Raihan-gold - Website Jual Beli Emas Antam",
    category: "Web App",
    description: "Modern shopping experience with Next.js",
    size: "large",
    image: "/tes-project.png",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 2,
    title: "Movera - Remove",
    category: "Web App",
    description: "Analytics platform with real-time data",
    size: "medium",
    image: "/tes-project.png",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 3,
    title: "Pantauin - trackering worker",
    category: "web App",
    description: "Minimalist portfolio with Framer Motion",
    size: "medium",
    image: "/tes-project.png",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 4,
    title: "Convertin - Convert APP",
    category: "website",
    description: "Cross-platform fitness tracking app",
    size: "small",
    image: "/tes-project.png",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 5,
    title: "Karang Taruna - Website Organization",
    category: "website",
    description: "Reusable components for enterprise",
    size: "small",
    image: "/tes-project.png",
    github: "https://github.com",
    live: "https://example.com",
  },
]

function ProjectCard({ 
  project, 
  isHovered, 
  onHover,
  onHoverEnd 
}: { 
  project: (typeof projects)[0]
  isHovered: number | null
  onHover: (id: number) => void
  onHoverEnd: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXPos = e.clientX - rect.left
    const mouseYPos = e.clientY - rect.top

    const xPct = mouseXPos / width - 0.5
    const yPct = mouseYPos / height - 0.5

    mouseX.set(xPct)
    mouseY.set(yPct)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    onHoverEnd()
  }

  const isCurrentHovered = isHovered === project.id
  const hasHoveredCard = isHovered !== null

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => onHover(project.id)}
      onClick={() => window.open(project.live, "_blank")}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={{
        scale: isCurrentHovered ? 1.05 : hasHoveredCard ? 0.95 : 1,
        opacity: isCurrentHovered ? 1 : hasHoveredCard ? 0.5 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="group relative rounded-2xl p-8 min-h-[320px] flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Glowing Border Gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/20 via-accent/10 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Animated Border Glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent"
        animate={{
          boxShadow: [
            "inset 0 0 20px rgba(var(--accent-rgb), 0.1)",
            "inset 0 0 40px rgba(var(--accent-rgb), 0.3)",
            "inset 0 0 20px rgba(var(--accent-rgb), 0.1)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          borderColor: "rgba(var(--accent-rgb), 0.6)",
          pointerEvents: "none",
        }}
      />

      {/* Card Background */}
      <div className="absolute inset-0 bg-card rounded-2xl opacity-95" />

      {/* Project Image */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-300"
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="text-xs font-medium text-accent mb-3 tracking-wide uppercase">{project.category}</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1">{project.description}</p>
      </div>

      <div className="relative z-10 flex items-center justify-between mt-6 pt-6 border-t border-accent/20 group-hover:border-accent/40 transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          View Project
          <motion.div animate={{ x: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ExternalLink className="w-4 h-4" />
          </motion.div>
        </motion.div>

        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          whileHover={{ scale: 1.15 }}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-9 h-9 rounded-full border-2 border-accent/30 hover:border-accent/70 hover:bg-accent/10 flex items-center justify-center text-accent hover:shadow-lg hover:shadow-accent/20"
        >
          <Github className="w-4 h-4" />
        </motion.a>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="work" className="py-32 px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
            A collection of projects showcasing technical excellence and creative design
          </p>
        </motion.div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`
                ${
                  project.size === "large"
                    ? "sm:col-span-2 lg:col-span-2 lg:row-span-2"
                    : project.size === "medium"
                      ? "sm:col-span-1 lg:col-span-1 lg:row-span-2"
                      : "sm:col-span-1"
                }
              `}
            >
              <ProjectCard 
                project={project} 
                isHovered={hoveredId}
                onHover={setHoveredId}
                onHoverEnd={() => setHoveredId(null)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
