"use client"

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useRef, useState, useEffect } from "react"

// --- 1. Tipe Data ---
interface Job {
  id: number;
  title: string;
  company: string;
  period: string;
  location: string;
  status: string;
  description: string;
  highlights: string[];
  images: string[];
}

const jobsData: Job[] = [
  {
    id: 1,
    title: "Department IT",
    company: "AMIKOM COMPUTER CLUB",
    period: "2025 - Present",
    location: "Universitas Amikom Yogyakarta",
    status: "current",
    description: "Leading frontend & Backend architecture and mentoring members in IT. Responsible for maintaining internal systems and organizing tech workshops.",
    highlights: ["React & Next.js", "Team Leadership", "Mentoring", "laravel"],
    images: ["https://picsum.photos/600/400?random=1", "https://picsum.photos/600/400?random=2", "https://picsum.photos/600/400?random=3"]
  },
  {
    id: 2,
    title: "Volunteer Front End Developer",
    company: "PT Javas Teknologi Integrator",
    period: "2025",
    location: "Yogyakarta, Indonesia",
    status: "past",
    description: "Developed Frontend web applications for Sumatra Floods disaster management. Focused on real-time data visualization and responsive design.",
    highlights: ["laravel", "Tailwind CSS"],
    images: ["https://picsum.photos/600/400?random=4", "https://picsum.photos/600/400?random=5"]
  },
  {
    id: 3,
    title: "lab assistant",
    company: "Universitas Amikom Yogyakarta",
    period: "2024 - Present",
    location: "Yogyakarta, Indonesia",
    status: "current",
    description: "Assisting students in practical labs for Algorithm & Program courses. Debugging code and explaining complex logic in C++ and CSS.",
    highlights: ["C++", "CSS", "Mentoring"],
    images: ["https://picsum.photos/600/400?random=6", "https://picsum.photos/600/400?random=7"]
  },
  {
    id: 4,
    title: "Freelance Web Developer",
    company: "Myself",
    period: "2025 - Present",
    location: "Remote",
    status: "current",
    description: "Make modern and responsive websites for small businesses and individuals. Handling full-stack development from database design to deployment.",
    highlights: ["TypeScript", "Vercel", "Supabase", "react.js", "laravel"],
    images: ["https://picsum.photos/600/400?random=8", "https://picsum.photos/600/400?random=9"]
  },
]

// --- 2. Komponen Auto Gallery ---
function AutoGallery({ images }: { images: string[] }) {
  return (
    <div className="relative overflow-hidden w-full py-4 mt-6">
      <motion.div 
        className="flex gap-4 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[...images, ...images].map((src, i) => (
          <img key={i} src={src} alt="Gallery" className="w-64 h-40 object-cover rounded-xl border border-accent/20 shadow-lg" />
        ))}
      </motion.div>
    </div>
  )
}

// --- 3. Komponen JobCard (Efek Original + Klik) ---
function JobCard({ job, index, onClick }: { job: Job; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
      }}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ y: -10 }}
      className={`group relative rounded-2xl p-8 min-h-[380px] flex flex-col justify-between overflow-hidden cursor-pointer
        ${index % 3 === 0 ? "lg:col-span-2" : ""}
      `}
    >
      {/* 1. Glowing Border Gradient (Efek Hover) */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/20 via-accent/5 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* 2. Animated Border Glow (Efek Pulsing) */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent"
        animate={{
          boxShadow: [
            "inset 0 0 15px rgba(var(--accent-rgb), 0.1)",
            "inset 0 0 30px rgba(var(--accent-rgb), 0.2)",
            "inset 0 0 15px rgba(var(--accent-rgb), 0.1)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ borderColor: "rgba(var(--accent-rgb), 0.3)", pointerEvents: "none" }}
      />

      {/* 3. Card Background */}
      <div className="absolute inset-0 bg-card rounded-2xl opacity-90 backdrop-blur-sm" />

      {/* 4. Content Content */}
      <div className="relative z-10">
        <div className="mb-6">
          <Badge variant={job.status === "current" ? "default" : "secondary"}>
            {job.status === "current" ? "🔴 Current" : "✓ Completed"}
          </Badge>
        </div>
        <div>
          <p className="text-accent font-semibold tracking-wider text-xs mb-2 uppercase">{job.company}</p>
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">{job.title}</h3>
          <p className="text-foreground/70 text-sm line-clamp-3">{job.description}</p>
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2 mt-4">
        {job.highlights.map((h, i) => (
          <span key={i} className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold rounded-lg border border-accent/20">
            {h}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

// --- 4. Komponen Utama ---
export function Jobs() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  useEffect(() => {
    document.body.style.overflow = selectedJob ? "hidden" : "unset"
  }, [selectedJob])

  return (
    <section id="jobs" className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Work Experience</h2>
          <p className="text-muted-foreground">Journey of my professional career</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" style={{ perspective: "1000px" }}>
          {jobsData.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} onClick={() => setSelectedJob(job)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedJob && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="fixed inset-0 bg-background/60 backdrop-blur-md z-[100] cursor-zoom-out"
            />
            
            <motion.div
              layoutId={`card-${selectedJob.id}`}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed inset-4 md:inset-x-[15%] md:inset-y-[10%] lg:inset-x-[25%] bg-card border border-accent/20 rounded-[2.5rem] z-[101] overflow-hidden flex flex-col shadow-2xl"
            >
              <button onClick={() => setSelectedJob(null)} className="absolute right-8 top-8 p-2 bg-secondary rounded-full z-50 hover:bg-accent hover:text-white transition-colors">
                <X size={24} />
              </button>

              <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
                <Badge className="mb-4">{selectedJob.status.toUpperCase()}</Badge>
                <h2 className="text-4xl font-bold mb-2">{selectedJob.title}</h2>
                <p className="text-xl text-accent font-semibold mb-8">{selectedJob.company}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-muted-foreground border-b border-accent/10 pb-8">
                  <div className="flex items-center gap-2"><Calendar size={18} /> {selectedJob.period}</div>
                  <div className="flex items-center gap-2"><MapPin size={18} /> {selectedJob.location}</div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <h4 className="text-foreground text-lg font-bold mb-2">Description</h4>
                  <p className="text-foreground/80 leading-relaxed">{selectedJob.description}</p>
                </div>

                <div className="mt-12">
                  <h4 className="text-foreground text-lg font-bold mb-4">Gallery</h4>
                  <AutoGallery images={selectedJob.images} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}