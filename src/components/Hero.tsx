import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, MessageCircle, FileText } from "lucide-react";
import InteractiveGrid from "./InteractiveGrid";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="hero-gradient-orb w-[600px] h-[600px] bg-primary top-1/4 -left-64 opacity-[0.08] animate-glow-pulse" />
      <div className="hero-gradient-orb w-[500px] h-[500px] bg-secondary top-1/3 -right-48 opacity-[0.05] animate-glow-pulse" style={{ animationDelay: "2s" }} />
      <div className="hero-gradient-orb w-[400px] h-[400px] bg-accent bottom-1/4 left-1/3 opacity-[0.04] animate-glow-pulse" style={{ animationDelay: "1s" }} />

      {/* Interactive grid */}
      <InteractiveGrid />

      {/* Radial fade */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 70%)",
      }} />

      <div className="container-narrow relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card-static text-sm text-muted-foreground mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for freelance work
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] mb-8 leading-[1.05]"
        >
          Hi, I'm{" "}
          <span className="gradient-text">Asif</span>
        </motion.h1>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <span className="text-xl sm:text-2xl font-medium text-muted-foreground code-font tracking-tight">
            Full Stack Developer
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          I build fast, scalable and elegant web applications.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap"
        >
          <a href="#projects" className="btn-primary-gradient flex items-center gap-2.5">
            <ExternalLink size={18} />
            View Projects
          </a>
          <a href="#contact" className="btn-outline-glow flex items-center gap-2.5">
            <MessageCircle size={18} />
            Contact Me
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-glow flex items-center gap-2.5"
          >
            <FileText size={18} />
            View Resume
          </a>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="hidden lg:block"
        >
          {[
            { text: "<React />", top: "8rem", left: "3rem", delay: "0s" },
            { text: "TypeScript", top: "12rem", right: "4rem", delay: "1.5s" },
            { text: "Node.js", bottom: "10rem", left: "5rem", delay: "3s" },
            { text: "Prisma", bottom: "14rem", right: "6rem", delay: "4.5s" },
          ].map((item) => (
            <div
              key={item.text}
              className="absolute glass-card-static px-4 py-2.5 text-xs code-font text-muted-foreground/60 animate-float-slow"
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                bottom: item.bottom,
                animationDelay: item.delay,
              }}
            >
              {item.text}
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="text-muted-foreground/40 hover:text-primary transition-colors duration-500"
          >
            <ArrowDown size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
