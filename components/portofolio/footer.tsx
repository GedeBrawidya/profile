"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

const socials = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@enxyest.com", label: "Email" },
]

const links = {
  company: [
    { label: "About", href: "#" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
  ],
  support: [
    { label: "Contact", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Privacy", href: "#" },
  ],
}

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <footer className="py-16 px-6 lg:px-8 border-t border-zinc-200 dark:border-zinc-800/50">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <motion.div variants={itemVariants} className="md:col-span-2">
            <h3 className="text-xl font-medium mb-3 text-zinc-800 dark:text-zinc-200">enxyest</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-5 max-w-md leading-relaxed text-sm">
              Creating digital experiences that blend technical excellence with thoughtful design.
            </p>
            <motion.a
              href="mailto:hello@enxyest.com"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 dark:bg-zinc-200 text-zinc-50 dark:text-zinc-900 rounded-md hover:opacity-90 transition-opacity text-sm"
            >
              Get in touch
            </motion.a>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-medium mb-3 text-zinc-800 dark:text-zinc-200 text-sm">Company</h4>
            <ul className="space-y-2.5">
              {links.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-medium mb-3 text-zinc-800 dark:text-zinc-200 text-sm">Support</h4>
            <ul className="space-y-2.5">
              {links.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div variants={itemVariants} className="text-xs text-zinc-500 dark:text-zinc-500">
            © 2025 enxyest. All rights reserved.
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-2.5">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-md border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all flex items-center justify-center group"
              >
                <social.icon className="w-4 h-4 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </footer>
  )
}
