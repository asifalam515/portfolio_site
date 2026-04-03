import { motion, useInView } from "framer-motion";
import { Coffee, Github, Heart, Linkedin, Mail } from "lucide-react";
import { useRef } from "react";

const links = [
  { href: "https://github.com/Asibulalam515", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/Asibul", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:Asibul@example.com", icon: Mail, label: "Email" },
];

const Footer = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px" });

  return (
    <footer ref={ref} className="relative border-t border-border">
      {/* Gradient top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "var(--gradient-primary)", opacity: 0.3 }}
      />

      <div className="container-narrow py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Logo */}
          <a href="#" className="text-2xl font-bold gradient-text code-font">
            &lt;Asibul /&gt;
          </a>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors duration-200"
                  aria-label={link.label}
                >
                  <Icon size={18} />
                </motion.a>
              );
            })}
          </div>

          {/* Message */}
          <p className="text-sm text-muted-foreground flex items-center gap-1.5 flex-wrap justify-center">
            Built with React, TypeScript and lots of
            <Coffee size={14} className="text-primary" />
            coffee.
          </p>

          {/* Copyright */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
            <span>© {new Date().getFullYear()}</span>
            <span className="gradient-text font-semibold">Asibul</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Made with <Heart size={10} className="text-primary" />
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
