"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { RefreshCw, ArrowRightLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdownmenu";
import AnimatedNumber from "./AnimatedNumber";

// Mock Data for Currencies
const CURRENCIES = [
    { code: "USD", name: "US Dollar", flag: "🇺🇸", symbol: "$", rate: 1.0 },
    { code: "EUR", name: "Euro", flag: "🇪🇺", symbol: "€", rate: 0.94 },
    { code: "GBP", name: "British Pound", flag: "🇬🇧", symbol: "£", rate: 0.79 },
    { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", symbol: "¥", rate: 148.5 },
    { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", symbol: "C$", rate: 1.36 },
];

const ExchangeCard = () => {
    const [amount, setAmount] = useState(100.0);
    const [fromCurrency, setFromCurrency] = useState(CURRENCIES[0]); // Default USD
    const [toCurrency, setToCurrency] = useState(CURRENCIES[1]); // Default EUR
    const [isSwapping, setIsSwapping] = useState(false);

    // Calculate Conversion
    const exchangeRate = toCurrency.rate / fromCurrency.rate;
    const taxAmount = amount * 0.02; // 2%
    const feeAmount = amount * 0.01; // 1%
    const netAmount = amount - taxAmount - feeAmount;
    const totalReceived = netAmount * exchangeRate;

    const handleSwap = () => {
        setIsSwapping(true);
        setTimeout(() => {
            setFromCurrency(toCurrency);
            setToCurrency(fromCurrency);
            setIsSwapping(false);
        }, 150); // Small delay for animation effect
    };

    // Filter 'To' options to exclude current 'From' currency
    const availableToCurrencies = CURRENCIES.filter((c) => c.code !== fromCurrency.code);

    return (
        <Card className="p-4 w-full max-w-lg mx-auto bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-700 shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-xl flex items-center gap-2 text-gray-900 dark:text-white">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.59725 1.82476C3.95817 0.645503 5.69924 -0.0025049 7.5 7.27699e-06C11.6423 7.27699e-06 15 3.35776 15 7.50001C15 9.10201 14.4975 10.587 13.6425 11.805L11.25 7.50001H13.5C13.5001 6.32373 13.1544 5.17336 12.506 4.19195C11.8576 3.21054 10.9349 2.44138 9.85288 1.9801C8.77082 1.51882 7.57704 1.38578 6.41997 1.59752C5.2629 1.80926 4.19359 2.35643 3.345 3.17101L2.59725 1.82476ZM12.4028 13.1753C11.0418 14.3545 9.30076 15.0025 7.5 15C3.35775 15 0 11.6423 0 7.50001C0 5.89801 0.5025 4.41301 1.3575 3.19501L3.75 7.50001H1.5C1.4999 8.67629 1.84556 9.82665 2.494 10.8081C3.14244 11.7895 4.06505 12.5586 5.14712 13.0199C6.22918 13.4812 7.42296 13.6142 8.58003 13.4025C9.7371 13.1908 10.8064 12.6436 11.655 11.829L12.4028 13.1753Z" fill="#525866" />
                    </svg>                    
                    Exchange
                </h3>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="cursor-pointer text-xs text-gray-800 dark:text-gray-200 h-8 border-gray-200 hover:bg-gray-50">
                            Currencies
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        {
                            CURRENCIES.filter((c) => c.code !== toCurrency.code).map((currency) => (
                                <DropdownMenuItem
                                    key={currency.code}
                                    onClick={() => setFromCurrency(currency)}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <span className="text-lg">{currency.flag}</span>
                                    <span className="flex-1">{currency.name}</span>
                                    {fromCurrency.code === currency.code && <span className="text-xs text-blue-600">Active</span>}
                                </DropdownMenuItem>
                            ))
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="space-y-5 border border-gray-200 dark:border-neutral-700 shadow-sm rounded-xl">
                <div className="flex items-center justify-between border-b">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors group outline-none">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center text-sm overflow-hidden">
                                    {fromCurrency.flag}
                                </div>
                                <span className="font-semibold text-sm text-black dark:text-white">{fromCurrency.code}</span>
                                <ChevronDown className="rounded-full border border-gray-800 dark:border-gray-200 w-3 h-3 text-gray-800 group-hover:text-gray-400" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-32">
                            {
                                CURRENCIES.filter((c) => c.code !== toCurrency.code).map((c) => (
                                    <DropdownMenuItem key={c.code} onClick={() => setFromCurrency(c)}>
                                        <span className="mr-2">{c.flag}</span> {c.code}
                                    </DropdownMenuItem>
                                ))
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="h-8 w-[1px] bg-gray-200"></div>
                    <div className="relative flex items-center justify-center">
                        <button
                            onClick={handleSwap}
                            className={`z-10 p-1.5 cursor-pointer bg-gray-200 text-black dark:text-white hover:text-blue-600 hover:border-blue-200 transition-all duration-300 ${isSwapping ? 'rotate-180' : ''}`}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.0375 12.0375L18.75 15.75L15.0375 19.4625L13.977 18.402L15.879 16.4993L6 16.5V15H15.879L13.977 13.098L15.0375 12.0375ZM8.9625 4.53751L10.023 5.59801L8.121 7.50001H18V9.00001H8.121L10.023 10.902L8.9625 11.9625L5.25 8.25001L8.9625 4.53751Z" fill="#525866" />
                            </svg>
                        </button>
                    </div>
                    <div className="h-8 w-[1px] bg-gray-200"></div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg transition-colors group outline-none">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center text-sm overflow-hidden">
                                    {toCurrency.flag}
                                </div>
                                <span className="font-semibold text-sm text-black dark:text-white">{toCurrency.code}</span>
                                <ChevronDown className="w-3 h-3 text-gray-800" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                            {
                                availableToCurrencies.map((c) => (
                                    <DropdownMenuItem key={c.code} onClick={() => setToCurrency(c)}>
                                        <span className="mr-2">{c.flag}</span> {c.code}
                                    </DropdownMenuItem>
                                ))
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center text-4xl font-bold mb-2 text-black dark:text-white">
                        <AnimatedNumber
                            value={amount}
                            decimals={2}
                            prefix={fromCurrency.symbol}
                            className="text-4xl font-bold"
                        />
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                        Available: <span className="text-black dark:text-white text-lg font-medium">
                            {fromCurrency.symbol}16,058.94
                        </span>
                    </p>
                </div>
                <div className="border-t py-2 text-center">
                    <p className="text-xs font-medium text-gray-800 dark:text-gray-200">
                        1 {fromCurrency.code} = <span className="text-black dark:text-white font-bold">{exchangeRate.toFixed(4)} {toCurrency.code}</span>
                    </p>
                </div>
            </div>
            <div className="space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-800 dark:text-gray-200">Tax (2%)</span>
                    <span className="font-medium text-black dark:text-white">{fromCurrency.symbol}{taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-800 dark:text-gray-200">Exchange fee (1%)</span>
                    <span className="font-medium text-black dark:text-white">{fromCurrency.symbol}{feeAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-dashed border-gray-200">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Total amount</span>
                    <span className="font-bold text-black dark:text-white">
                        <AnimatedNumber
                            value={totalReceived}
                            decimals={2}
                            prefix={toCurrency.symbol}
                            className="font-bold"
                        />
                    </span>
                </div>
            </div>
            <Button className="w-full h-11 bg-white cursor-pointer hover:bg-none text-black border border-gray-300 rounded-xl shadow-md transition-all active:scale-[0.98]">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.59725 1.82476C3.95817 0.645503 5.69924 -0.0025049 7.5 7.27699e-06C11.6423 7.27699e-06 15 3.35776 15 7.50001C15 9.10201 14.4975 10.587 13.6425 11.805L11.25 7.50001H13.5C13.5001 6.32373 13.1544 5.17336 12.506 4.19195C11.8576 3.21054 10.9349 2.44138 9.85288 1.9801C8.77082 1.51882 7.57704 1.38578 6.41997 1.59752C5.2629 1.80926 4.19359 2.35643 3.345 3.17101L2.59725 1.82476ZM12.4028 13.1753C11.0418 14.3545 9.30076 15.0025 7.5 15C3.35775 15 0 11.6423 0 7.50001C0 5.89801 0.5025 4.41301 1.3575 3.19501L3.75 7.50001H1.5C1.4999 8.67629 1.84556 9.82665 2.494 10.8081C3.14244 11.7895 4.06505 12.5586 5.14712 13.0199C6.22918 13.4812 7.42296 13.6142 8.58003 13.4025C9.7371 13.1908 10.8064 12.6436 11.655 11.829L12.4028 13.1753Z" fill="#525866" />
                </svg>
                Exchange
            </Button>
        </Card>
    );
};

export default ExchangeCard;