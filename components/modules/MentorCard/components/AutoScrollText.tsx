import "twin.macro";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                               AutoScroll Text                              */
/* -------------------------------------------------------------------------- */

export function AutoScrollText({ text }: { text?: string }) {
    const [scrollingEnabled, setEnableScrolling] = useState(false);
    const detectShouldAutoScrollRef = useCallback((node) => {
        if (node !== null) setEnableScrolling(node.scrollWidth > node.clientWidth);
    }, []);
    return (
        <div tw="relative w-full">
            {/* Gradient Overlay for fading to right (transparent to white)*/}
            <div tw="w-full h-full absolute top-0 z-10 background[linear-gradient(90deg, rgba(255,255,255,0) 75%, white 100%)]" />
            <motion.p
                ref={detectShouldAutoScrollRef}
                animate={scrollingEnabled && { x: "-50%" }}
                transition={{
                    repeat: Infinity,
                    duration: Math.max(1, (text ?? "").length / 10),
                    repeatType: "reverse",
                    repeatDelay: 3,
                }}>
                {text}
            </motion.p>
        </div>
    );
}
