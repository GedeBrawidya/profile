"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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

export function Jobs() {
  return (
    <section id="jobs" className="py-32 px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Work Experience</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
            My professional journey and experiences
          </p>
        </motion.div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative"
            >
              <div className="relative border border-[#E5E1D8] dark:border-zinc-700/50 rounded-2xl p-8 bg-card hover:shadow-xl transition-all duration-300 hover:border-accent/30">
                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                  <Badge
                    variant={job.status === "current" ? "default" : "secondary"}
                    className={job.status === "current" ? "bg-green-500/20 text-green-600 dark:text-green-400" : ""}
                  >
                    {job.status === "current" ? "Current" : "Past"}
                  </Badge>
                </div>

                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                  <p className="text-accent font-semibold mb-3">{job.company}</p>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{job.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-foreground/80 mb-6">{job.description}</p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {job.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Timeline Dot */}
                <div className="absolute -left-[25px] top-12 w-[17px] h-[17px] bg-accent rounded-full border-4 border-background hidden lg:block" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline Line */}
        <div className="absolute left-1/2 lg:left-auto lg:left-[calc(50%-20px-280px)] top-40 bottom-0 w-1 bg-gradient-to-b from-accent/50 via-accent/25 to-transparent hidden lg:block" />
      </div>
    </section>
  )
}
