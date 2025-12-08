import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

function Navigation({ isMobile = false }) {
  const [activeLink, setActiveLink] = useState("#home");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.ul
      className="nav-ul"
      variants={isMobile ? containerVariants : undefined}
      initial={isMobile ? "hidden" : undefined}
      animate={isMobile ? "visible" : undefined}
    >
      {navItems.map((item, index) => (
        <motion.li
          key={item.name}
          className="nav-li"
          variants={isMobile ? itemVariants : undefined}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a
            className="nav-link group"
            href={item.href}
            onClick={() => setActiveLink(item.href)}
          >
            <span className="relative">
              {item.name}
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-aqua via-mint to-lavender"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
              {activeLink === item.href && (
                <motion.span
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-aqua to-lavender"
                  layoutId="activeLink"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </span>
          </a>
        </motion.li>
      ))}
    </motion.ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="navbar-container"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar-gradient-border">
        <div className="navbar-inner">
          <div className="mx-auto c-space max-w-7xl">
            <div className="flex items-center justify-between py-2 sm:py-3">
              {/* Logo with gradient animation */}
              <motion.a
                href="/"
                className="logo-text"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative">
                  <span className="logo-gradient">Lingeswaran</span>
                  <motion.span
                    className="logo-glow"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </span>
              </motion.a>

              {/* Mobile menu button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="menu-button"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.img
                  src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
                  className="w-6 h-6"
                  alt="toggle"
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              {/* Desktop navigation */}
              <nav className="hidden sm:flex">
                <Navigation />
              </nav>
            </div>
          </div>

          {/* Mobile navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <nav className="pb-6 pt-2">
                  <Navigation isMobile={true} />
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
