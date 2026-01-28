"use client"

import type React from "react"
import Image from "next/image"

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles, Github, Linkedin, Instagram, Globe } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

const stats = [
  { label: "Years Experience", value: "2+", position: { top: "10%", right: "5%" } },
  { label: "Projects", value: "10+", position: { bottom: "15%", right: "10%" } },
  { label: "Happy Clients", value: "8+", position: { top: "40%", left: "0%" } },
]

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  // Theme-aware image
  const profileImage = mounted && theme === "dark" ? "/tes-project.png" : "/profile.png"

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

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(var(--accent-rgb), 0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-background rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 flex items-center gap-2"
              >
                View My Work
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(var(--accent-rgb), 0.15)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border-2 border-accent/30 rounded-xl font-semibold text-lg text-accent hover:bg-accent/10 hover:border-accent/60 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Get In Touch
              </motion.button>
            </motion.div>

            {/* Social Media Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6 mt-12"
            >
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
              ].map((social, idx) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative w-11 h-11 rounded-full border-2 border-accent/30 flex items-center justify-center bg-transparent hover:bg-accent/10 hover:border-accent/70 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-accent/30"
                >
                  <social.icon className="w-5 h-5 text-accent group-hover:scale-110 transition-transform duration-300" />
                </motion.a>
              ))}

              {/* Upwork Icon */}
              <motion.a
                href="https://upwork.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Upwork"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: 0.15 }}
                className="group relative w-11 h-11 rounded-full border-2 border-accent/30 flex items-center justify-center bg-transparent hover:bg-accent/10 hover:border-accent/70 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-accent/30"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-accent group-hover:scale-110 transition-transform duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.532 6.332c-2.265 0-4.234 1.139-5.469 2.852-.928 1.266-1.453 2.857-1.453 4.55 0 .547.032 1.086.094 1.619.422 3.688 3.289 6.516 6.893 6.516 3.916 0 7.087-3.171 7.087-7.087s-3.171-7.087-7.087-7.087c-.697 0-1.379.103-2.032.298v2.598c.684-.213 1.41-.329 2.168-.329 2.418 0 4.381 1.963 4.381 4.381 0 2.418-1.963 4.381-4.381 4.381-2.297 0-4.188-1.766-4.357-4.022-.027-.347-.042-.697-.042-1.05 0-1.234.416-2.372 1.11-3.274.856-1.166 2.223-1.94 3.775-1.94 2.418 0 4.381 1.963 4.381 4.381s-1.963 4.381-4.381 4.381c-1.327 0-2.512-.583-3.327-1.505v2.565c1.07.569 2.294.893 3.605.893 4.626 0 8.381-3.754 8.381-8.381 0-4.626-3.754-8.381-8.381-8.381zm-5.94 0c-2.418 0-4.381 1.963-4.381 4.381 0 2.418 1.963 4.381 4.381 4.381s4.381-1.963 4.381-4.381-1.963-4.381-4.381-4.381z" />
                </svg>
              </motion.a>
            </motion.div>
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
              className="relative w-72 h-96 rounded-[2.5rem] border-[3px] border-accent/20 bg-gradient-to-br from-secondary to-background overflow-hidden shadow-2xl hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300"
            >
              {/* Glow effect on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={profileImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={profileImage}
                    alt="Profile"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { delay: 0.6 + index * 0.15 },
                  scale: { delay: 0.6 + index * 0.15 },
                  y: {
                    duration: 3.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  },
                }}
                style={{ x: statsX, y: statsY }}
                className="absolute border-2 border-accent/20 rounded-2xl p-5 bg-card/80 backdrop-blur-md shadow-xl hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300"
                // @ts-ignore
                style={{ ...stat.position, x: statsX, y: statsY }}
              >
                <div className="text-3xl font-bold text-accent mb-2 leading-tight">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-medium whitespace-nowrap">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
