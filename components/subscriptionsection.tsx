import { Card } from "./ui/card";
import { Music, Music2, Video } from "lucide-react";
import { Badge } from "./ui/badge";

const SubscriptionsSection = () => {
    const subscriptions = [
        {
            id: 1,
            name: "Salary Deposit",
            amount: "$7.99",
            period: "month",
            status: "Paid",
            icon: Music,
            statusColor: "bg-success/10 text-success",
        },
        {
            id: 2,
            name: "Youtube Music",
            amount: "$79.99",
            period: "year",
            status: "Expiring",
            icon: Music2,
            statusColor: "bg-destructive/10 text-destructive",
        },
        {
            id: 3,
            name: "Prime Video",
            amount: "$9.99",
            period: "month",
            status: "Paused",
            icon: Video,
            statusColor: "bg-warning/10 text-warning",
        },
    ];

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">My Subscriptions</h2>
                <button className="text-sm text-primary hover:underline">See All</button>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <Music className="w-5 h-5 text-primary" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <Music className="w-5 h-5 text-white" />
                    </div>
                </div>
                <p className="font-medium text-sm mb-1">50% discount on Apple Music</p>
                <p className="text-xs text-muted-foreground">
                    For only $4.99 per month! <span className="text-primary underline cursor-pointer">Learn More</span>
                </p>
            </div>

            <div className="space-y-3">
                {subscriptions.map((sub) => (
                    <div key={sub.id} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                <sub.icon className="w-5 h-5 text-foreground" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">{sub.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {sub.amount} <span>/{sub.period}</span>
                                </p>
                            </div>
                        </div>
                        <Badge variant="outline" className={sub.statusColor}>
                            {sub.status}
                        </Badge>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default SubscriptionsSection;