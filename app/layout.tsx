import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "enxyest - web developer",
    template: "%s | enxyest Portfolio"
  },
  description: "Passionate Full-Stack Developer specializing in React, Next.js, and modern web technologies. Building premium, high-performance web applications with pixel-perfect design and seamless user experiences.",
  keywords: [
    "web developer",
    "React Developer",
    "Next.js Developer",
    "UI/UX Designer",
    "Frontend Developer",
    "Gede Brawidya",
    "enxyest",
    "Portfolio",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "Laravel",
    "Node.js",
    "Yogyakarta Developer"
  ],
  authors: [{ name: "Gede Brawidya", url: "https://github.com/GedeBrawidya" }],
  creator: "enxyest",
  publisher: "enxyest",
  metadataBase: new URL("https://enxyest-portfolio.vercel.app"), // Update with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "enxyest Portfolio",
    title: "enxyest - Full-Stack Developer & UI/UX Designer",
    description: "Passionate Full-Stack Developer specializing in React, Next.js, and modern web technologies. Building premium web applications with exceptional design.",
    images: [
      {
        url: "/profile.png", // Your OG image
        width: 1200,
        height: 630,
        alt: "enxyest - Full-Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "enxyest - Full-Stack Developer & UI/UX Designer",
    description: "Building premium web applications with React, Next.js, and modern technologies. Check out my portfolio!",
    creator: "@enxyest",
    images: ["/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  verification: {
    // Add your verification codes when ready
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
