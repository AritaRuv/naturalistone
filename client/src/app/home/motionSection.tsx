import React from "react";
import { motion } from "framer-motion";
import "./styles.css";

interface SectionProps {
  children: React.ReactNode;
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(({ children }, ref) => {
  return (
    <motion.section ref={ref}>
      {children}
    </motion.section>
  );
});

export default Section;
