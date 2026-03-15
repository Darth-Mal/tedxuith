"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TextLoader({ done }: { done: boolean }) {
  const words = ["DISCOVER", "TRUE", "NORTH"];
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % words.length;

        if (done && next === 0) {
          setFinished(true);
        }

        return next;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [done, finished]);

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          className="fixed inset-0 bg-black flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div className="flex flex-col items-center justify-center text-center">
            <motion.h1
              key={words[index]}
              initial={{ opacity: 0, y: 10, scale: 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.5 }}
              transition={{ duration: 1 }}
              className={`text-white font-light tracking-wide leading-tight ${
                index === 0
                  ? "text-[4.5rem] sm:text-[6rem] md:text-[8rem]" // DISCOVER slightly smaller
                  : "text-[5rem] sm:text-[7rem] md:text-[9rem]"
              }`}
            >
              {words[index] === "NORTH" ? (
                <>
                  N
                  <motion.span
                    className="text-red-600 font-bold inline-block" // solid O
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    O
                  </motion.span>
                  RTH
                </>
              ) : (
                words[index]
              )}
            </motion.h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
