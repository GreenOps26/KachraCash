import Link from 'next/link';
import { Plus, IndianRupee, Clock, CheckCircle2, MapPin } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function CitizenDashboard() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1F2937] mb-2">Welcome back, Raj! 👋</h1>
          <p className="text-[#1F2937]/70">Here&apos;s what&apos;s happening with your scrap.</p>
        </div>
        <Link href="/citizen/post-scrap" className="px-6 py-3 rounded-full bg-[#EC4899] text-white font-bold btn-hover-effect flex items-center gap-2 shadow-sm">
          <Plus className="w-5 h-5" />
          Post New Scrap
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-3xl bg-white border border-black/5 shadow-sm card-hover-effect"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#1F2937]/70 font-semibold">Wallet Balance</h3>
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-[#1F2937]">₹450</p>
          <Link href="/citizen/wallet" className="text-sm text-[#8B5CF6] font-semibold mt-4 inline-block hover:underline">
            Withdraw to UPI &rarr;
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-3xl bg-white border border-black/5 shadow-sm card-hover-effect"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#1F2937]/70 font-semibold">Active Listings</h3>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-[#1F2937]">2</p>
          <p className="text-sm text-[#1F2937]/60 mt-4">Awaiting bids</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-3xl bg-white border border-black/5 shadow-sm card-hover-effect"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#1F2937]/70 font-semibold">Completed Pickups</h3>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-[#1F2937]">5</p>
          <p className="text-sm text-[#1F2937]/60 mt-4">Total earned: ₹1,250</p>
        </motion.div>
      </div>

      <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Your Active Listings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mock Listing 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm card-hover-effect"
        >
          <div className="h-48 bg-gray-200 relative">
            {/* Placeholder image */}
            <img src="https://picsum.photos/seed/scrap1/600/400" alt="Scrap" className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 text-sm font-bold text-[#EC4899] shadow-sm">
              Mixed Scrap
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#1F2937]">Old Newspapers & Bottles</h3>
              <span className="text-sm font-semibold text-[#1F2937]/60 bg-gray-100 px-2 py-1 rounded-md">~5 kg</span>
            </div>
            
            <div className="flex items-center gap-2 text-[#1F2937]/60 text-sm mb-6">
              <MapPin className="w-4 h-4" />
              Koramangala, Bengaluru
            </div>
            
            <div className="bg-[#FEF3C7]/50 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#1F2937]/70">Highest Bid</span>
                <span className="text-lg font-extrabold text-[#8B5CF6]">₹120</span>
              </div>
              <p className="text-xs text-[#1F2937]/50">from Raju Kabadiwala (4.8⭐)</p>
            </div>
            
            <div className="flex gap-3">
              <button className="flex-1 py-3 rounded-xl bg-[#8B5CF6] text-white font-bold btn-hover-effect">
                Accept Bid
              </button>
              <button className="flex-1 py-3 rounded-xl bg-gray-100 text-[#1F2937] font-bold hover:bg-gray-200 transition-colors">
                Counter
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mock Listing 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm card-hover-effect"
        >
          <div className="h-48 bg-gray-200 relative">
            {/* Placeholder image */}
            <img src="https://picsum.photos/seed/scrap2/600/400" alt="Scrap" className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 text-sm font-bold text-blue-500 shadow-sm">
              E-Waste
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#1F2937]">Broken Microwave</h3>
              <span className="text-sm font-semibold text-[#1F2937]/60 bg-gray-100 px-2 py-1 rounded-md">1 item</span>
            </div>
            
            <div className="flex items-center gap-2 text-[#1F2937]/60 text-sm mb-6">
              <MapPin className="w-4 h-4" />
              Koramangala, Bengaluru
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-4 mb-6 flex items-center justify-center h-[72px]">
              <p className="text-sm font-semibold text-[#1F2937]/50">Waiting for bids...</p>
            </div>
            
            <button className="w-full py-3 rounded-xl bg-gray-100 text-[#1F2937] font-bold hover:bg-gray-200 transition-colors" disabled>
              No Actions Yet
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
