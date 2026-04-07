import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    clipPath: "inset(0 0 100% 0 round 1rem)",
    transition: {
      duration: 0.35,
      ease: [0.32, 0, 0.67, 0],
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0 round 1rem)",
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
};

const mobileItemVariants = {
  closed: { opacity: 0, y: -8 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      if (!isHome) {
        setActiveSection("");
        return;
      }

      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 pt-2 sm:pt-3"
    >
      <motion.div
        animate={{
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          boxShadow: scrolled
            ? "0 12px 36px -20px hsl(var(--foreground) / 0.35)"
            : "0 0 0 0 hsl(var(--foreground) / 0)",
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`container-narrow rounded-2xl border transition-colors duration-500 ${
          scrolled
            ? "bg-background/65 border-border/80"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-16 sm:h-20 px-3 sm:px-5">
          <a
            href={isHome ? "#" : "/"}
            className="text-lg font-bold gradient-text code-font tracking-tight"
          >
            &lt;Asibul /&gt;
          </a>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <motion.a
                  key={link.href}
                  href={isHome ? link.href : `/${link.href}`}
                  className={`group relative px-4 py-2 text-[13px] font-medium transition-all duration-300 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{link.label}</span>
                  <motion.span
                    className="absolute left-2 right-2 -bottom-[1px] h-[2px] origin-left rounded-full bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.a>
              );
            })}
            <div className="ml-3 w-px h-5 bg-border" />
            <a
              href="https://drive.google.com/file/d/1mesJCLX2pOP8daX7j06gJ3PKZ8qDZz74/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-5 py-2 text-xs font-medium rounded-lg btn-primary-gradient !py-2 !px-5"
            >
              Resume
            </a>
            <button
              onClick={() => setDark(!dark)}
              className="ml-3 p-2.5 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-500"
              aria-label="Toggle theme"
            >
              <motion.div
                key={dark ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {dark ? <Sun size={15} /> : <Moon size={15} />}
              </motion.div>
            </button>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-xl border border-border"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl border border-border"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle mobile menu"
            >
              <motion.div
                animate={{ rotate: mobileOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="lg:hidden mt-2"
            id="mobile-nav"
          >
            <div className="container-narrow rounded-2xl nav-blur border border-border/80 overflow-hidden py-3">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={isHome ? link.href : `/${link.href}`}
                  onClick={() => setMobileOpen(false)}
                  variants={mobileItemVariants}
                  custom={i}
                  className="mx-2 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
