import { Plus, Radio } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MyCardsSection = () => {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    My Cards
                </h2>
                <Button variant="outline" size="sm" className="text-sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Card
                </Button>
            </div>

            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 mb-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <span className="text-primary font-bold">A</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Radio className="w-4 h-4 text-white" />
                        <span className="text-sm text-white">Active</span>
                    </div>
                    <div className="flex gap-1">
                        <div className="w-8 h-8 rounded bg-red-500 opacity-80" />
                        <div className="w-8 h-8 rounded bg-orange-500 opacity-90" />
                    </div>
                </div>

                <div className="text-white">
                    <p className="text-sm opacity-90 mb-1">Savings Card</p>
                    <p className="text-3xl font-bold">$16,058.94</p>
                </div>
            </div>

            <Tabs defaultValue="weekly" className="mb-4">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Spending Limit</p>
                        <p className="text-xl font-semibold">$1,500.00 <span className="text-sm text-muted-foreground font-normal">/ week</span></p>
                    </div>
                    <div className="relative w-16 h-16">
                        <svg className="transform -rotate-90 w-16 h-16">
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="transparent"
                                className="text-border"
                            />
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="transparent"
                                strokeDasharray={`${28 * 2 * Math.PI}`}
                                strokeDashoffset={`${28 * 2 * Math.PI * 0.4}`}
                                className="text-primary"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const CreditCard = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
);

export default MyCardsSection;