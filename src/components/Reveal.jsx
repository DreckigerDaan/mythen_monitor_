import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { main } from "framer-motion/client";

export const Reveal = ({ children, width = "100%" }) => {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, margin: "-150px 0px" });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);
  return (
    <div
      ref={ref}
      style={{
        width,
        overflow: "hidden",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ width: "100%" }}
      >
        {children}
      </motion.div>
    </div>
  );
};
