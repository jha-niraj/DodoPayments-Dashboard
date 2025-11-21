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
		<main className="p-4">
			<motion.div 
				className="flex gap-4 bg-white dark:bg-neutral-950"
				variants={staggerContainer}
				initial="initial"
				animate="animate"
			>
				<div className="w-2/3 space-y-6">
					<div className="flex gap-4 w-full">
						<motion.div className="w-1/2" {...fadeInUp}>
							<MyCardsSection />
						</motion.div>
						<motion.div className="w-1/2" {...fadeInUp} transition={{ duration: 0.4, delay: 0.1 }}>
							<SpendingSummarySection />
						</motion.div>
					</div>
					<div className="flex gap-4 w-full">
						<motion.div className="w-1/2" {...fadeInUp} transition={{ duration: 0.4, delay: 0.2 }}>
							<RecentTransactionsSection />
						</motion.div>
						<motion.div className="w-1/2" {...fadeInUp} transition={{ duration: 0.4, delay: 0.3 }}>
							<SubscriptionsSection />
						</motion.div>
					</div>
				</div>
				<div className="w-1/3 space-y-5">
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
