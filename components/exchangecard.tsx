import { Card } from "./ui/card";
import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

const ExchangeCard = () => {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Exchange
                </h3>
                <span className="text-xs text-muted-foreground">Currencies</span>
            </div>

            <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                            🇺🇸
                        </div>
                        <span className="font-medium">USD</span>
                    </div>
                    <button>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.7875 7.5L13.5 11.2125L9.7875 14.925L8.727 13.8645L10.629 11.9618L0.75 11.9625V10.4625H10.629L8.727 8.5605L9.7875 7.5ZM3.7125 0L4.773 1.0605L2.871 2.9625H12.75V4.4625H2.871L4.773 6.3645L3.7125 7.425L0 3.7125L3.7125 0Z" fill="#525866" />
                        </svg>
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                            🇪🇺
                        </div>
                        <span className="font-medium">EUR</span>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-4xl font-bold mb-2">$100.00</p>
                    <p className="text-sm text-muted-foreground">
                        Available: <span className="text-foreground font-medium">$16,058.94</span>
                    </p>
                </div>

                <div className="text-center text-xs text-muted-foreground">
                    1 USD = 0.94 EUR
                </div>
            </div>

            <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (2%)</span>
                    <span>$2.00</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Exchange fee (1%)</span>
                    <span>$1.00</span>
                </div>
                <div className="flex justify-between font-semibold">
                    <span>Total amount</span>
                    <span>€90.7</span>
                </div>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90">
                <RefreshCw className="w-4 h-4 mr-2" />
                Exchange
            </Button>
        </Card>
    );
};

export default ExchangeCard;