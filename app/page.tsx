"use client"

import { Hero } from "@/components/portofolio/hero"
import { Services } from "@/components/portofolio/services"
import { Projects } from "@/components/portofolio/projects"
import { Certificates } from "@/components/portofolio/certificates"
import { Jobs } from "@/components/portofolio/jobs"
import { FloatingReviews } from "@/components/portofolio/floating-review"
import { Navigation } from "@/components/portofolio/navigation"
import { Footer } from "@/components/portofolio/footer"

export default function Portfolio() {
  return (
    <>
      <Navigation />
      <main className="relative">
        <Hero />
        <Services />
        <Jobs />
        <Projects />
        <Certificates />
        <FloatingReviews />
        <Footer />
      </main>
    </>
  )
}
