"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TextLoader({ done }: { done: boolean }) {
  const words = ["DISCOVER", "TRUE", "NORTH"];
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const wordDuration = 1500; // ms
  const totalDuration = words.length * wordDuration; // total time for all words

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
    }, wordDuration);

    return () => clearInterval(interval);
  }, [done, finished]);

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div className="flex flex-col items-center justify-center text-center w-full">
            <motion.h1
              key={words[index]}
              initial={{ opacity: 0, y: 10, scale: 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.5 }}
              transition={{ duration: 1 }}
              className={`text-white font-light tracking-wide leading-tight ${
                index === 0
                  ? "text-[4.5rem] sm:text-[6rem] md:text-[8rem]"
                  : "text-[5rem] sm:text-[7rem] md:text-[9rem]"
              }`}
            >
              {words[index] === "NORTH" ? (
                <>
                  N
                  <motion.span
                    className="text-red-600 font-bold inline-block"
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

            {/* Persistent Progress Bar */}
            <div className="w-[80%] h-1 bg-white/20 rounded-full mt-8 overflow-hidden">
              <motion.div
                className="h-full bg-red-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: totalDuration / 1000, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
