"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ArrowRight, Zap, Shield, Code } from "lucide-react";
import FeatureCard from "@/components/shared/FeatureCard";
import { buttonVariants } from "@/components/ui/button";

const MotionLink = motion(Link);

export default function Hero({ loggedIn }: { loggedIn: boolean }) {
  return (
    <div className="relative z-10 mt-5 lg:mt-0 p-4">
      <section className="container min-h-screen flex flex-col justify-center items-center gap-8 pb-8 pt-6 md:py-10">
        <motion.div
          className="flex max-w-[980px] flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl font-extrabold leading-tight tracking-tighter md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-indigo-400"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Authenticate users based on admin approval
          </motion.h1>

          <motion.p
            className="max-w-[700px] text-xl text-gray-500 mt-2 font-normal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            A simple admin approval authentication system where users can sign
            up and login only after the admin approves their request.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <MotionLink
            href={loggedIn ? "/dashboard" : "/register"}
            className={
              buttonVariants({ size: "lg", variant: "default" }) +
              " bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-8 py-4 rounded-full"
            }
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              borderRadius: "5px",
            }}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </MotionLink>
          <MotionLink
            target="_blank"
            rel="noreferrer"
            href="https://github.com/subhadeeproy3902"
            className={
              buttonVariants({ variant: "outline", size: "lg" }) +
              " border-2 border-blue-400 text-white font-semibold px-8 py-4 rounded-full"
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              borderRadius: "5px",
            }}
          >
            <Github className="mr-2 h-5 w-5" />
            <span>GitHub</span>
          </MotionLink>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <FeatureCard
            feature="Lightning Fast"
            icon={Zap}
            delay={1.2}
            desc="The system is designed to be fast and efficient, ensuring a seamless experience for the users."
          />
          <FeatureCard
            feature="Fully Accessible"
            icon={Shield}
            delay={1.4}
            desc="The system is designed to be secure and reliable, ensuring the safety of the users' data."
          />
          <FeatureCard
            icon={Code}
            delay={1.6}
            feature="No Code Required"
            desc="The system is designed to be easy to use and understand, ensuring a smooth experience for the users."
          />
        </motion.div>
      </section>
    </div>
  );
}
