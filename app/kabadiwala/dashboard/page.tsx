import Link from 'next/link';
import { Map, IndianRupee, Truck, CheckCircle2 } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function KabadiwalaDashboard() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:px-8 md:py-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1F2937] mb-2 leading-relaxed">Namaste! 🙏</h1>
          <p className="text-[#1F2937]/80 leading-relaxed">Ready to collect some scrap today?</p>
        </div>
        <Link href="/kabadiwala/map" className="px-6 py-3 rounded-full bg-[#EC4899] hover:bg-[#db2777] text-white font-bold btn-hover-effect flex items-center gap-2 shadow-sm">
          <Map className="w-5 h-5" />
          Find Scrap Nearby
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/40 shadow-card card-hover-effect hover:shadow-card-hover hover:border-[#EC4899]/30"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#1F2937]/70 font-semibold">Today&apos;s Earnings</h3>
            <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-[#10B981]" />
            </div>
          </div>
          <p className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[#EC4899] to-[#8B5CF6] drop-shadow-sm">₹0</p>
          <p className="text-sm text-gray-500 mt-4">No earnings yet</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/40 shadow-card card-hover-effect hover:shadow-card-hover hover:border-[#8B5CF6]/30"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#1F2937]/70 font-semibold">Active Bids</h3>
            <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-[#8B5CF6]" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-[#1F2937]">0</p>
          <p className="text-sm text-gray-500 mt-4">Start bidding on map</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/40 shadow-card card-hover-effect hover:shadow-card-hover hover:border-[#10B981]/30"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#1F2937]/70 font-semibold">Completed Today</h3>
            <div className="w-10 h-10 rounded-full bg-[#EC4899]/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-[#EC4899]" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-[#1F2937]">0</p>
          <p className="text-sm text-gray-500 mt-4">Job count</p>
        </motion.div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-[#1F2937] mb-6">Confirmed Pickups</h2>

      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-white/40 shadow-card text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <Truck className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-[#1F2937] mb-2">No Confirmed Pickups</h3>
        <p className="text-gray-600 mb-6">You haven&apos;t won any bids for pick up yet today.</p>
        <Link href="/kabadiwala/map" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#8B5CF6] hover:bg-[#7c3aed] text-white font-bold btn-hover-effect shadow-sm">
          <Map className="w-5 h-5" /> Browse Map For Jobs
        </Link>
      </div>
    </div>
  );
}
