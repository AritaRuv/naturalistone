import React from "react";
import { motion} from "framer-motion";
import "./styles.css";

const Section = ({ children}) => {
  return (
    <motion.section
    >
      {children}
    </motion.section>
  );
};

export default Section;
