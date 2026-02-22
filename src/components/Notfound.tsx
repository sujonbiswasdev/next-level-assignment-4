'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#111827] to-black text-white flex items-center justify-center px-6">

      {/* Animated Moon Glow */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-indigo-500/20 blur-3xl"
      />

      {/* Floating Ghost */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute text-[120px] md:text-[160px] z-10"
      >
        👻
      </motion.div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-2xl">

        {/* 404 */}
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-widest text-white/90"
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-2xl md:text-3xl font-semibold"
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-gray-400 text-sm sm:text-base"
        >
          The page you’re looking for vanished into the digital night.
          Let’s guide you back home.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-sm font-medium shadow-lg hover:scale-105"
          >
            <Home size={18} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300 text-sm font-medium hover:scale-105"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </motion.div>

      </div>

      {/* Subtle Animated Stars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(white_1px,transparent_1px)] [background-size:40px_40px] opacity-10 animate-pulse" />
      </div>

    </div>
  )
}