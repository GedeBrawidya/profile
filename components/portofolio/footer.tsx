"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

const socials = [
  { icon: Github, href: "https://github.com/GedeBrawidya", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/gede-brawidya-puja-dharma-6b4889322/", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/enxyest", label: "Twitter" },
  { icon: Mail, href: "mailto:gedepujaa9@gmail.com", label: "Email" },
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
    <footer className="py-20 px-6 lg:px-8 border-t-2 border-zinc-300 dark:border-zinc-700 bg-gradient-to-b from-transparent via-zinc-50/50 to-zinc-100/80 dark:from-transparent dark:via-zinc-900/50 dark:to-zinc-900/80">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <motion.div variants={itemVariants} className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">enxyest</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-md leading-relaxed font-medium">
              Creating digital experiences that blend technical excellence with thoughtful design.
            </p>
            <motion.a
              href="https://wa.me/6281236758041"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-zinc-100 dark:to-zinc-200 text-zinc-50 dark:text-zinc-900 rounded-lg hover:shadow-lg hover:shadow-zinc-800/30 dark:hover:shadow-zinc-100/30 transition-all font-semibold"
            >
              Get in touch
            </motion.a>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-4 text-zinc-900 dark:text-zinc-100">Company</h4>
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
            <h4 className="font-bold mb-4 text-zinc-900 dark:text-zinc-100">Support</h4>
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

        <div className="border-t-2 border-zinc-300 dark:border-zinc-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div variants={itemVariants} className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
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
                className="w-10 h-10 rounded-lg border-2 border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:shadow-lg transition-all flex items-center justify-center group"
              >
                <social.icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </footer>
  )
}
