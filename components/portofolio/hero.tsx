"use client"

import type React from "react"
import Image from "next/image"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { useRef } from "react"

const stats = [
  { label: "Years Experience", value: "2+", position: { top: "10%", right: "5%" } },
  { label: "Projects", value: "10+", position: { bottom: "15%", right: "10%" } },
  { label: "Happy Clients", value: "8+", position: { top: "40%", left: "0%" } },
]

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Photo parallax - moves towards cursor (positive values)
  const photoX = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), {
    stiffness: 150,
    damping: 30,
  })
  const photoY = useSpring(useTransform(mouseY, [-1, 1], [-15, 15]), {
    stiffness: 150,
    damping: 30,
  })

  // Stats cards parallax - moves away from cursor (negative values for magnetic effect)
  const statsX = useSpring(useTransform(mouseX, [-1, 1], [8, -8]), {
    stiffness: 120,
    damping: 25,
  })
  const statsY = useSpring(useTransform(mouseY, [-1, 1], [8, -8]), {
    stiffness: 120,
    damping: 25,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return

    const rect = heroRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) / (rect.width / 2)
    const deltaY = (e.clientY - centerY) / (rect.height / 2)

    mouseX.set(deltaX)
    mouseY.set(deltaY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 pt-16"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E5E1D8] dark:border-zinc-700/50 bg-secondary/50 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium">Available for freelance</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
              Crafting Digital
              <br />
              <span className="text-accent">Experiences</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl text-pretty leading-relaxed">
              Frontend architect specializing in building premium, high-performance web applications with modern
              technologies and pixel-perfect design.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              View My Work
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative flex items-center justify-center min-h-[500px]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              style={{ x: photoX, y: photoY }}
              className="relative w-72 h-96 rounded-[2rem] border-2 border-[#E5E1D8] dark:border-zinc-700/50 bg-gradient-to-br from-secondary to-cream overflow-hidden"
            >
              <Image
                src="/profile.png"
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -8, 0],
                }}
                transition={{
                  opacity: { delay: 0.6 + index * 0.15 },
                  scale: { delay: 0.6 + index * 0.15 },
                  y: {
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  },
                }}
                style={{ x: statsX, y: statsY }}
                className="absolute border border-[#E5E1D8] dark:border-zinc-700/50 rounded-xl p-4 bg-card shadow-lg backdrop-blur-sm"
                // @ts-ignore
                style={{ ...stat.position, x: statsX, y: statsY }}
              >
                <div className="text-2xl font-bold text-accent mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
