import { Card } from "./ui/card";
import { TrendingUp } from "lucide-react";

const CreditScoreCard = () => {
    const score = 710;
    const maxScore = 850;
    const percentage = (score / maxScore) * 100;

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Credit Score
                </h3>
                <button className="text-sm text-primary hover:underline">Details</button>
            </div>

            <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                    Your credit score is <span className="text-foreground font-semibold">{score}</span> 🤩
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                    This score is considered to be Excellent.
                </p>

                <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                    <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-success rounded-full"
                        style={{ width: `${percentage}%` }}
                    />
                </div>

                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>300</span>
                    <span>850</span>
                </div>
            </div>
        </Card>
    );
};

export default CreditScoreCard;