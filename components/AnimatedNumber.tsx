"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, animate } from "framer-motion";

interface AnimatedNumberProps {
    value: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
}

export default function AnimatedNumber({
    value,
    decimals = 2,
    prefix = "",
    suffix = "",
    className = ""
}: AnimatedNumberProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 20,
        stiffness: 300
    });

    useEffect(() => {
        const controls = animate(motionValue, value, {
            duration: 0.5,
            ease: "easeOut"
        });

        return controls.stop;
    }, [motionValue, value]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                const formatted = latest.toLocaleString('en-US', {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals
                });
                ref.current.textContent = `${prefix}${formatted}${suffix}`;
            }
        });

        return () => unsubscribe();
    }, [springValue, decimals, prefix, suffix]);

    return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}