"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedNumber from "./AnimatedNumber";

const CreditScoreCard = () => {
    const targetScore = 710;
    const [currentScore, setCurrentScore] = useState(0);

    // Simulate score animation on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentScore(targetScore);
        }, 100); // Start slightly after mount
        return () => clearTimeout(timer);
    }, []);

    // Configuration for the bars
    const totalBars = 35;
    const minScore = 300;
    const maxScore = 850;

    // Calculate how many bars should be filled based on the current score animation
    const range = maxScore - minScore;
    const scorePercent = Math.max(0, Math.min(100, ((currentScore - minScore) / range) * 100));
    const filledBarsCount = Math.round((scorePercent / 100) * totalBars);

    return (
        <Card className="p-4 w-full max-w-lg mx-auto bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-700 shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                    <div className="p-1 rounded-md bg-gray-100">
                        <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.3 8.49389C15.3 10.3703 14.5389 12.069 13.3084 13.2988L14.5104 14.5C16.0486 12.9629 17 10.8394 17 8.49389C17 3.80284 13.1944 0 8.5 0C3.80558 0 0 3.80284 0 8.49389C0 10.8394 0.951396 12.9629 2.48959 14.5L3.69168 13.2988C2.46112 12.069 1.7 10.3703 1.7 8.49389C1.7 4.74105 4.74446 1.69878 8.5 1.69878C12.2556 1.69878 15.3 4.74105 15.3 8.49389ZM11.2991 4.49579L7.47405 8.31806L8.67612 9.51927L12.5011 5.697L11.2991 4.49579Z" fill="#525866" />
                        </svg>
                    </div>
                    Credit Score
                </h3>
                <Button variant="ghost" size="sm" className="text-xs cursor-pointer border h-8 px-2">
                    Details
                </Button>
            </div>
            <div className="">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-gray-800 dark:text-gray-200 mb-1">
                            Your
                            <span className="text-black dark:text-white font-bold text-lg ml-1.5 mr-1.5">
                                credit score
                            </span>
                            is
                            <span className="text-black dark:text-white font-bold text-lg ml-1.5">
                                <AnimatedNumber value={targetScore} decimals={0} />
                            </span>
                        </p>
                        <p className="text-xs text-gray-800 dark:text-gray-200">
                            This score is considered to be <span className="text-green-600 font-medium">Excellent</span>.
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-xl border border-orange-100 shadow-sm">
                        😎
                    </div>
                </div>
                <div className="mt-8 mb-2">
                    <div className="flex justify-between items-end gap-[2px] h-10">
                        {
                            Array.from({ length: totalBars }).map((_, index) => {
                                const normalizedIndex = index / (totalBars - 1);
                                const heightMod = Math.sin(normalizedIndex * Math.PI);
                                const barHeight = 20 + (heightMod * 20); 

                                const isFilled = index < filledBarsCount;

                                return (
                                    <div
                                        key={index}
                                        className={`w-full rounded-full transition-all duration-500 ease-out ${isFilled
                                            ? 'bg-green-500'
                                            : 'bg-gray-100'
                                            }`}
                                        style={{
                                            height: `${barHeight}px`,
                                            transitionDelay: `${index * 15}ms`
                                        }}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 font-medium px-1">
                    <span>300</span>
                    <span>850</span>
                </div>
            </div>
        </Card>
    );
};

export default CreditScoreCard;