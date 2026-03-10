import { IndianRupee, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function EarningsPage() {
  const transactions = [
    { id: 1, type: 'credit', amount: 150, date: 'Today, 2:30 PM', title: 'Pickup Completed', subtitle: 'Plastic Bottles & Cardboard' },
    { id: 2, type: 'credit', amount: 200, date: 'Yesterday, 11:15 AM', title: 'Pickup Completed', subtitle: 'Old Iron Scrap' },
    { id: 3, type: 'debit', amount: 350, date: 'Feb 20, 5:00 PM', title: 'Bank Transfer', subtitle: 'To HDFC Bank' },
    { id: 4, type: 'credit', amount: 120, date: 'Feb 18, 9:45 AM', title: 'Pickup Completed', subtitle: 'Mixed Scrap' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-2">Your Earnings</h1>
        <p className="text-white/80">Track your income and withdraw to your bank account.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10">
            <p className="text-white/80 font-semibold mb-2 text-lg">Available to Withdraw</p>
            <h2 className="text-6xl font-extrabold mb-8 flex items-center gap-2">
              <IndianRupee className="w-10 h-10" />
              850.00
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 rounded-xl bg-white text-emerald-600 font-bold text-lg btn-hover-effect flex items-center justify-center gap-2">
                <ArrowUpRight className="w-5 h-5" />
                Transfer to Bank
              </button>
              <button className="px-8 py-4 rounded-xl bg-black/20 text-white font-bold text-lg hover:bg-black/30 transition-colors flex items-center justify-center gap-2">
                View Bank Details
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm flex flex-col justify-center"
        >
          <p className="text-[#1F2937]/70 font-semibold mb-2 text-center">Total Earned</p>
          <h3 className="text-4xl font-extrabold text-[#1F2937] text-center mb-6">₹4,250</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#1F2937]/60">This Month</span>
              <span className="font-bold text-emerald-600">+₹1,850</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#1F2937]/60">Pickups</span>
              <span className="font-bold text-[#1F2937]">24</span>
            </div>
          </div>
        </motion.div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-6">Recent Transactions</h2>

      <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
        {transactions.map((tx, index) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className={`p-6 flex items-center justify-between ${index !== transactions.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition-colors`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                {tx.type === 'credit' ? <ArrowDownLeft className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
              </div>
              <div>
                <h4 className="font-bold text-[#1F2937] text-lg">{tx.title}</h4>
                <p className="text-sm text-[#1F2937]/60">{tx.subtitle}</p>
              </div>
            </div>

            <div className="text-right">
              <p className={`font-extrabold text-lg ${tx.type === 'credit' ? 'text-emerald-600' : 'text-[#1F2937]'}`}>
                {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
              </p>
              <p className="text-xs text-[#1F2937]/50 flex items-center gap-1 justify-end mt-1">
                <Clock className="w-3 h-3" />
                {tx.date}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
