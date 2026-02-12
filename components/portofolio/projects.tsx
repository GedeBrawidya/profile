"use client"

import type React from "react"
import Image from "next/image"

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, X } from "lucide-react"
import { useRef, useState } from "react"

const projects = [
  {
    id: 1,
    title: "Raihan Gold",
    category: "Web App",
    description: "landing page for gold trading platform",
    size: "large",
    image: "/raihan-gold.png",
    github: "https://github.com/GedeBrawidya/raihan-gold.git",
    live: "https://raihan-gold-git-main-brawidyas-projects.vercel.app/",
    technologies: ["React", "Supabase", "Tailwind CSS"],
    details: "Website Jual Beli Emas Antam - Modern landing page for a gold trading platform built with React and Supabase for real-time database management.",
  },
  {
    id: 2,
    title: "Movera",
    category: "Web App",
    description: "Application to remove background from images",
    size: "medium",
    image: "/tes-project.png",
    github: "https://github.com/GedeBrawidya/movera.git",
    live: "https://example.com",
    technologies: ["Next.js", "Remove BG API", "TypeScript"],
    details: "Remove - Background removal application using Next.js with integration of Remove BG API for intelligent image processing.",
  },
  {
    id: 3,
    title: "Pantauin",
    category: "web App",
    description: "Worker tracking application for organizations",
    size: "medium",
    image: "/pantauin.png",
    github: "https://github.com/GedeBrawidya/pantauin.git",
    live: "https://pantauin.vercel.app/",
    technologies: ["React", "Express", "MongoDB"],
    details: "Tracking Worker - Comprehensive worker tracking solution built with React frontend and Express backend for real-time location monitoring.",
  },
  {
    id: 4,
    title: "Convertin",
    category: "website",
    description: "File conversion made easy",
    size: "small",
    image: "/convertin.png",
    github: "https://github.com/GedeBrawidya/convert-project.git",
    live: "https://example.com",
    technologies: ["React", "Python", "Flask"],
    details: "Convert APP - File conversion application with React frontend and Python backend for multi-format file processing.",
  },
  {
    id: 5,
    title: "Karang Taruna",
    category: "website",
    description: "Website for community organization management",
    size: "small",
    image: "/karang-taruna.png",
    github: "https://github.com/rifkibayuariy/karang-taruna.git",
    live: "https://techtona.online",
    technologies: ["Next.js", "Prisma", "PostgreSQL"],
    details: "Website Organization - Community organization website built with Next.js for managing members, events, and organizational activities.",
  },
]

function ProjectCard({
  project,
  isHovered,
  onHover,
  onHoverEnd,
  onViewProject
}: {
  project: (typeof projects)[0]
  isHovered: number | null
  onHover: (id: number) => void
  onHoverEnd: () => void
  onViewProject: (project: typeof projects[0]) => void
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
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent rounded-2xl" />

      {/* Project Image - Full Opacity */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs font-medium text-accent mb-2 tracking-wide uppercase drop-shadow-lg">{project.category}</div>
          <h3 className="text-2xl font-bold text-accent drop-shadow-lg">{project.title}</h3>
        </div>

        <div className="relative z-10 flex items-center justify-between mt-6 pt-6">
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              onViewProject(project)
            }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-accent/80"
          >
            View Project
            <motion.div animate={{ x: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ExternalLink className="w-4 h-4" />
            </motion.div>
          </motion.button>

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
      </div>
    </motion.div>
  )
}

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

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
              id={`project-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`
                ${project.size === "large"
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
                onViewProject={setSelectedProject}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border-2 border-accent/30 rounded-2xl max-w-2xl w-full shadow-2xl shadow-accent/20"
            >
              {/* Header */}
              <div className="flex items-start justify-between p-8 border-b border-accent/20">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                  <p className="text-muted-foreground text-sm uppercase tracking-wide">
                    {selectedProject.category}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 rounded-full border-2 border-accent/30 hover:border-accent/70 hover:bg-accent/10 flex items-center justify-center text-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-sm font-semibold text-accent mb-2 uppercase tracking-wide">
                    Description
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">{selectedProject.details}</p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-sm font-semibold text-accent mb-3 uppercase tracking-wide">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-3 py-1.5 bg-accent/15 text-accent text-xs font-medium rounded-lg border-2 border-accent/40 hover:bg-accent/25 hover:border-accent/70 transition-all duration-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-4 pt-4">
                  <motion.a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-accent to-accent/90 text-background rounded-xl font-semibold hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Visit Live Project
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 border-2 border-accent/30 rounded-xl font-semibold text-accent hover:bg-accent/10 hover:border-accent/70 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent/20"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
