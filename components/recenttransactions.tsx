import { Card } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Building2, TrendingUp, Home, Package } from "lucide-react";

const RecentTransactionsSection = () => {
    const transactions = [
        {
            id: 1,
            title: "Salary Deposit",
            description: "Monthly salary from Apex...",
            amount: "$3,500.00",
            date: "Sep 18",
            icon: Building2,
            iconBg: "bg-secondary"
        },
        {
            id: 2,
            title: "Stock Dividend",
            description: "Payment from stock investm...",
            amount: "$846.14",
            date: "Sep 18",
            icon: TrendingUp,
            iconBg: "bg-blue-100"
        },
        {
            id: 3,
            title: "Rental Income",
            description: "Rental payment from Mr. Du...",
            amount: "$100.00",
            date: "Sep 17",
            icon: Home,
            iconBg: "bg-green-100"
        },
        {
            id: 4,
            title: "Refund from Amazon",
            description: "Refund of Order No #124235",
            amount: "$36.24",
            date: "Sep 15",
            icon: Package,
            iconBg: "bg-orange-100"
        },
    ];

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Transactions</h2>
                <button className="text-sm text-primary hover:underline">See All</button>
            </div>

            <Tabs defaultValue="incoming" className="mb-4">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="incoming">Incoming</TabsTrigger>
                    <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="space-y-3">
                {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between py-2 hover:bg-secondary/50 rounded-lg px-2 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg ${transaction.iconBg} flex items-center justify-center`}>
                                <transaction.icon className="w-5 h-5 text-foreground" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">{transaction.title}</p>
                                <p className="text-xs text-muted-foreground">{transaction.description}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-semibold">{transaction.amount}</p>
                            <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default RecentTransactionsSection;