import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ExternalLink, FileText, MessageCircle } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import InteractiveGrid from "./InteractiveGrid";

gsap.registerPlugin(ScrollTrigger);

const heroWords = ["Hi,", "I'm", "Asibul"];

const floatingItems = [
  { text: "<React />", top: "8rem", left: "3rem", delay: "0s", depth: "near" },
  {
    text: "TypeScript",
    top: "12rem",
    right: "4rem",
    delay: "1.5s",
    depth: "far",
  },
  { text: "Node.js", bottom: "10rem", left: "5rem", delay: "3s", depth: "far" },
  {
    text: "Prisma",
    bottom: "14rem",
    right: "6rem",
    delay: "4.5s",
    depth: "near",
  },
];

type MagneticLinkProps = {
  href: string;
  className: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
};

const MagneticLink = ({
  href,
  className,
  children,
  target,
  rel,
}: MagneticLinkProps) => {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.35 });

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(((event.clientX - centerX) / rect.width) * 16);
    y.set(((event.clientY - centerY) / rect.height) * 12);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.035 }}
      transition={{ type: "spring", stiffness: 260, damping: 16 }}
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      className={className}
      data-hero-cta
    >
      {children}
    </motion.a>
  );
};

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set(
        "[data-hero-badge], [data-hero-word], [data-hero-subtitle], [data-hero-tagline], [data-hero-cta], [data-hero-float], [data-hero-scroll-indicator], [data-hero-grid], [data-hero-orb]",
        { willChange: "transform, opacity" },
      );

      timeline
        .fromTo(
          "[data-hero-badge]",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.7, force3D: true },
        )
        .fromTo(
          "[data-hero-word]",
          { autoAlpha: 0, yPercent: 120, rotateX: -50 },
          {
            autoAlpha: 1,
            yPercent: 0,
            rotateX: 0,
            stagger: 0.1,
            duration: 0.85,
            force3D: true,
          },
          "-=0.32",
        )
        .fromTo(
          "[data-hero-subtitle]",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.7, force3D: true },
          "-=0.38",
        )
        .fromTo(
          "[data-hero-tagline]",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8, force3D: true },
          "-=0.48",
        )
        .fromTo(
          "[data-hero-cta]",
          { autoAlpha: 0, y: 24, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.65,
            force3D: true,
          },
          "-=0.45",
        )
        .fromTo(
          "[data-hero-float]",
          { autoAlpha: 0, y: 24, scale: 0.95 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            stagger: 0.11,
            duration: 0.6,
            force3D: true,
          },
          "-=0.3",
        )
        .fromTo(
          "[data-hero-scroll-indicator]",
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.5, force3D: true },
          "-=0.2",
        );

      gsap.to("[data-hero-grid]", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to("[data-hero-orb='left']", {
        y: -75,
        x: 26,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to("[data-hero-orb='right']", {
        y: -55,
        x: -22,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      gsap.to("[data-hero-orb='center']", {
        y: -35,
        x: 16,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to("[data-hero-parallax='near']", {
        y: -48,
        x: 10,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to("[data-hero-parallax='far']", {
        y: -28,
        x: -8,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to("[data-hero-float]", {
        y: -10,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.35, from: "random" },
        force3D: true,
      });

      timeline.eventCallback("onComplete", () => {
        gsap.set(
          "[data-hero-badge], [data-hero-word], [data-hero-subtitle], [data-hero-tagline], [data-hero-cta], [data-hero-scroll-indicator]",
          { clearProps: "willChange" },
        );
      });
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ambient glow orbs */}
      <div
        data-hero-orb="left"
        className="hero-gradient-orb w-[600px] h-[600px] bg-primary top-1/4 -left-64 opacity-[0.08] animate-glow-pulse"
      />
      <div
        data-hero-orb="right"
        className="hero-gradient-orb w-[500px] h-[500px] bg-secondary top-1/3 -right-48 opacity-[0.05] animate-glow-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        data-hero-orb="center"
        className="hero-gradient-orb w-[400px] h-[400px] bg-accent bottom-1/4 left-1/3 opacity-[0.04] animate-glow-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Interactive grid */}
      <div data-hero-grid>
        <InteractiveGrid />
      </div>

      {/* Radial fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 70%)",
        }}
      />

      <div className="container-narrow relative z-10 text-center">
        {/* Badge */}
        <motion.div
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
          initial={prefersReducedMotion ? false : undefined}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card-static text-sm text-muted-foreground mb-10"
          data-hero-badge
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for freelance work
        </motion.div>

        {/* Name */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] mb-8 leading-[1.05] [perspective:900px]">
          {heroWords.map((word) => (
            <span
              key={word}
              className="inline-block overflow-hidden align-bottom mr-3 last:mr-0"
            >
              <span
                data-hero-word
                className={
                  word === "Asibul"
                    ? "gradient-text inline-block"
                    : "inline-block"
                }
                style={{ opacity: prefersReducedMotion ? 1 : 0 }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Title */}
        <div
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
          className="mb-8"
          data-hero-subtitle
        >
          <span className="text-xl sm:text-2xl font-medium text-muted-foreground code-font tracking-tight">
            Full Stack Developer
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed"
          data-hero-tagline
        >
          I build fast, scalable and elegant web applications.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
          <MagneticLink
            href="#projects"
            className="btn-primary-gradient flex items-center gap-2.5"
          >
            <ExternalLink size={18} />
            View Projects
          </MagneticLink>
          <MagneticLink
            href="#contact"
            className="btn-outline-glow flex items-center gap-2.5"
          >
            <MessageCircle size={18} />
            Contact Me
          </MagneticLink>
          <MagneticLink
            href="https://drive.google.com/file/d/1mesJCLX2pOP8daX7j06gJ3PKZ8qDZz74/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-glow flex items-center gap-2.5"
          >
            <FileText size={18} />
            View Resume
          </MagneticLink>
        </div>

        {/* Floating elements */}
        <div className="hidden lg:block">
          {floatingItems.map((item) => (
            <div
              key={item.text}
              className="absolute glass-card-static px-4 py-2.5 text-xs code-font text-muted-foreground/60 animate-float-slow"
              style={{
                opacity: prefersReducedMotion ? 1 : 0,
                top: item.top,
                left: item.left,
                right: item.right,
                bottom: item.bottom,
                animationDelay: item.delay,
              }}
              data-hero-float
              data-hero-parallax={item.depth}
            >
              {item.text}
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          data-hero-scroll-indicator
        >
          <motion.a
            href="#about"
            animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
            }
            className="text-muted-foreground/40 hover:text-primary transition-colors duration-500"
          >
            <ArrowDown size={20} />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
