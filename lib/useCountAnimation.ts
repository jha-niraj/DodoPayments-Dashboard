"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

export function useCountAnimation(target: number, duration: number = 2) {
    const count = useMotionValue(0);
    const springCount = useSpring(count, {
        stiffness: 50,
        damping: 30,
        duration: duration * 1000
    });
    
    useEffect(() => {
        count.set(target);
    }, [count, target]);

    return springCount;
}

export function useAnimatedNumber(value: number, decimals: number = 2) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });

    useEffect(() => {
        motionValue.set(value);
    }, [motionValue, value]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = latest.toFixed(decimals);
            }
        });

        return () => unsubscribe();
    }, [springValue, decimals]);

    return ref;
}