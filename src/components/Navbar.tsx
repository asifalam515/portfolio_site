import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
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
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "nav-blur shadow-lg" : ""
      }`}
    >
      <div className="container-narrow flex items-center justify-between h-16 sm:h-20">
        <a
          href="#"
          className="text-lg font-bold gradient-text code-font tracking-tight"
        >
          &lt;Asibul /&gt;
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-[13px] font-medium transition-all duration-300 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
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
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
            <motion.div
              animate={{ rotate: mobileOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden nav-blur border-t border-border overflow-hidden"
          >
            <div className="container-narrow py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all duration-300"
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
