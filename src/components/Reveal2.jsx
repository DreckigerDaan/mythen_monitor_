import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export const Reveal2 = ({ width = "100%" }) => {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, margin: "-150px 0px" });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width,
        display: "flex",
        justifyContent: "center", // Zentriert die hr horizontal
        alignItems: "center", // Zentriert vertikal
        // Nimmt die volle Breite des Containers ein
      }}
    >
      <motion.hr
        variants={{
          hidden: { opacity: 0, width: "10%" }, // Start mit 10% Breite
          visible: { opacity: 1, width: "50%" }, // Animation auf 50% Breite
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          border: "none",
          height: "2px", // Dicke der Linie
          backgroundColor: "yellow", // Farbe der Linie
          margin: "50px auto", // Sorgt dafür, dass die Linie zentriert bleibt
        }}
      />
    </div>
  );
};
