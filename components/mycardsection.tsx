"use client";

import {
    Plus, Check, ChevronLeft, ChevronRight, CreditCard as CreditCardIcon, Wifi
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Tabs, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { useState } from "react";
import AnimatedNumber from "./AnimatedNumber";

const cardsData = [
    {
        id: 1,
        name: "Business Card",
        brand: "mastercard",
        amount: 24350.50,
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#335CFF" />
                <path opacity="0.48" d="M15.4244 25.3192C15.0551 25.3192 14.71 25.5027 14.5034 25.8088L12.1693 29.2673C11.6713 30.0053 12.2 31 13.0903 31H24.5112C24.8805 31 25.2257 30.8165 25.4322 30.5104L33.8307 18.066C34.3287 17.328 33.8 16.3333 32.9097 16.3333H25.1826C24.8133 16.3333 24.4681 16.5168 24.2616 16.8229L19.3536 24.0953C18.8371 24.8605 17.9743 25.3192 17.0511 25.3192H15.4244Z" fill="url(#paint0_linear_92_1022)" />
                <path d="M13.6666 10.0303C14.0744 9.38864 14.7818 9 15.5421 9H24.9773C25.8538 9 26.3852 9.96737 25.9151 10.7071L18.3334 22.6364C17.9256 23.278 17.2182 23.6667 16.4579 23.6667H7.02269C6.14621 23.6667 5.61481 22.6993 6.08494 21.9596L13.6666 10.0303Z" fill="url(#paint1_linear_92_1022)" />
                <defs>
                    <linearGradient id="paint0_linear_92_1022" x1="23" y1="16.3333" x2="23" y2="38.5732" gradientUnits="userSpaceOnUse">
                        <stop offset="0.313079" stop-color="white" />
                        <stop offset="1" stop-color="white" stop-opacity="0" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_92_1022" x1="16.0001" y1="9" x2="16.0001" y2="28.3944" gradientUnits="userSpaceOnUse">
                        <stop offset="0.38239" stop-color="white" />
                        <stop offset="1" stop-color="white" stop-opacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        ),
        themeColor: "bg-blue-600",
        textColor: "text-purple-600",
        spendingLimit: 5000,
        period: "month",
        progress: 0.45
    },
    {
        id: 2,
        name: "Savings Card",
        brand: "visa",
        amount: 16058.94,
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#335CFF" />
                <path opacity="0.48" d="M15.4244 25.3192C15.0551 25.3192 14.71 25.5027 14.5034 25.8088L12.1693 29.2673C11.6713 30.0053 12.2 31 13.0903 31H24.5112C24.8805 31 25.2257 30.8165 25.4322 30.5104L33.8307 18.066C34.3287 17.328 33.8 16.3333 32.9097 16.3333H25.1826C24.8133 16.3333 24.4681 16.5168 24.2616 16.8229L19.3536 24.0953C18.8371 24.8605 17.9743 25.3192 17.0511 25.3192H15.4244Z" fill="url(#paint0_linear_92_1022)" />
                <path d="M13.6666 10.0303C14.0744 9.38864 14.7818 9 15.5421 9H24.9773C25.8538 9 26.3852 9.96737 25.9151 10.7071L18.3334 22.6364C17.9256 23.278 17.2182 23.6667 16.4579 23.6667H7.02269C6.14621 23.6667 5.61481 22.6993 6.08494 21.9596L13.6666 10.0303Z" fill="url(#paint1_linear_92_1022)" />
                <defs>
                    <linearGradient id="paint0_linear_92_1022" x1="23" y1="16.3333" x2="23" y2="38.5732" gradientUnits="userSpaceOnUse">
                        <stop offset="0.313079" stop-color="white" />
                        <stop offset="1" stop-color="white" stop-opacity="0" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_92_1022" x1="16.0001" y1="9" x2="16.0001" y2="28.3944" gradientUnits="userSpaceOnUse">
                        <stop offset="0.38239" stop-color="white" />
                        <stop offset="1" stop-color="white" stop-opacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        ),
        themeColor: "bg-blue-600",
        textColor: "text-blue-600",
        spendingLimit: 1500,
        period: "week",
        progress: 0.6
    },
    {
        id: 3,
        name: "Premium Card",
        brand: "rupay",
        amount: 8725.30,
        icon: (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#335CFF" />
                <path opacity="0.48" d="M15.4244 25.3192C15.0551 25.3192 14.71 25.5027 14.5034 25.8088L12.1693 29.2673C11.6713 30.0053 12.2 31 13.0903 31H24.5112C24.8805 31 25.2257 30.8165 25.4322 30.5104L33.8307 18.066C34.3287 17.328 33.8 16.3333 32.9097 16.3333H25.1826C24.8133 16.3333 24.4681 16.5168 24.2616 16.8229L19.3536 24.0953C18.8371 24.8605 17.9743 25.3192 17.0511 25.3192H15.4244Z" fill="url(#paint0_linear_92_1022)" />
                <path d="M13.6666 10.0303C14.0744 9.38864 14.7818 9 15.5421 9H24.9773C25.8538 9 26.3852 9.96737 25.9151 10.7071L18.3334 22.6364C17.9256 23.278 17.2182 23.6667 16.4579 23.6667H7.02269C6.14621 23.6667 5.61481 22.6993 6.08494 21.9596L13.6666 10.0303Z" fill="url(#paint1_linear_92_1022)" />
                <defs>
                    <linearGradient id="paint0_linear_92_1022" x1="23" y1="16.3333" x2="23" y2="38.5732" gradientUnits="userSpaceOnUse">
                        <stop offset="0.313079" stop-color="white" />
                        <stop offset="1" stop-color="white" stop-opacity="0" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_92_1022" x1="16.0001" y1="9" x2="16.0001" y2="28.3944" gradientUnits="userSpaceOnUse">
                        <stop offset="0.38239" stop-color="white" />
                        <stop offset="1" stop-color="white" stop-opacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        ),
        themeColor: "bg-orange-500",
        textColor: "text-orange-500",
        spendingLimit: 2000,
        period: "week",
        progress: 0.7
    }
];

const MyCardsSection = () => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [currentTab, setCurrentTab] = useState('weekly');

    const currentCard = cardsData[currentCardIndex];

    const handlePrevious = () => {
        setCurrentCardIndex((prev) => (prev === 0 ? cardsData.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentCardIndex((prev) => (prev === cardsData.length - 1 ? 0 : prev + 1));
    };

    const CardIcon = currentCard.icon;

    const changeTab = () => {
        setCurrentTab((prev) => {
            if (prev === 'daily') return 'weekly';
            if (prev === 'weekly') return 'monthly';
            return 'daily';
        });
    }

    const renderBrandLogo = (brand: string) => {
        switch (brand) {
            case 'mastercard':
                return (
                    <div className="flex relative h-8 w-8 items-center">
                        <div className="w-4 h-4 rounded-full bg-[#EB001B] z-10 absolute -left-0 opacity-90"></div>
                        <div className="w-4 h-4 rounded-full bg-[#F79E1B] z-0 absolute right-2 opacity-90"></div>
                    </div>
                );
            case 'visa':
                return (
                    <div className="h-8 flex items-center">
                        <svg viewBox="0 0 100 32" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M42.6 3.6H33.8L28.3 28.2H37L42.6 3.6ZM69.6 3.9C67.8 3.2 65.5 2.8 62.7 2.8C54.7 2.8 49 7.1 49 13.5C49 18.2 53.2 20.8 56.4 22.4C59.7 24 60.8 25 60.8 26.4C60.8 28.5 58.2 29.4 55.7 29.4C52.4 29.4 49.8 28.5 48.3 27.8L46.8 31.8C48.8 32.7 52.6 33.3 56.2 33.3C64.7 33.3 70.3 29.1 70.3 22.5C70.3 17.5 66.8 15.1 61.9 12.8C58.8 11.3 57.8 10.4 57.8 8.9C57.8 7.3 59.6 6.6 62.8 6.6C65.4 6.6 67.5 7.1 69.2 7.9L69.6 3.9ZM90.2 3.6H82.4C80.3 3.6 78.6 4.8 77.7 7L66.6 33H76.3L78.2 27.7H88.3L89.2 33H97.7L90.2 3.6ZM79.9 23.3L83.9 12.2L87.2 23.3H79.9ZM16.3 3.6L10.7 18.6L6.5 6.3C6.1 4.9 5.8 4.2 4.9 3.8C3.1 3 1.5 2.8 0.2 2.8L0 4.1C2.5 4.6 5.4 6.7 7.1 11.9L11.9 33H21.7L32 3.6H16.3Z" fill="#1A1F71" />
                        </svg>
                    </div>
                );
            case 'rupay':
                return (
                    <div className="h-8 flex items-center">
                        <svg viewBox="0 0 100 40" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 6L14 18H28L30 6H22Z" fill="#F37021" />
                            <path d="M30 6L38 18H52L44 6H30Z" fill="#F37021" />
                            <path d="M8 32L0 20H14L22 32H8Z" fill="#009958" />
                            <path d="M30 32L38 20H52L44 32H30Z" fill="#009958" />
                            <path d="M42 9H68C72.4 9 76 12.6 76 17C76 21.4 72.4 25 68 25H42" stroke="#1D3E7F" strokeWidth="6" strokeLinecap="round" />
                            <path d="M52 25V35" stroke="#1D3E7F" strokeWidth="6" strokeLinecap="round" />
                            <path d="M42 21H64" stroke="#1D3E7F" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Card className="p-4 w-full max-w-lg mx-auto bg-white dark:bg-neutral-950 shadow-sm border border-gray-200 dark:border-neutral-700">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.9 0H17.1C17.3387 0 17.5676 0.0948211 17.7364 0.263604C17.9052 0.432387 18 0.661305 18 0.9V15.3C18 15.5387 17.9052 15.7676 17.7364 15.9364C17.5676 16.1052 17.3387 16.2 17.1 16.2H0.9C0.661305 16.2 0.432387 16.1052 0.263604 15.9364C0.0948211 15.7676 0 15.5387 0 15.3V0.9C0 0.661305 0.0948211 0.432387 0.263604 0.263604C0.432387 0.0948211 0.661305 0 0.9 0ZM16.2 7.2H1.8V14.4H16.2V7.2ZM16.2 5.4V1.8H1.8V5.4H16.2ZM10.8 10.8H14.4V12.6H10.8V10.8Z" fill="#525866" />
                    </svg>
                    My Cards
                </h2>
                <Button variant="outline" size="sm" className="text-sm font-normal cursor-pointer h-8 border text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Card
                </Button>
            </div>
            <div className="relative w-full h-52 bg-white dark:bg-black border border-gray-200 dark:border-neutral-700 rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col justify-between">
                {
                    currentCard.brand === "mastercard" && (
                        <>
                            <div className="absolute right-0 top-0 h-full pointer-events-none">
                                <svg width="120" height="68" viewBox="0 0 86 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M129.193 -140.5H288.862C296.814 -140.5 301.727 -131.827 297.64 -125.006L188.407 57.3086C184.619 63.6307 177.789 67.5 170.419 67.5H10.7504C2.79848 67.4998 -2.11493 58.8272 1.97205 52.0059L111.205 -130.309C114.993 -136.631 121.823 -140.5 129.193 -140.5Z" stroke="#E1E4EA" />
                                </svg>
                            </div>
                            <div className="absolute right-0 top-6 h-full pointer-events-none">
                                <svg width="50" height="160" viewBox="0 0 86 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M129.193 -140.5H288.862C296.814 -140.5 301.727 -131.827 297.64 -125.006L188.407 57.3086C184.619 63.6307 177.789 67.5 170.419 67.5H10.7504C2.79848 67.4998 -2.11493 58.8272 1.97205 52.0059L111.205 -130.309C114.993 -136.631 121.823 -140.5 129.193 -140.5Z" stroke="#E1E4EA" />
                                </svg>
                            </div>
                        </>
                    )
                }
                <div className="flex items-start justify-between relative z-10 mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${currentCard.themeColor} flex items-center justify-center text-white shadow-md`}>
                            {CardIcon}
                        </div>
                        <Wifi className="w-6 h-6 text-gray-400 rotate-90" />
                        <div className="flex items-center gap-1 px-2 py-1 rounded-md border">
                            <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center">
                                <Check className="w-2 h-2 text-white" strokeWidth={4} />
                            </div>
                            <span className="text-xs font-medium text-gray-800 dark:text-gray-200">Active</span>
                        </div>
                    </div>
                    {renderBrandLogo(currentCard.brand)}
                </div>
                <div className="relative z-10 mt-auto">
                    <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">{currentCard.name}</p>
                    <div className="flex items-end justify-between">
                        <div className="text-3xl font-bold text-gray-900 tracking-tight">
                            <AnimatedNumber
                                value={currentCard.amount}
                                decimals={2}
                                prefix="$"
                                className="text-3xl font-bold text-black dark:text-white"
                            />
                        </div>
                        <div className="flex items-center rounded-lg border border-gray-200 bg-white overflow-hidden">
                            <button
                                onClick={handlePrevious}
                                className="w-10 h-10 flex items-center cursor-pointer justify-center hover:bg-gray-50 text-black transition"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <div className="h-10 w-px bg-gray-200" />
                            <button
                                onClick={handleNext}
                                className="w-10 h-10 flex items-center cursor-pointer justify-center text-black hover:bg-gray-50 transition"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                <TabsList
                    className="
                        flex w-full rounded-xl border
                        bg-white dark:bg-neutral-900
                        border-gray-200 dark:border-neutral-700
                        overflow-hidden
                    "
                >
                    {
                        ["daily", "weekly", "monthly"].map((tab) => (
                            <TabsTrigger
                                key={tab}
                                value={tab}
                                className="
                                    flex-1 py-3 text-center text-sm font-semibold
                                    text-gray-600 dark:text-gray-300
                                    transition-colors shadow-none cursor-pointer
                                    
                                    data-[state=active]:bg-gray-200 dark:data-[state=active]:bg-neutral-700
                                    data-[state=active]:text-gray-900 dark:data-[state=active]:text-white

                                    hover:bg-gray-100 dark:hover:bg-neutral-800
                                "
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </TabsTrigger>
                        ))
                    }
                </TabsList>
            </Tabs>
            <div className="border border-gray-200 dark:border-neutral-700 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 flex-shrink-0">
                        <svg className="transform -rotate-90 w-12 h-12">
                            <circle
                                cx="24"
                                cy="24"
                                r="20"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="transparent"
                                className="text-gray-100"
                            />
                            <circle
                                cx="24"
                                cy="24"
                                r="20"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="transparent"
                                strokeDasharray={`${20 * 2 * Math.PI}`}
                                strokeDashoffset={`${20 * 2 * Math.PI * (1 - currentCard.progress)}`}
                                strokeLinecap="round"
                                className={`${currentCard.textColor} transition-all duration-500 ease-out`}
                            />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">Spending Limit</p>
                        <p className="text-lg font-bold text-gray-900">
                            <AnimatedNumber
                                value={currentCard.spendingLimit}
                                decimals={2}
                                prefix="$"
                                className="text-lg font-bold text-black dark:text-white"
                            />
                            <span className="text-xs text-gray-800 dark:text-gray-200 font-normal ml-1">/ {currentCard.period}</span>
                        </p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={changeTab}
                    className="cursor-pointer rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors bg-white text-gray-600 h-8 w-8"
                >
                    <ChevronRight className="w-5 h-5" />
                </Button>
            </div>
        </Card>
    );
};

export default MyCardsSection;