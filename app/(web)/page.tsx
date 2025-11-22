"use client";

import HeroSection from "./_home_sections/hero";
import About from "./_home_sections/about";
import MyServices from "./_home_sections/services";
import TechStack from "./_home_sections/tech-stack";
import DevOps from "./_home_sections/devops";
import { motion } from "motion/react";

export default function Home() {
  return (
    <main className="flex-1">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <About />
      </motion.div>

      {/* Services section - fade in up */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <MyServices />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <TechStack />
      </motion.div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <DevOps />
      </motion.div>
    </main>
  );
}
