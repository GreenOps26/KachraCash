import Link from 'next/link';
import { Map, IndianRupee, Truck, CheckCircle2, MapPin } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function KabadiwalaDashboard() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1F2937] mb-2">Namaste, Raju! 🙏</h1>
          <p className="text-[#1F2937]/70">Ready to collect some scrap today?</p>
        </div>
        <Link href="/kabadiwala/map" className="px-6 py-3 rounded-full bg-[#8B5CF6] text-white font-bold btn-hover-effect flex items-center gap-2 shadow-sm">
          <Map className="w-5 h-5" />
          Find Scrap Nearby
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-3xl bg-white border border-black/5 shadow-sm card-hover-effect"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#1F2937]/70 font-semibold">Today&apos;s Earnings</h3>
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-[#1F2937]">₹850</p>
          <p className="text-sm text-emerald-600 font-semibold mt-4">+₹120 from yesterday</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-3xl bg-white border border-black/5 shadow-sm card-hover-effect"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#1F2937]/70 font-semibold">Active Bids</h3>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-[#1F2937]">3</p>
          <p className="text-sm text-[#1F2937]/60 mt-4">Waiting for citizen response</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-3xl bg-white border border-black/5 shadow-sm card-hover-effect"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#1F2937]/70 font-semibold">Completed Today</h3>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-[#1F2937]">4</p>
          <p className="text-sm text-[#1F2937]/60 mt-4">Great job!</p>
        </motion.div>
      </div>

      <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Confirmed Pickups</h2>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Mock Confirmed Job */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl overflow-hidden border border-emerald-500/20 shadow-sm card-hover-effect flex flex-col md:flex-row"
        >
          <div className="w-full md:w-48 h-48 md:h-auto bg-gray-200 relative">
            <img src="https://picsum.photos/seed/scrap3/600/400" alt="Scrap" className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500 text-white text-sm font-bold shadow-sm">
              Confirmed
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-[#1F2937]">Plastic Bottles & Cardboard</h3>
                <span className="text-xl font-extrabold text-[#8B5CF6]">₹150</span>
              </div>
              
              <div className="flex items-center gap-2 text-[#1F2937]/60 text-sm mb-4">
                <MapPin className="w-4 h-4" />
                Apt 402, Sunshine Residency, Koramangala (2.1 km away)
              </div>
              
              <p className="text-sm text-[#1F2937]/70 mb-6">
                Citizen: Raj Kumar • Phone: +91 98765 43210
              </p>
            </div>
            
            <div className="flex gap-3">
              <button className="flex-1 py-3 rounded-xl bg-emerald-500 text-white font-bold btn-hover-effect flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Mark as Collected
              </button>
              <button className="flex-1 py-3 rounded-xl bg-gray-100 text-[#1F2937] font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <Map className="w-5 h-5" /> Navigate
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
