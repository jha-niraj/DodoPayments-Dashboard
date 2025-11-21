"use client";

import { Card } from "./ui/card";
import { ArrowDownLeft, TrendingDown } from "lucide-react";
import { Badge } from "./ui/badge";
import AnimatedNumber from "./AnimatedNumber";

const TotalExpensesCard = () => {
    return (
        <Card className="p-4 w-full max-w-lg mx-auto bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-700 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="rounded-full border p-1 mb-2 inline-flex">
                    <ArrowDownLeft />
                </div>
                <svg width="120" height="42" viewBox="0 0 120 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 41C1.87567 41 3.50564 39.7114 3.93851 37.8864L11.6196 5.50226C12.2456 2.86328 14.6025 1 17.3147 1C19.7857 1 21.9905 2.55179 22.8244 4.87784L27.4711 17.8395C28.2007 19.8748 30.1299 21.2326 32.292 21.2326C34.2089 21.2326 35.9653 22.303 36.8439 24.0068L41.6767 33.379C42.4157 34.8122 43.8932 35.7126 45.5056 35.7126C47.1091 35.7126 48.58 34.8221 49.3231 33.4012L53.1057 26.169C54.6928 23.1345 59.056 21.2326 62.4804 21.2326C66.3419 21.2326 68.5703 18.8213 69.8979 15.1953L73.4431 5.51188C74.4353 2.802 77.014 1 79.8998 1C82.6205 1 85.0853 2.60429 86.1868 5.09206L92.1758 18.6182C92.8795 20.2076 94.4543 21.2326 96.1925 21.2326C97.6024 21.2326 98.9267 20.5558 99.7527 19.4131L108.998 6.62243C111.551 3.09134 115.643 1 120 1" stroke="#335CFF" strokeWidth="2" />
                </svg>
            </div>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-800 dark:text-gray-200 mb-1">Total Expenses</p>
                    <div className="text-3xl font-semibold flex items-center gap-3">
                        <AnimatedNumber
                            value={6240.28}
                            decimals={2}
                            prefix="$"
                            className="text-3xl font-bold max-w-xl"
                        />
                        <Badge variant="outline" className="bg-destructive/10 text-destructive border-0">
                            <TrendingDown className="w-3 h-3 mr-1" />
                            -2%
                        </Badge>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default TotalExpensesCard;