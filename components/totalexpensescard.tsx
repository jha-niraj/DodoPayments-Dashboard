import { Card } from "./ui/card";
import { TrendingDown } from "lucide-react";
import { Badge } from "./ui/badge";

const TotalExpensesCard = () => {
    return (
        <Card className="p-6">
            <div className="mb-4">
                <svg className="w-full h-16" viewBox="0 0 200 60">
                    <polyline
                        points="0,30 20,25 40,35 60,28 80,32 100,20 120,25 140,18 160,22 180,15 200,20"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        className="opacity-50"
                    />
                </svg>
            </div>

            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
                    <p className="text-3xl font-bold">$6,240.28</p>
                </div>
                <Badge variant="outline" className="bg-destructive/10 text-destructive border-0">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -2%
                </Badge>
            </div>
        </Card>
    );
};

export default TotalExpensesCard;