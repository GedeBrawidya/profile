"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useRef } from "react"

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Tech Startup Inc",
    period: "2024 - Present",
    location: "Remote",
    status: "current",
    description: "Leading frontend architecture and mentoring junior developers",
    highlights: ["React & Next.js", "Team Leadership", "Product Strategy"],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Digital Agency Pro",
    period: "2023 - 2024",
    location: "Jakarta, Indonesia",
    status: "past",
    description: "Developed scalable web applications for enterprise clients",
    highlights: ["Node.js", "React", "PostgreSQL"],
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "Web Studio Creative",
    period: "2022 - 2023",
    location: "Remote",
    status: "past",
    description: "Built responsive and interactive user interfaces",
    highlights: ["React", "Tailwind CSS", "UI/UX"],
  },
  {
    id: 4,
    title: "Junior Web Developer",
    company: "Startup Hub",
    period: "2021 - 2022",
    location: "Bandung, Indonesia",
    status: "past",
    description: "Started career in web development with HTML, CSS, and JavaScript",
    highlights: ["JavaScript", "HTML/CSS", "jQuery"],
  },
]

function JobCard({ job, index }: { job: (typeof jobs)[0]; index: number }) {
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
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -10 }}
      className={`group relative rounded-2xl p-8 min-h-[380px] flex flex-col justify-between overflow-hidden cursor-pointer
        ${index % 3 === 0 ? "lg:col-span-2 lg:row-span-2" : index % 3 === 1 ? "lg:row-span-2" : ""}
      `}
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

      {/* Content */}
      <div className="relative z-10">
        {/* Status Badge */}
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Badge
              variant={job.status === "current" ? "default" : "secondary"}
              className={`${
                job.status === "current"
                  ? "bg-gradient-to-r from-accent/30 to-accent/20 text-accent border-2 border-accent/60 shadow-md shadow-accent/20"
                  : "bg-secondary/30 text-muted-foreground border-2 border-secondary/60 shadow-md shadow-secondary/10"
              }`}
            >
              {job.status === "current" ? "🔴 Current" : "✓ Completed"}
            </Badge>
          </motion.div>
        </div>

        {/* Header */}
        <div className="mb-6">
          <p className="text-accent font-semibold tracking-wider text-sm mb-2 uppercase">{job.company}</p>
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">{job.title}</h3>
          <p className="text-foreground/80 text-sm">{job.description}</p>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 mb-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-accent" />
            <span>{job.period}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-accent" />
            <span>{job.location}</span>
          </div>
        </div>
      </div>

      {/* Highlights - Bottom */}
      <div className="relative z-10 flex flex-wrap gap-2">
        {job.highlights.map((highlight, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="px-3 py-1.5 bg-accent/15 text-accent text-xs font-medium rounded-lg border-2 border-accent/40 hover:bg-accent/25 hover:border-accent/70 hover:shadow-md hover:shadow-accent/20 transition-all duration-300"
          >
            {highlight}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export function Jobs() {
  return (
    <section id="jobs" className="py-32 px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Work Experience</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
            My professional journey and experiences
          </p>
        </motion.div>

        {/* Masonry Grid with 3D Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto" style={{ perspective: "1000px" }}>
          {jobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
