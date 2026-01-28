"use client"

import type React from "react"
import Image from "next/image"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { useRef } from "react"

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

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const ref = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
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
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.open(project.live, "_blank")}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`
        relative group rounded-2xl border-[0.5px] border-[#E5E1D8] dark:border-zinc-700/50 bg-card overflow-hidden
        hover:shadow-2xl hover:border-accent/30 transition-all duration-300 cursor-pointer
        ${project.size === "large" ? "md:col-span-2 md:row-span-2" : ""}
        ${project.size === "medium" ? "md:col-span-1 md:row-span-2" : ""}
      `}
    >
      <div className="relative p-8 h-full flex flex-col justify-between min-h-[280px]">
        <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/20 transition-all duration-500" />

        {/* Project Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity duration-300"
          />
        </div>

        <div className="relative z-10">
          <div className="text-xs font-medium text-accent mb-3 tracking-wide uppercase">{project.category}</div>
          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            View Project
            <ExternalLink className="w-4 h-4" />
          </motion.div>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-accent hover:text-accent/80"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export function Projects() {
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

        <div className="grid md:grid-cols-3 gap-6 auto-rows-fr">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
