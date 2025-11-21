"use client";

import CreditScoreCard from "@/components/creditscorecard";
import ExchangeCard from "@/components/exchangecard";
import MyCardsSection from "@/components/mycardsection";
import RecentTransactionsSection from "@/components/recenttransactions";
import SpendingSummarySection from "@/components/spendingsummary";
import SubscriptionsSection from "@/components/subscriptionsection";
import TotalExpensesCard from "@/components/totalexpensescard";
import { motion } from "framer-motion";

const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.4 }
};

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.1
		}
	}
};

export default function Home() {
	return (
		<main className="p-4 md:p-6 lg:p-8">
			<motion.div 
				className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6"
				variants={staggerContainer}
				initial="initial"
				animate="animate"
			>
				{/* Left Section - 2/3 width on large screens */}
				<div className="xl:col-span-2 space-y-4 md:space-y-6">
					{/* Top Row - Cards and Spending Summary */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
						<motion.div {...fadeInUp}>
							<MyCardsSection />
						</motion.div>
						<motion.div {...fadeInUp} transition={{ duration: 0.4, delay: 0.1 }}>
							<SpendingSummarySection />
						</motion.div>
					</div>
					
					{/* Bottom Row - Transactions and Subscriptions */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
						<motion.div {...fadeInUp} transition={{ duration: 0.4, delay: 0.2 }}>
							<RecentTransactionsSection />
						</motion.div>
						<motion.div {...fadeInUp} transition={{ duration: 0.4, delay: 0.3 }}>
							<SubscriptionsSection />
						</motion.div>
					</div>
				</div>
				
				{/* Right Section - 1/3 width on large screens */}
				<div className="xl:col-span-1 space-y-4 md:space-y-5">
					<motion.div {...fadeInUp} transition={{ duration: 0.4, delay: 0.1 }}>
						<TotalExpensesCard />
					</motion.div>
					<motion.div {...fadeInUp} transition={{ duration: 0.4, delay: 0.2 }}>
						<ExchangeCard />
					</motion.div>
					<motion.div {...fadeInUp} transition={{ duration: 0.4, delay: 0.3 }}>
						<CreditScoreCard />
					</motion.div>
				</div>
			</motion.div>
		</main>
	);
}