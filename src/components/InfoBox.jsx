import React, { useState } from "react";
import { motion } from "framer-motion";

const InfoBox = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      transition={{ layout: { duration: 1, type: "spring" } }}
      layout
      onClick={() => setIsOpen(!isOpen)}
      style={{
        borderRadius: "1rem",
        boxShadow: "0px 10px 30px rdba(0, 0, 0, 0.5)",
        backgroundColor: props.colour,
      }}
      className="card"
    >
      <motion.h2 layout="position">{props.defaultText}</motion.h2>
      {isOpen && (
        <motion.div>
          {props.expandedText.map((paragraph) => (
            <p>{paragraph}</p>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default InfoBox;
