import { IndianRupee, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function WalletPage() {
  const transactions = [
    { id: 1, type: 'credit', amount: 120, date: 'Today, 10:30 AM', title: 'Pickup Completed', subtitle: 'Mixed Scrap' },
    { id: 2, type: 'debit', amount: 500, date: 'Yesterday, 4:15 PM', title: 'UPI Withdrawal', subtitle: 'To State Bank of India' },
    { id: 3, type: 'credit', amount: 350, date: 'Feb 20, 2:00 PM', title: 'Pickup Completed', subtitle: 'E-Waste' },
    { id: 4, type: 'credit', amount: 80, date: 'Feb 18, 11:45 AM', title: 'Pickup Completed', subtitle: 'Old Newspapers' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#1F2937] mb-2">Your Wallet</h1>
        <p className="text-[#1F2937]/70">Manage your earnings and withdraw to UPI.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] rounded-3xl p-8 text-white shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <p className="text-white/80 font-semibold mb-2 text-lg">Available Balance</p>
            <h2 className="text-6xl font-extrabold mb-8 flex items-center gap-2">
              <IndianRupee className="w-10 h-10" />
              450.00
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 rounded-xl bg-white text-[#8B5CF6] font-bold text-lg btn-hover-effect flex items-center justify-center gap-2">
                <ArrowUpRight className="w-5 h-5" />
                Withdraw to UPI
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
          <h3 className="text-4xl font-extrabold text-[#1F2937] text-center mb-6">₹1,250</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#1F2937]/60">This Month</span>
              <span className="font-bold text-emerald-600">+₹450</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#1F2937]/60">Pickups</span>
              <span className="font-bold text-[#1F2937]">5</span>
            </div>
          </div>
        </motion.div>
      </div>

      <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Recent Transactions</h2>
      
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
