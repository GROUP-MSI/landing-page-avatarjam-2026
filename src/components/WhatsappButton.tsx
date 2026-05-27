import { motion, useAnimation, type Variants } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect } from "react";
import "./WhatsappButton.css";

export default function WhatsAppButton() {
  const phone = "59178824516";
  const message = "Hola, quiero información";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  const controls = useAnimation();

  useEffect(() => {
    // Animación de entrada después de 1 segundo
    const timer = setTimeout(() => {
      controls.start("visible");
    }, 1000);

    return () => clearTimeout(timer);
  }, [controls]);

  const buttonVariants: Variants = {
    hidden: {
      scale: 0,
      opacity: 0,
      y: 50,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  const pulseVariants: Variants = {
    animate: {
      scale: [1, 1.1, 1],
      boxShadow: [
        "0 0 0 0 rgba(37, 211, 102, 0.7)",
        "0 0 0 20px rgba(37, 211, 102, 0)",
        "0 0 0 0 rgba(37, 211, 102, 0)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  return (
    <div className="whatsapp-container">
      {/* Efecto de ondas/pulso detrás del botón */}
      <motion.div
        className="whatsapp-pulse"
        variants={pulseVariants}
        animate="animate"
      />

      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        variants={buttonVariants}
        initial="hidden"
        animate={controls}
        whileHover={{
          scale: 1.15,
          rotate: [0, -10, 10, 0],
          transition: { duration: 0.5 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <FaWhatsapp size={32} />

        {/* Tooltip */}
        <motion.span
          className="whatsapp-tooltip"
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
        >
          Contáctanos
        </motion.span>
      </motion.a>

      {/* Badge de notificación opcional */}
      <motion.span
        className="whatsapp-badge"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
      >
        1
      </motion.span>
    </div>
  );
}
