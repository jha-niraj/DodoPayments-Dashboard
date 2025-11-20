import CreditScoreCard from "@/components/CreditScoreCard";
import ExchangeCard from "@/components/exchangecard";
import MyCardsSection from "@/components/mycardsection";
import RecentTransactionsSection from "@/components/recenttransactions";
import SpendingSummarySection from "@/components/spendingsummary";
import SubscriptionsSection from "@/components/subscriptionsection";
import TotalExpensesCard from "@/components/totalexpensescard";

export default function Home() {
	return (
		<main className="p-6">
			<div className="flex gap-6">
				<div className="w-2/3 space-y-6">
					<div className="flex gap-4 w-full">
						<div className="w-1/2">
							<MyCardsSection />
						</div>
						<div className="w-1/2">
							<SpendingSummarySection />
						</div>
					</div>
					<div className="flex gap-4 w-full">
						<div className="w-1/2">
							<RecentTransactionsSection />
						</div>
						<div className="w-1/2">
							<SubscriptionsSection />
						</div>
					</div>
				</div>
				<div className="w-1/3 space-y-6">
					<TotalExpensesCard />
					<ExchangeCard />
					<CreditScoreCard />
				</div>
			</div>
		</main>
	);
}
