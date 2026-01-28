"use client"

import { motion } from "framer-motion"
import { Award } from "lucide-react"
import { useEffect, useState } from "react"

const certificates = [
  {
    id: 1,
    title: "React Advanced Patterns",
    issuer: "Frontend Masters",
    date: "2024",
    icon: "🏆",
  },
  {
    id: 2,
    title: "Next.js Full Stack",
    issuer: "Vercel",
    date: "2024",
    icon: "⚡",
  },
  {
    id: 3,
    title: "TypeScript Expert",
    issuer: "Scrimba",
    date: "2023",
    icon: "📘",
  },
  {
    id: 4,
    title: "Web Performance",
    issuer: "Google",
    date: "2023",
    icon: "⚙️",
  },
  {
    id: 5,
    title: "UI/UX Design",
    issuer: "Interaction Design Foundation",
    date: "2023",
    icon: "🎨",
  },
  {
    id: 6,
    title: "Cloud Architecture",
    issuer: "AWS",
    date: "2023",
    icon: "☁️",
  },
]

export function Certificates() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % 360)
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="certificates" className="py-32 px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
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

        <div className="relative w-full overflow-hidden py-8">
        <motion.div
            animate={{ x: -scrollPosition }}
            transition={{
              type: "tween",
              ease: "linear",
              duration: 0.02
            }}
            className="flex gap-6 w-max"
          >

            {/* Double the certificates for continuous loop effect */}
            {[...certificates, ...certificates].map((cert, index) => (
              <motion.div
                key={`${cert.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-72 bg-card border border-[#E5E1D8] dark:border-zinc-700/50 rounded-2xl p-6 hover:shadow-xl hover:border-accent/30 transition-all duration-300 cursor-pointer group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {cert.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{cert.issuer}</p>
                <p className="text-xs text-accent font-medium">{cert.date}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
