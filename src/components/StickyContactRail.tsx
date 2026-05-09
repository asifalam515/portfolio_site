import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    href: "https://github.com/asifalam515",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/asibul-alam-asif/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "mailto:asibulalam515@gmail.com",
    icon: Mail,
    label: "Email",
  },
];

const StickyContactRail = () => {
  return (
    <aside
      className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[45]"
      aria-label="Quick contact links"
    >
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-border/70 bg-background/70 backdrop-blur-xl p-2 shadow-[0_8px_30px_hsl(var(--foreground)/0.12)]">
        {socialLinks.map((link, index) => {
          const Icon = link.icon;
          const isExternal = link.href.startsWith("http");

          return (
            <motion.a
              key={link.label}
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.08, duration: 0.35 }}
              whileHover={{ x: -2, scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-muted/40 text-muted-foreground transition-colors duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              aria-label={link.label}
            >
              <Icon size={17} />
              <span className="pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded-md border border-border/70 bg-background/90 px-2 py-1 text-xs text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {link.label}
              </span>
            </motion.a>
          );
        })}
      </div>
    </aside>
  );
};

export default StickyContactRail;
