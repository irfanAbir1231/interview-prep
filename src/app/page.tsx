"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  
  // Parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  useEffect(() => {
    // Initialize GSAP animations
    import("gsap").then(({ gsap }) => {
      gsap.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      });
      
      gsap.from(".hero-subtitle", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.5,
      });
      
      gsap.from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.8,
      });
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section with Parallax */}
      <section className="w-full h-[90vh] flex items-center justify-center relative overflow-hidden parallax">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y, opacity }}
        >
          <div 
            className="parallax-bg" 
            style={{
              backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('/hero-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </motion.div>
        
        <div className="container mx-auto px-4 z-10 text-center relative">
          <motion.h1 
            className="text-6xl font-bold mb-6 hero-title text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Ace Your Next Tech Interview
          </motion.h1>
          <motion.p 
            className="text-xl text-white mb-8 max-w-2xl mx-auto hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Practice with our AI-powered agent and get instant, personalized feedback.
          </motion.p>
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/interview/new" className="inline-block px-8 py-4 text-lg font-medium text-white bg-primary rounded-lg hover:bg-primary/90 hover:scale-105 transition-all shadow-lg">
              Start Practicing Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section with Scroll Animations */}
      <section className="w-full py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 from-bottom"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Why Choose Us?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <motion.div 
              className="flex flex-col items-center text-center p-8 rounded-xl shadow-lg bg-white hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Realistic Questions</h3>
              <p className="text-gray-600">Practice with questions that mirror real tech interviews, tailored to your specific role and experience level.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="flex flex-col items-center text-center p-8 rounded-xl shadow-lg bg-white hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Instant Feedback</h3>
              <p className="text-gray-600">Get detailed feedback and suggestions in real-time to improve your interview performance immediately.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className="flex flex-col items-center text-center p-8 rounded-xl shadow-lg bg-white hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Personalized Learning</h3>
              <p className="text-gray-600">Adaptive practice sessions tailored to your needs, focusing on areas where you need the most improvement.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section with Animated Steps */}
      <section className="w-full py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Get Started in 3 Easy Steps
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-primary/30 -translate-y-1/2 z-0" />
            
            {/* Step 1 */}
            <motion.div 
              className="relative flex flex-col items-center text-center p-8 z-10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-4">Describe Your Target Job</h3>
              <p className="text-gray-600">Tell us about the position you're interviewing for and your experience level.</p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="relative flex flex-col items-center text-center p-8 z-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-4">Start the Mock Interview</h3>
              <p className="text-gray-600">Experience a realistic interview simulation with our AI interviewer.</p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              className="relative flex flex-col items-center text-center p-8 z-10"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-4">Receive Instant Feedback</h3>
              <p className="text-gray-600">Get detailed insights and improvement suggestions to ace your real interview.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="w-full py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Ready to Ace Your Interview?
          </motion.h2>
          <motion.p 
            className="text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Start practicing today and gain the confidence you need to succeed in your next tech interview.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/interview/new" className="inline-block px-10 py-4 text-lg font-medium bg-white text-primary rounded-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-lg">
              Start Free Practice
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}