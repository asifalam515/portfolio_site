import { api } from "@/services/api";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Loader2, Mail, Send } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [focusedField, setFocusedField] = useState<
    "name" | "email" | "message" | null
  >(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.submitContact(form);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
    setSending(false);
  };

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-primary code-font mb-3">
            // contact
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold">
            Let's <span className="gradient-text">Connect</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 space-y-6"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <motion.label
                  animate={{
                    color:
                      focusedField === "name"
                        ? "hsl(var(--primary))"
                        : "hsl(var(--foreground))",
                  }}
                  transition={{ duration: 0.25 }}
                  className="text-sm font-medium block"
                >
                  Name
                </motion.label>
                <motion.div
                  animate={{
                    boxShadow:
                      focusedField === "name"
                        ? "0 0 0 1px hsl(var(--primary) / 0.45), 0 0 24px -10px hsl(var(--primary) / 0.45)"
                        : "0 0 0 1px hsl(var(--border) / 0.2), 0 0 0px 0px hsl(var(--primary) / 0)",
                  }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-lg"
                >
                  <input
                    type="text"
                    required
                    value={form.name}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-transparent focus:outline-none transition-colors text-sm"
                    placeholder="Your name"
                  />
                </motion.div>
              </div>

              <div className="space-y-2">
                <motion.label
                  animate={{
                    color:
                      focusedField === "email"
                        ? "hsl(var(--primary))"
                        : "hsl(var(--foreground))",
                  }}
                  transition={{ duration: 0.25 }}
                  className="text-sm font-medium block"
                >
                  Email
                </motion.label>
                <motion.div
                  animate={{
                    boxShadow:
                      focusedField === "email"
                        ? "0 0 0 1px hsl(var(--primary) / 0.45), 0 0 24px -10px hsl(var(--primary) / 0.45)"
                        : "0 0 0 1px hsl(var(--border) / 0.2), 0 0 0px 0px hsl(var(--primary) / 0)",
                  }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-lg"
                >
                  <input
                    type="email"
                    required
                    value={form.email}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-transparent focus:outline-none transition-colors text-sm"
                    placeholder="your@email.com"
                  />
                </motion.div>
              </div>

              <div className="space-y-2">
                <motion.label
                  animate={{
                    color:
                      focusedField === "message"
                        ? "hsl(var(--primary))"
                        : "hsl(var(--foreground))",
                  }}
                  transition={{ duration: 0.25 }}
                  className="text-sm font-medium block"
                >
                  Message
                </motion.label>
                <motion.div
                  animate={{
                    boxShadow:
                      focusedField === "message"
                        ? "0 0 0 1px hsl(var(--primary) / 0.45), 0 0 24px -10px hsl(var(--primary) / 0.45)"
                        : "0 0 0 1px hsl(var(--border) / 0.2), 0 0 0px 0px hsl(var(--primary) / 0)",
                  }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-lg"
                >
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-transparent focus:outline-none transition-colors text-sm resize-none"
                    placeholder="Tell me about your project..."
                  />
                </motion.div>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={sending}
              whileTap={sending ? undefined : { scale: 0.99 }}
              animate={sending ? { scale: [1, 1.01, 1] } : { scale: 1 }}
              transition={{ duration: 1, repeat: sending ? Infinity : 0 }}
              className="btn-primary-gradient w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span className="inline-flex items-center gap-0.5">
                    Sending
                    <motion.span
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      .
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    >
                      .
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    >
                      .
                    </motion.span>
                  </span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4">Get in touch</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:asibulalam515@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail size={18} className="text-primary" />
                </div>
                <span className="text-sm link-underline-smooth">
                  asibulalam515@gmail.com
                </span>
              </a>
              <a
                href="https://github.com/asifalam515"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Github size={18} className="text-primary" />
                </div>
                <span className="text-sm link-underline-smooth">
                  github.com/asifalam515
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/asibul-alam-b90612197/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Linkedin size={18} className="text-primary" />
                </div>
                <span className="text-sm link-underline-smooth">
                  linkedin.com/in/asibul-alam-b90612197
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
