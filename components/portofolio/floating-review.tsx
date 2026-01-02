"use client"

import { motion, useAnimation } from "framer-motion"
import { Plus, Star } from "lucide-react"
import { useState } from "react"

const reviews = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO, TechStart",
    rating: 5,
    text: "Exceptional work! The attention to detail and technical expertise exceeded our expectations.",
  },
  {
    id: 2,
    name: "Michael Ross",
    role: "Product Manager",
    rating: 5,
    text: "A true professional. Delivered a pixel-perfect design with smooth animations.",
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "Design Lead",
    rating: 5,
    text: "Creative problem solver with excellent communication. Highly recommend!",
  },
  {
    id: 4,
    name: "David Park",
    role: "Startup Founder",
    rating: 5,
    text: "Built our MVP in record time without compromising on quality. Amazing!",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Marketing Director",
    rating: 5,
    text: "The website increased our conversion rate by 40%. Outstanding results!",
  },
]

const orbitPositions = [
  { x: 280, y: -120, rotation: 12 },
  { x: -300, y: -80, rotation: -8 },
  { x: 320, y: 100, rotation: 8 },
  { x: -280, y: 140, rotation: -10 },
  { x: 0, y: -200, rotation: 5 },
]

function FloatingReviewCard({ review, index }: { review: (typeof reviews)[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const controls = useAnimation()
  const position = orbitPositions[index % orbitPositions.length]

  return (
    <>
      <motion.div
        drag
        dragElastic={0.1}
        dragConstraints={{ top: -100, left: -100, right: 100, bottom: 100 }}
        animate={controls}
        initial={{ x: position.x, y: position.y, rotate: position.rotation }}
        whileHover={{ scale: 1.05, rotate: 0, transition: { duration: 0.2 } }}
        onHoverStart={() => controls.stop()}
        onHoverEnd={() =>
          controls.start({
            x: position.x,
            y: position.y,
            rotate: position.rotation,
            transition: {
              duration: 1.5,
              ease: "easeOut",
            },
          })
        }
        onClick={() => setIsExpanded(true)}
        className="absolute glass rounded-xl p-4 w-64 cursor-grab active:cursor-grabbing shadow-lg"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-sm font-semibold">
            {review.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-sm">{review.name}</div>
            <div className="text-xs text-muted-foreground">{review.role}</div>
          </div>
        </div>
        <div className="flex gap-1 mb-2">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-accent text-accent" />
          ))}
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">{review.text}</p>
      </motion.div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-[#E5E1D8] dark:border-zinc-700/50 rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-lg font-semibold">
                {review.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-lg">{review.name}</div>
                <div className="text-sm text-muted-foreground">{review.role}</div>
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">{review.text}</p>
            <button
              onClick={() => setIsExpanded(false)}
              className="w-full py-2 px-4 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

function AddReviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border-[0.5px] border-[#E5E1D8] dark:border-zinc-700/50 rounded-2xl p-8 max-w-md w-full shadow-2xl"
      >
        <h3 className="text-2xl font-bold mb-6">Write a Review</h3>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 rounded-lg border-[0.5px] border-[#E5E1D8] dark:border-zinc-700/50 bg-background focus:outline-none focus:ring-2 focus:ring-accent/50"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Your Review
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 rounded-lg border-[0.5px] border-[#E5E1D8] dark:border-zinc-700/50 bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
              placeholder="Share your experience..."
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border-[0.5px] border-[#E5E1D8] dark:border-zinc-700/50 rounded-lg font-medium hover:bg-secondary/20 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export function FloatingReviews() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <section id="reviews" className="py-32 px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative flex flex-col items-center justify-center min-h-[600px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center z-10 relative"
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-4">Client Feedback</h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto text-balance mb-6">
              Drag the reviews around and click to read more
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 border-[0.5px] border-[#E5E1D8] dark:border-zinc-700/50 rounded-lg text-sm font-medium hover:bg-secondary/20 hover:border-accent/50 transition-all"
            >
              <Plus className="w-4 h-4" />
              Write a Review
            </motion.button>
          </motion.div>

          {/* Floating Reviews */}
          {reviews.map((review, index) => (
            <FloatingReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>
      </div>

      <AddReviewModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  )
}
