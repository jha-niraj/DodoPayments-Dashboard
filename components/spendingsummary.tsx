"use client";

import { Card } from "@/components/ui/card";
import {
    PieChart, Info
} from "lucide-react";
import {
    PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip
} from 'recharts';
import AnimatedNumber from "./AnimatedNumber";
import { useState } from "react";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";

// Define Types for our data structure
type SpendingItem = {
    category: string;
    amount: number;
    icon: any;
    color: string;
    iconColor: string;
    bg: string;
};

type PeriodData = {
    [key: string]: {
        limit: number;
        items: SpendingItem[];
    };
};

const shoppingSvg = (
    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.625 0H10.875C10.9914 0 11.1063 0.0271087 11.2104 0.0791795C11.3146 0.13125 11.4051 0.206853 11.475 0.3L13.5 3V14.25C13.5 14.4489 13.421 14.6397 13.2803 14.7803C13.1397 14.921 12.9489 15 12.75 15H0.75C0.551088 15 0.360322 14.921 0.21967 14.7803C0.0790176 14.6397 0 14.4489 0 14.25V3L2.025 0.3C2.09486 0.206853 2.18545 0.13125 2.28959 0.0791795C2.39373 0.0271087 2.50857 0 2.625 0ZM12 4.5H1.5V13.5H12V4.5ZM11.625 3L10.5 1.5H3L1.875 3H11.625ZM4.5 6V7.5C4.5 8.09674 4.73705 8.66903 5.15901 9.09099C5.58097 9.51295 6.15326 9.75 6.75 9.75C7.34674 9.75 7.91903 9.51295 8.34099 9.09099C8.76295 8.66903 9 8.09674 9 7.5V6H10.5V7.5C10.5 8.49456 10.1049 9.44839 9.40165 10.1517C8.69839 10.8549 7.74456 11.25 6.75 11.25C5.75544 11.25 4.80161 10.8549 4.09835 10.1517C3.39509 9.44839 3 8.49456 3 7.5V6H4.5Z" fill="#335CFF" />
    </svg>
)
const utiliteisSvg = (
    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.75 15H0.75C0.551088 15 0.360322 14.921 0.21967 14.7803C0.0790176 14.6397 0 14.4489 0 14.25V0.75C0 0.551088 0.0790176 0.360322 0.21967 0.21967C0.360322 0.0790176 0.551088 0 0.75 0H12.75C12.9489 0 13.1397 0.0790176 13.2803 0.21967C13.421 0.360322 13.5 0.551088 13.5 0.75V14.25C13.5 14.4489 13.421 14.6397 13.2803 14.7803C13.1397 14.921 12.9489 15 12.75 15ZM12 13.5V1.5H1.5V13.5H12ZM3.75 3.75H9.75V5.25H3.75V3.75ZM3.75 6.75H9.75V8.25H3.75V6.75ZM3.75 9.75H9.75V11.25H3.75V9.75Z" fill="#47C2FF" />
    </svg>
)
const othersSvg = (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 15C3.35775 15 0 11.6423 0 7.5C0 3.35775 3.35775 0 7.5 0C11.6423 0 15 3.35775 15 7.5C15 11.6423 11.6423 15 7.5 15ZM7.5 13.5C9.0913 13.5 10.6174 12.8679 11.7426 11.7426C12.8679 10.6174 13.5 9.0913 13.5 7.5C13.5 5.9087 12.8679 4.38258 11.7426 3.25736C10.6174 2.13214 9.0913 1.5 7.5 1.5C5.9087 1.5 4.38258 2.13214 3.25736 3.25736C2.13214 4.38258 1.5 5.9087 1.5 7.5C1.5 9.0913 2.13214 10.6174 3.25736 11.7426C4.38258 12.8679 5.9087 13.5 7.5 13.5ZM4.875 9H9C9.09946 9 9.19484 8.96049 9.26517 8.89017C9.33549 8.81984 9.375 8.72446 9.375 8.625C9.375 8.52554 9.33549 8.43016 9.26517 8.35983C9.19484 8.28951 9.09946 8.25 9 8.25H6C5.50272 8.25 5.02581 8.05246 4.67417 7.70083C4.32254 7.34919 4.125 6.87228 4.125 6.375C4.125 5.87772 4.32254 5.40081 4.67417 5.04917C5.02581 4.69754 5.50272 4.5 6 4.5H6.75V3H8.25V4.5H10.125V6H6C5.90054 6 5.80516 6.03951 5.73483 6.10983C5.66451 6.18016 5.625 6.27554 5.625 6.375C5.625 6.47446 5.66451 6.56984 5.73483 6.64017C5.80516 6.71049 5.90054 6.75 6 6.75H9C9.49728 6.75 9.97419 6.94754 10.3258 7.29917C10.6775 7.65081 10.875 8.12772 10.875 8.625C10.875 9.12228 10.6775 9.59919 10.3258 9.95082C9.97419 10.3025 9.49728 10.5 9 10.5H8.25V12H6.75V10.5H4.875V9Z" fill="#525866" />
    </svg>
)

const SpendingSummarySection = () => {
    const [period, setPeriod] = useState("week");

    const dataMap: PeriodData = {
        week: {
            limit: 2000,
            items: [
                { category: "Shopping", amount: 900.00, icon: shoppingSvg, color: "#3b82f6", iconColor: "text-blue-500", bg: "bg-blue-50" },
                { category: "Utilities", amount: 600.00, icon: utiliteisSvg, color: "#38bdf8", iconColor: "text-sky-400", bg: "bg-sky-50" },
                { category: "Others", amount: 200.00, icon: othersSvg, color: "#e2e8f0", iconColor: "text-slate-500", bg: "bg-slate-100" },
            ]
        },
        month: {
            limit: 8000,
            items: [
                { category: "Shopping", amount: 3250.50, icon: shoppingSvg, color: "#3b82f6", iconColor: "text-blue-500", bg: "bg-blue-50" },
                { category: "Utilities", amount: 1450.00, icon: utiliteisSvg, color: "#38bdf8", iconColor: "text-sky-400", bg: "bg-sky-50" },
                { category: "Others", amount: 980.00, icon: othersSvg, color: "#e2e8f0", iconColor: "text-slate-500", bg: "bg-slate-100" },
            ]
        },
        year: {
            limit: 95000,
            items: [
                { category: "Shopping", amount: 45200.00, icon: shoppingSvg, color: "#3b82f6", iconColor: "text-blue-500", bg: "bg-blue-50" },
                { category: "Utilities", amount: 28400.00, icon: utiliteisSvg, color: "#38bdf8", iconColor: "text-sky-400", bg: "bg-sky-50" },
                { category: "Others", amount: 12500.00, icon: othersSvg, color: "#e2e8f0", iconColor: "text-slate-500", bg: "bg-slate-100" },
            ]
        }
    };

    const currentData = dataMap[period];
    const totalSpend = currentData.items.reduce((acc, item) => acc + item.amount, 0);

    return (
        <Card className="p-4 w-full max-w-lg mx-auto bg-white dark:bg-neutral-950 shadow-sm border border-gray-200 dark:border-neutral-700 flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
                <h2 className="text-base font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                    <PieChart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    Spending Summary
                </h2>
                <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-[140px] h-9 cursor-pointer border border-gray-200 dark:border-neutral-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all">
                        <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="week">Last Week</SelectItem>
                        <SelectItem value="month">Last Month</SelectItem>
                        <SelectItem value="year">Last Year</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="relative h-48 w-full -mt-9 border-b">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                        <Pie
                            data={currentData.items}
                            cx="50%"
                            cy="85%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius={130}
                            outerRadius={150}
                            paddingAngle={3}
                            dataKey="amount"
                            cornerRadius={6}
                            stroke="none"
                            isAnimationActive={true}
                            animationDuration={1000}
                        >
                            {
                                currentData.items.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))
                            }
                        </Pie>
                        <RechartsTooltip
                            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                    </RechartsPie>
                </ResponsiveContainer>
                <div className="absolute top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-[20px] font-medium text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-1">SPEND</p>
                    <div className="text-3xl font-bold text-black dark:text-white">
                        <AnimatedNumber
                            value={totalSpend}
                            decimals={2}
                            prefix="$"
                            className="text-3xl font-bold tracking-tight"
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 divide-x divide-gray-100">
                {
                    currentData.items.map((item) => (
                        <div key={item.category} className="flex flex-col items-center px-2">
                            <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center mb-3 transition-colors duration-300`}>
                                {
                                    item.icon
                                }
                            </div>
                            <span className="text-sm text-gray-800 dark:text-gray-200 mb-1">{item.category}</span>
                            <span className="font-bold text-black dark:text-white text-sm">
                                <AnimatedNumber
                                    value={item.amount}
                                    decimals={2}
                                    prefix="$"
                                    className="font-bold"
                                />
                            </span>
                        </div>
                    ))
                }
            </div>
            <div className="rounded-lg p-3 border border-gray-200 dark:border-neutral-700 flex items-center justify-between transition-all duration-300">
                <p className="text-xs text-gray-800 dark:text-gray-200 font-medium">
                    Your {period === 'year' ? 'yearly' : period === 'month' ? 'monthly' : 'weekly'} spending limit is
                    <span className="font-bold text-black dark:text-white ml-1">
                        ${currentData.limit.toLocaleString()}
                    </span>.
                </p>
                <TooltipProvider>
                    <Tooltip key="spending-limit-tooltip" delayDuration={200}>
                        <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-center">Your spending limit is the maximum amount <br /> you can spend within the selected period.</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </Card>
    );
};

export default SpendingSummarySection;