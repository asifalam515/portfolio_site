import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SectionDivider = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px" });

  return (
    <div ref={ref} className="relative py-4 overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="section-divider origin-center"
      />
    </div>
  );
};

export default SectionDivider;
